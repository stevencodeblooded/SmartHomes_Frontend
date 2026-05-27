// src/components/landlord/ListingFormDrawer.jsx
// Slide-in drawer containing the full multi-step property listing / edit form

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Home,
  Building2,
  DoorOpen,
  Building,
  GraduationCap,
  Camera,
  User,
  MapPin,
  Wifi,
  Car,
  Shield,
  Droplets,
  Zap,
  Wind,
  Trees,
  Dog,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";

// Fix leaflet default marker icons (broken in CRA / Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Constants ─────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { id: "apartments", label: "Apartment", icon: Building2 },
  { id: "detached", label: "House", icon: Home },
  { id: "room", label: "Room", icon: DoorOpen },
  { id: "suites", label: "Suite", icon: Building },
  { id: "student", label: "Student Apt", icon: GraduationCap },
];

const LEASE_OPTIONS = [
  "Monthly",
  "3 months",
  "6 months",
  "1 year",
  "Unlimited",
];
const FURNISHING = ["Furnished", "Unfurnished", "Semi-furnished"];
const AVAILABILITY = [
  "As soon as possible",
  "Within 1 month",
  "In 2–3 months",
  "Specific date",
];
const CITIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Nanyuki",
  "Diani",
  "Kwale",
];
const NAIROBI_AREAS = [
  "Westlands",
  "Kilimani",
  "Karen",
  "Parklands",
  "Upper Hill",
  "Ngong Road",
  "Runda",
  "Lavington",
  "South C",
  "Kasarani",
  "Embakasi",
  "Lang'ata",
  "Gigiri",
  "Muthaiga",
];
const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "security", label: "Security", icon: Shield },
  { id: "water", label: "Water 24/7", icon: Droplets },
  { id: "generator", label: "Generator", icon: Zap },
  { id: "ac", label: "Air Con", icon: Wind },
  { id: "garden", label: "Garden", icon: Trees },
  { id: "pets", label: "Pets OK", icon: Dog },
];

const STEPS = [
  { num: 1, label: "Basics", icon: Home },
  { num: 2, label: "Details", icon: Building2 },
  { num: 3, label: "Amenities", icon: CheckCircle },
  { num: 4, label: "Location", icon: MapPin },
  { num: 5, label: "Photos", icon: Camera },
  { num: 6, label: "Contact", icon: User },
];

const INITIAL = {
  propertyType: "",
  city: "",
  area: "",
  address: "",
  price: "",
  deposit: "",
  title: "",
  bedrooms: "",
  bathrooms: "",
  areaSize: "",
  furnishing: "",
  leasePeriod: "",
  availability: "",
  description: "",
  amenities: [],
  tenantPrefs: [],
  notes: "",
  images: [],
  lat: -1.2921,
  lng: 36.8219, // default: Nairobi
  contactName: "",
  phone: "",
  email: "",
  contactMethod: "WhatsApp",
  acceptTerms: false,
};

// ── Shared field styles ───────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition-all";
const labelCls =
  "block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider";

// ── Step 1: Basics ────────────────────────────────────────────────────────────
const Step1 = ({ data, onChange, errors }) => (
  <div className="space-y-5">
    <div>
      <label className={labelCls}>Property Type *</label>
      <div className="grid grid-cols-3 gap-2">
        {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange("propertyType", id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
              data.propertyType === id
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-gray-200 bg-white text-gray-500 hover:border-red-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
      {errors.propertyType && (
        <p className="text-xs text-red-500 mt-1">{errors.propertyType}</p>
      )}
    </div>

    <div>
      <label className={labelCls}>Listing Title *</label>
      <input
        type="text"
        placeholder="e.g. Modern 2BR Apartment in Westlands"
        value={data.title}
        onChange={(e) => onChange("title", e.target.value)}
        className={inputCls}
      />
      {errors.title && (
        <p className="text-xs text-red-500 mt-1">{errors.title}</p>
      )}
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className={labelCls}>Monthly Rent (Ksh) *</label>
        <input
          type="number"
          placeholder="45000"
          value={data.price}
          onChange={(e) => onChange("price", e.target.value)}
          className={inputCls}
        />
        {errors.price && (
          <p className="text-xs text-red-500 mt-1">{errors.price}</p>
        )}
      </div>
      <div>
        <label className={labelCls}>Deposit (Ksh)</label>
        <input
          type="number"
          placeholder="90000"
          value={data.deposit}
          onChange={(e) => onChange("deposit", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  </div>
);

// ── Step 2: Details ───────────────────────────────────────────────────────────
const Step2 = ({ data, onChange, errors }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-3 gap-3">
      {[
        ["bedrooms", "Bedrooms *", [1, 2, 3, 4, 5, 6]],
        ["bathrooms", "Bathrooms *", [1, 2, 3, 4, 5]],
      ].map(([key, lbl, opts]) => (
        <div key={key}>
          <label className={labelCls}>{lbl}</label>
          <select
            value={data[key]}
            onChange={(e) => onChange(key, e.target.value)}
            className={inputCls}
          >
            <option value="">—</option>
            {opts.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {errors[key] && (
            <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
          )}
        </div>
      ))}
      <div>
        <label className={labelCls}>Area (m²)</label>
        <input
          type="number"
          placeholder="95"
          value={data.areaSize}
          onChange={(e) => onChange("areaSize", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className={labelCls}>Furnishing *</label>
        <select
          value={data.furnishing}
          onChange={(e) => onChange("furnishing", e.target.value)}
          className={inputCls}
        >
          <option value="">Select</option>
          {FURNISHING.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        {errors.furnishing && (
          <p className="text-xs text-red-500 mt-1">{errors.furnishing}</p>
        )}
      </div>
      <div>
        <label className={labelCls}>Lease Period *</label>
        <select
          value={data.leasePeriod}
          onChange={(e) => onChange("leasePeriod", e.target.value)}
          className={inputCls}
        >
          <option value="">Select</option>
          {LEASE_OPTIONS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        {errors.leasePeriod && (
          <p className="text-xs text-red-500 mt-1">{errors.leasePeriod}</p>
        )}
      </div>
    </div>

    <div>
      <label className={labelCls}>Available From *</label>
      <select
        value={data.availability}
        onChange={(e) => onChange("availability", e.target.value)}
        className={inputCls}
      >
        <option value="">Select</option>
        {AVAILABILITY.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>
      {errors.availability && (
        <p className="text-xs text-red-500 mt-1">{errors.availability}</p>
      )}
    </div>

    <div>
      <label className={labelCls}>Description *</label>
      <textarea
        rows={4}
        placeholder="Describe the property — interior, location highlights, transport links…"
        value={data.description}
        onChange={(e) => onChange("description", e.target.value)}
        className={`${inputCls} resize-none`}
      />
      <p className="text-xs text-gray-400 mt-1">
        {data.description.length} chars
      </p>
      {errors.description && (
        <p className="text-xs text-red-500 mt-1">{errors.description}</p>
      )}
    </div>
  </div>
);

// ── Step 3: Amenities ─────────────────────────────────────────────────────────
const Step3 = ({ data, onChange }) => {
  const toggle = (id) => {
    const cur = data.amenities || [];
    onChange(
      "amenities",
      cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id],
    );
  };
  const togglePref = (p) => {
    const cur = data.tenantPrefs || [];
    onChange(
      "tenantPrefs",
      cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p],
    );
  };
  return (
    <div className="space-y-6">
      <div>
        <label className={labelCls}>Amenities</label>
        <div className="grid grid-cols-4 gap-2">
          {AMENITIES.map(({ id, label, icon: Icon }) => {
            const active = (data.amenities || []).includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                  active
                    ? "border-red-400 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {active && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelCls}>Tenant Preferences</label>
        <div className="flex flex-wrap gap-2">
          {[
            "Families",
            "Couples",
            "Singles",
            "Students",
            "Professionals",
            "Any",
          ].map((p) => {
            const active = (data.tenantPrefs || []).includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => togglePref(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                  active
                    ? "border-red-400 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-200"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={labelCls}>Additional Notes</label>
        <textarea
          rows={3}
          placeholder="House rules, special conditions…"
          value={data.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
};

// ── Map click handler ─────────────────────────────────────────────────────────
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: (e) => onMapClick(e.latlng.lat, e.latlng.lng) });
  return null;
};

// ── Step 4: Location ──────────────────────────────────────────────────────────
const Step4 = ({ data, onChange, errors }) => {
  const [geocoding, setGeocoding] = useState(false);

  const geocodeAddress = async () => {
    const query = [data.address, data.area, data.city]
      .filter(Boolean)
      .join(", ");
    if (!query) return;
    setGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      );
      const json = await res.json();
      if (json.length > 0) {
        onChange("lat", parseFloat(json[0].lat));
        onChange("lng", parseFloat(json[0].lon));
      }
    } catch {}
    setGeocoding(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>City *</label>
        <select
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
          className={inputCls}
        >
          <option value="">Select city</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.city && (
          <p className="text-xs text-red-500 mt-1">{errors.city}</p>
        )}
      </div>

      <div>
        <label className={labelCls}>Neighborhood / Area *</label>
        <input
          type="text"
          placeholder="e.g. Westlands"
          value={data.area}
          onChange={(e) => onChange("area", e.target.value)}
          className={inputCls}
          list="areas-dl"
        />
        <datalist id="areas-dl">
          {NAIROBI_AREAS.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>
        {errors.area && (
          <p className="text-xs text-red-500 mt-1">{errors.area}</p>
        )}
      </div>

      <div>
        <label className={labelCls}>Full Street Address *</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. 14 Mpaka Road, Westlands"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={geocodeAddress}
            disabled={geocoding}
            className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {geocoding ? "…" : "Pin"}
          </button>
        </div>
        {errors.address && (
          <p className="text-xs text-red-500 mt-1">{errors.address}</p>
        )}
      </div>

      {/* Map */}
      <div>
        <label className={labelCls}>
          Pin on map — click to adjust location
        </label>
        <div className="rounded-2xl overflow-hidden border border-gray-200 h-56">
          <MapContainer
            center={[data.lat || -1.2921, data.lng || 36.8219]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
            key={`${data.lat}-${data.lng}`}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler
              onMapClick={(lat, lng) => {
                onChange("lat", lat);
                onChange("lng", lng);
              }}
            />
            {data.lat && data.lng && <Marker position={[data.lat, data.lng]} />}
          </MapContainer>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          Coordinates: {data.lat?.toFixed(4)}, {data.lng?.toFixed(4)}
        </p>
      </div>
    </div>
  );
};

// ── Step 5: Photos ────────────────────────────────────────────────────────────
const Step5 = ({ data, onChange, errors }) => {
  const [urlInput, setUrlInput] = useState("");
  const add = () => {
    const t = urlInput.trim();
    if (!t || (data.images || []).length >= 10) return;
    onChange("images", [...(data.images || []), t]);
    setUrlInput("");
  };
  const remove = (i) => {
    const imgs = [...(data.images || [])];
    imgs.splice(i, 1);
    onChange("images", imgs);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>Property Photos * (up to 10)</label>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={add}
            disabled={(data.images || []).length >= 10}
            className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-40 flex-shrink-0 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {(data.images || []).length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {(data.images || []).map((url, i) => (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden aspect-video bg-gray-100"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Invalid";
                  }}
                />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
            <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">
              No photos yet — listings with photos get 3× more enquiries
            </p>
          </div>
        )}
        {errors.images && (
          <p className="text-xs text-red-500 mt-1">{errors.images}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {(data.images || []).length} / 10 added
        </p>
      </div>
    </div>
  );
};

// ── Step 6: Contact ───────────────────────────────────────────────────────────
const Step6 = ({ data, onChange, errors }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className={labelCls}>Your Name *</label>
        <input
          type="text"
          placeholder="Full name"
          value={data.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
          className={inputCls}
        />
        {errors.contactName && (
          <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>
        )}
      </div>
      <div>
        <label className={labelCls}>Phone Number *</label>
        <input
          type="tel"
          placeholder="+254 7XX XXX XXX"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={inputCls}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>
    </div>

    <div>
      <label className={labelCls}>Email Address *</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        className={inputCls}
      />
      {errors.email && (
        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
      )}
    </div>

    <div>
      <label className={labelCls}>Preferred Contact Method</label>
      <div className="flex gap-2">
        {["WhatsApp", "Call", "Email"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange("contactMethod", m)}
            className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
              data.contactMethod === m
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-gray-200 bg-white text-gray-500 hover:border-red-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.acceptTerms || false}
          onChange={(e) => onChange("acceptTerms", e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-red-500 flex-shrink-0"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I confirm I am the owner or authorised agent and agree to SmartHomes'{" "}
          <a href="#" className="text-red-500 underline">
            Terms & Conditions
          </a>
          .
        </span>
      </label>
      {errors.acceptTerms && (
        <p className="text-xs text-red-500 mt-1">{errors.acceptTerms}</p>
      )}
    </div>
  </div>
);

// ── Review summary ────────────────────────────────────────────────────────────
const Review = ({ data }) => (
  <div className="space-y-1">
    {[
      ["Title", data.title],
      ["Type", data.propertyType],
      ["Location", `${data.area || "—"}, ${data.city || "—"}`],
      ["Address", data.address],
      [
        "Rent",
        data.price ? `Ksh ${Number(data.price).toLocaleString()} / mo` : "—",
      ],
      [
        "Deposit",
        data.deposit ? `Ksh ${Number(data.deposit).toLocaleString()}` : "—",
      ],
      ["Bedrooms", data.bedrooms],
      ["Bathrooms", data.bathrooms],
      ["Furnishing", data.furnishing],
      ["Lease", data.leasePeriod],
      ["Available", data.availability],
      ["Photos", `${(data.images || []).length} added`],
      ["Amenities", (data.amenities || []).join(", ") || "None"],
      ["Contact", `${data.contactName} · ${data.phone}`],
    ].map(([label, value]) => (
      <div
        key={label}
        className="flex justify-between items-start py-2.5 border-b border-gray-100 last:border-0 gap-4"
      >
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide flex-shrink-0 w-24">
          {label}
        </span>
        <span className="text-sm text-gray-800 text-right flex-1">
          {value || "—"}
        </span>
      </div>
    ))}
  </div>
);

// ── Drawer shell ──────────────────────────────────────────────────────────────
const ListingFormDrawer = ({ open, onClose, onSave, editingProperty }) => {
  const isEdit = !!editingProperty;
  const TOTAL = 6;

  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [direction, setDirection] = useState(1);
  const [animState, setAnimState] = useState("entering");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Populate form when editing
  useEffect(() => {
    if (editingProperty) {
      setData({ ...INITIAL, ...editingProperty });
    } else {
      setData(INITIAL);
    }
    setStep(1);
    setErrors({});
  }, [editingProperty, open]);

  // Animate in
  useEffect(() => {
    if (!open) return;
    setAnimState("entering");
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimState("visible")),
    );
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleClose = useCallback(() => {
    setAnimState("leaving");
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [handleClose]);

  const onChange = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.propertyType) e.propertyType = "Select a property type.";
      if (!data.title) e.title = "Enter a listing title.";
      if (!data.price) e.price = "Enter monthly rent.";
    }
    if (s === 2) {
      if (!data.bedrooms) e.bedrooms = "Select bedrooms.";
      if (!data.bathrooms) e.bathrooms = "Select bathrooms.";
      if (!data.furnishing) e.furnishing = "Select furnishing.";
      if (!data.leasePeriod) e.leasePeriod = "Select lease period.";
      if (!data.availability) e.availability = "Select availability.";
      if (!data.description || data.description.length < 20)
        e.description = "Write at least 20 characters.";
    }
    if (s === 4) {
      if (!data.city) e.city = "Select a city.";
      if (!data.area) e.area = "Enter the neighborhood.";
      if (!data.address) e.address = "Enter the street address.";
    }
    if (s === 5) {
      if (!data.images || data.images.length === 0)
        e.images = "Add at least one photo.";
    }
    if (s === 6) {
      if (!data.contactName) e.contactName = "Enter your name.";
      if (!data.phone) e.phone = "Enter your phone number.";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !re.test(data.email)) e.email = "Enter a valid email.";
      if (!data.acceptTerms) e.acceptTerms = "Accept the terms to continue.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step <= TOTAL && !validate(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL + 1));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = () => {
    if (!validate(TOTAL)) return;
    onSave({
      ...data,
      id: editingProperty?.id || Date.now(),
      active: editingProperty?.active !== false,
    });
    handleClose();
  };

  const isVisible = animState === "visible";
  const progress = ((Math.min(step, TOTAL) - 1) / TOTAL) * 100;

  const drawerStyle = isMobile
    ? {
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
      }
    : {
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
      };

  const backdropStyle = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
  };

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/50"
        style={backdropStyle}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={[
          "fixed z-[201] bg-white flex flex-col shadow-2xl",
          "bottom-0 left-0 right-0 rounded-t-3xl max-h-[95vh]",
          "md:bottom-0 md:top-0 md:left-auto md:right-0 md:w-[520px] md:max-h-none md:rounded-none md:rounded-l-3xl",
        ].join(" ")}
        style={drawerStyle}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {isEdit ? "Edit property" : "Add new property"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {step <= TOTAL ? `Step ${step} of ${TOTAL}` : "Review & publish"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 flex-shrink-0">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-400"
            animate={{ width: `${step > TOTAL ? 100 : progress}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>

        {/* Step tabs */}
        <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-50 overflow-x-auto flex-shrink-0">
          {STEPS.map(({ num, label, icon: Icon }) => (
            <div
              key={num}
              className="flex flex-col items-center gap-0.5 flex-shrink-0 px-1.5"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  step > num
                    ? "bg-red-500 text-white"
                    : step === num
                      ? "bg-red-100 text-red-600 ring-2 ring-red-200"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > num ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3 h-3" />
                )}
              </div>
              <span
                className={`text-[9px] font-semibold ${
                  step === num
                    ? "text-red-500"
                    : step > num
                      ? "text-green-500"
                      : "text-gray-300"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {step === 1 && (
                <Step1 data={data} onChange={onChange} errors={errors} />
              )}
              {step === 2 && (
                <Step2 data={data} onChange={onChange} errors={errors} />
              )}
              {step === 3 && <Step3 data={data} onChange={onChange} />}
              {step === 4 && (
                <Step4 data={data} onChange={onChange} errors={errors} />
              )}
              {step === 5 && (
                <Step5 data={data} onChange={onChange} errors={errors} />
              )}
              {step === 6 && (
                <Step6 data={data} onChange={onChange} errors={errors} />
              )}
              {step === 7 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">
                    Review your listing
                  </h3>
                  <Review data={data} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
          <button
            onClick={back}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step <= TOTAL ? (
            <button
              onClick={next}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md shadow-red-200 transition-all active:scale-95"
            >
              {step === TOTAL ? "Review" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold shadow-md shadow-green-200 transition-all active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              {isEdit ? "Save changes" : "Publish listing"}
            </button>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ListingFormDrawer;
