// src/pages/UserPage.jsx

import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Heart,
  Settings,
  MapPin,
  Bed,
  Bath,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  LayoutDashboard,
  Lock,
  Sparkles,
  LogOut,
  Camera,
  Home,
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_USER = {
  name: "Aisha Kamau",
  email: "aisha.kamau@gmail.com",
  phone: "+254 712 345 678",
  tenantType: "Single",
  isLandlord: true,
  memberSince: "March 2024",
  initials: "AK",
  avatar: null,
};

const MOCK_SAVED = [
  {
    id: 1,
    title: "Modern 2BR Apartment – Westlands",
    address: "Westlands, Nairobi",
    city: "Nairobi",
    price: 55000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    rating: 4.8,
    reviews: 42,
    isNew: true,
    savedAt: "2025-05-10",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
  },
  {
    id: 2,
    title: "Spacious 3BR House – Kilimani",
    address: "Kilimani, Nairobi",
    city: "Nairobi",
    price: 120000,
    bedrooms: 3,
    bathrooms: 3,
    type: "House",
    rating: 4.9,
    reviews: 28,
    isNew: false,
    savedAt: "2025-04-22",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  },
  {
    id: 3,
    title: "Beachfront Suite – Nyali",
    address: "Nyali, Mombasa",
    city: "Mombasa",
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Suite",
    rating: 5.0,
    reviews: 19,
    isNew: true,
    savedAt: "2025-05-18",
    image:
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=600&q=80",
  },
  {
    id: 4,
    title: "Student Apartment – Near UoN",
    address: "Parklands, Nairobi",
    city: "Nairobi",
    price: 14000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Student",
    rating: 4.6,
    reviews: 55,
    isNew: false,
    savedAt: "2025-03-05",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
];

const TABS = [
  { id: "saved", label: "Saved", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Recently saved" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "alpha", label: "A → Z" },
];

// ── Profile completion logic ──────────────────────────────────────────────────
const getCompletion = (user, hasAvatar) => {
  const checks = [
    { label: "Name", done: !!user.name },
    { label: "Email", done: !!user.email },
    { label: "Phone", done: !!user.phone },
    { label: "Tenant type", done: !!user.tenantType },
    { label: "Photo", done: hasAvatar },
  ];
  const pct = Math.round(
    (checks.filter((c) => c.done).length / checks.length) * 100,
  );
  return { checks, pct };
};

// ── Undo toast ────────────────────────────────────────────────────────────────
const UndoToast = ({ listing, onUndo, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl"
  >
    <Heart className="w-4 h-4 text-red-400 fill-red-400 flex-shrink-0" />
    <span className="whitespace-nowrap">Removed from saved</span>
    <button
      onClick={onUndo}
      className="flex items-center gap-1 ml-1 text-red-400 hover:text-red-300 font-semibold text-xs transition-colors"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Undo
    </button>
    <button
      onClick={onDismiss}
      className="ml-1 text-gray-500 hover:text-gray-300 transition-colors"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

// ── Sort Dropdown ─────────────────────────────────────────────────────────────
const SortDropdown = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = SORT_OPTIONS.find((o) => o.value === sortBy);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 bg-white border rounded-xl px-3 py-2.5 transition-all duration-200 shadow-sm ${
          open
            ? "border-red-300 bg-red-50 shadow-red-100"
            : "border-gray-200 hover:border-red-300 hover:bg-red-50"
        }`}
      >
        <ArrowUpDown
          className={`w-3.5 h-3.5 transition-colors ${open ? "text-red-500" : "text-gray-400"}`}
        />
        <span
          className={`text-xs font-semibold whitespace-nowrap hidden sm:block transition-colors ${
            open ? "text-red-600" : "text-gray-600"
          }`}
        >
          {current?.label}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.32, 0, 0.67, 0] }}
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-colors ${open ? "text-red-500" : "text-gray-400"}`}
          />
        </motion.div>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[190px] bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/80 overflow-hidden"
            style={{ transformOrigin: "top right" }}
          >
            {/* Subtle header */}
            <div className="px-4 pt-3 pb-2 border-b border-gray-50">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Sort by
              </p>
            </div>

            <div className="p-1.5">
              {SORT_OPTIONS.map((opt, i) => {
                const isActive = sortBy === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.15 }}
                    onClick={() => {
                      setSortBy(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <Check className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Saved listing card ────────────────────────────────────────────────────────
const SavedCard = ({ listing, onRemove }) => {
  const [leaving, setLeaving] = useState(false);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLeaving(true);
    setTimeout(() => onRemove(listing.id), 360);
  };

  return (
    <motion.div
      layout
      animate={{
        opacity: leaving ? 0 : 1,
        scale: leaving ? 0.95 : 1,
        y: leaving ? 6 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.32, 0, 0.67, 0] }}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/property/${listing.id}`} className="block">
        {/* Image */}
        <div className="relative h-40 sm:h-44 overflow-hidden bg-gray-100">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {listing.isNew && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow">
              NEW
            </span>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-[11px] font-semibold">
              {listing.rating}
            </span>
            <span className="text-white/60 text-[10px]">
              ({listing.reviews})
            </span>
          </div>

          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:scale-110 transition-all duration-200"
            title="Remove from saved"
          >
            <Heart className="w-4 h-4 fill-red-400 text-red-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-3 sm:p-4">
          <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-1.5">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{listing.address}</span>
          </p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-3">
            {listing.title}
          </h3>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-gray-400 mb-3 pb-3 border-b border-gray-100">
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {listing.bedrooms}bd
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {listing.bathrooms}ba
            </span>
            <span className="ml-auto bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {listing.type}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">/ month</p>
              <p className="text-sm sm:text-base text-gray-900 font-semibold leading-none">
                Ksh {listing.price.toLocaleString()}
              </p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-red-500">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ── Input field ───────────────────────────────────────────────────────────────
const Field = ({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
}) => (
  <div>
    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-10" : "pl-4"} ${suffix ? "pr-11" : "pr-4"} py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 focus:bg-white transition-all`}
      />
      {suffix && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

// ── Feedback message ──────────────────────────────────────────────────────────
const Feedback = ({ msg }) => (
  <AnimatePresence>
    {msg && (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`flex items-center gap-2 text-xs font-semibold ${msg.type === "ok" ? "text-green-600" : "text-red-500"}`}
      >
        {msg.type === "ok" ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <AlertCircle className="w-4 h-4" />
        )}
        {msg.text}
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Settings tab ──────────────────────────────────────────────────────────────
const SettingsTab = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    tenantType: user.tenantType,
  });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [profileMsg, setProfileMsg] = useState(null);
  const [pwMsg, setPwMsg] = useState(null);

  const saveProfile = () => {
    setProfileMsg({ type: "ok", text: "Profile updated successfully." });
    setTimeout(() => setProfileMsg(null), 3000);
  };

  const savePassword = () => {
    if (!pw.current)
      return setPwMsg({ type: "err", text: "Enter your current password." });
    if (pw.next.length < 8)
      return setPwMsg({
        type: "err",
        text: "New password must be at least 8 chars.",
      });
    if (pw.next !== pw.confirm)
      return setPwMsg({ type: "err", text: "Passwords do not match." });
    setPwMsg({ type: "ok", text: "Password changed successfully." });
    setPw({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwMsg(null), 3000);
  };

  const SectionHeader = ({ icon: Icon, label, danger }) => (
    <div
      className={`px-6 py-4 border-b flex items-center gap-2.5 ${danger ? "border-red-100" : "border-gray-100"}`}
    >
      <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-red-100">
        <Icon className="w-3.5 h-3.5 text-red-500" />
      </div>
      <h3
        className={`text-sm font-semibold ${danger ? "text-red-600" : "text-gray-900"}`}
      >
        {label}
      </h3>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Personal info */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <SectionHeader icon={User} label="Personal information" />
        <div className="p-6 space-y-4">
          <Field
            label="Full name"
            icon={User}
            value={profile.name}
            onChange={(e) =>
              setProfile((p) => ({ ...p, name: e.target.value }))
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Email address"
              icon={Mail}
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
            <Field
              label="Phone number"
              icon={Phone}
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Tenant type
            </label>
            <div className="flex flex-wrap gap-2">
              {["Single", "Student", "Couple", "Family"].map((t) => (
                <button
                  key={t}
                  onClick={() => setProfile((p) => ({ ...p, tenantType: t }))}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                    profile.tenantType === t
                      ? "border-red-400 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between gap-4">
            <Feedback msg={profileMsg} />
            <button
              onClick={saveProfile}
              className="ml-auto px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-xs transition-all active:scale-95 shadow-sm shadow-red-200"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <SectionHeader icon={Lock} label="Change password" />
        <div className="p-6 space-y-4">
          {[
            {
              key: "current",
              label: "Current password",
              placeholder: "••••••••",
            },
            {
              key: "next",
              label: "New password",
              placeholder: "At least 8 characters",
            },
            {
              key: "confirm",
              label: "Confirm new password",
              placeholder: "Repeat new password",
            },
          ].map(({ key, label, placeholder }) => (
            <Field
              key={key}
              label={label}
              type={show[key] ? "text" : "password"}
              icon={Lock}
              value={pw[key]}
              placeholder={placeholder}
              onChange={(e) => setPw((p) => ({ ...p, [key]: e.target.value }))}
              suffix={
                <button
                  onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {show[key] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
            />
          ))}
          <div className="pt-2 flex items-center justify-between gap-4">
            <Feedback msg={pwMsg} />
            <button
              onClick={savePassword}
              className="ml-auto px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-xs transition-all active:scale-95 shadow-sm shadow-red-200"
            >
              Update password
            </button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
        <SectionHeader icon={Trash2} label="Danger zone" danger />
        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-0.5">
              Delete account
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Permanently remove your account and all data. This cannot be
              undone.
            </p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-xl text-xs transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Delete my account
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main UserPage ─────────────────────────────────────────────────────────────
const UserPage = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [saved, setSaved] = useState(MOCK_SAVED);
  const [avatarUrl, setAvatarUrl] = useState(MOCK_USER.avatar);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [toast, setToast] = useState(null);
  const [undoBuffer, setUndoBuffer] = useState(null);
  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const user = MOCK_USER;
  const { checks, pct } = getCompletion(user, !!avatarUrl);

  // ── Avatar upload ──────────────────────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Remove saved with undo ─────────────────────────────────────────────────
  const handleRemove = useCallback(
    (id) => {
      const listing = saved.find((l) => l.id === id);
      setSaved((s) => s.filter((l) => l.id !== id));
      setUndoBuffer(listing);
      clearTimeout(toastTimerRef.current);
      setToast({ listing });
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
        setUndoBuffer(null);
      }, 5000);
    },
    [saved],
  );

  const handleUndo = () => {
    if (undoBuffer) {
      setSaved((s) => {
        const exists = s.find((l) => l.id === undoBuffer.id);
        if (exists) return s;
        return [...s, undoBuffer].sort((a, b) => a.id - b.id);
      });
    }
    setToast(null);
    setUndoBuffer(null);
    clearTimeout(toastTimerRef.current);
  };

  // ── Filter + sort saved ────────────────────────────────────────────────────
  const filteredSaved = saved
    .filter((l) => {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "alpha") return a.title.localeCompare(b.title);
      return new Date(b.savedAt) - new Date(a.savedAt);
    });

  return (
    <div className="min-h-screen bg-[#f8f7f5] pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 space-y-4"
          >
            {/* Profile card */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-20 bg-gradient-to-r from-red-500 to-red-400 relative">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)",
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>

              <div className="px-5 pb-5 -mt-9">
                {/* Avatar with upload */}
                <div className="relative w-fit mb-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[72px] h-[72px] rounded-2xl border-4 border-white shadow-lg flex items-center justify-center cursor-pointer overflow-hidden bg-white hover:opacity-90 transition-opacity"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-red-500">
                        {user.initials}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors shadow-md"
                  >
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                <h2 className="text-base font-semibold text-gray-900 leading-tight">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>

                {/* Profile completion */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-gray-500">
                      Profile completion
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${pct === 100 ? "text-green-500" : "text-red-500"}`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${pct === 100 ? "bg-green-500" : "bg-red-500"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  {pct < 100 && (
                    <div className="mt-2 space-y-1">
                      {checks
                        .filter((c) => !c.done)
                        .map((c) => (
                          <p
                            key={c.label}
                            className="text-[10px] text-gray-400 flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
                            Add {c.label.toLowerCase()}
                          </p>
                        ))}
                    </div>
                  )}
                </div>

                {/* Info rows */}
                <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                  {[
                    {
                      icon: Sparkles,
                      label: "Member since",
                      value: user.memberSince,
                    },
                    {
                      icon: Home,
                      label: "Tenant type",
                      value: user.tenantType,
                    },
                    { icon: Phone, label: "Phone", value: user.phone },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                      <span className="text-gray-400">{label}:</span>
                      <span className="font-semibold text-gray-700 truncate">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                  </button>
                </div>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === id
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {activeTab === id && (
                    <motion.div
                      layoutId="sidebar-pill"
                      className="absolute inset-0 bg-gray-100 rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${activeTab === id ? "text-red-500" : ""}`}
                  />
                  <span className="relative z-10">{label}</span>
                  {id === "saved" && saved.length > 0 && (
                    <span
                      className={`relative z-10 ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        activeTab === id
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {saved.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Landlord portal */}
            {user.isLandlord && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/landlord" className="group block">
                  <div className="bg-gray-900 rounded-2xl p-4 hover:bg-gray-800 transition-colors shadow-sm">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-white">
                        Landlord portal
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      Manage listings, track enquiries and update availability.
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-red-400 group-hover:text-red-300 transition-colors">
                      Go to dashboard
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </motion.aside>

          {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* ── SAVED LISTINGS ──────────────────────────────────────── */}
                {activeTab === "saved" && (
                  <div>
                    {/* Header */}
                    <div className="flex items-end justify-between mb-5">
                      <div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                          Saved listings
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {filteredSaved.length} of {saved.length}{" "}
                          {saved.length === 1 ? "property" : "properties"}
                        </p>
                      </div>
                      <Link
                        to="/search"
                        className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        Browse more <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Search + sort bar */}
                    {saved.length > 0 && (
                      <div className="flex gap-2 mb-5">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input
                            type="text"
                            placeholder="Search by name, city or type…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* ── Styled sort dropdown ── */}
                        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                      </div>
                    )}

                    {/* Grid or empty states */}
                    {saved.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-5"
                        >
                          <Heart className="w-8 h-8 text-red-300" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Nothing saved yet
                        </h3>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto mb-6 leading-relaxed">
                          Tap the heart on any listing to save it here for
                          later.
                        </p>
                        <Link
                          to="/search"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-red-200"
                        >
                          Browse listings <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    ) : filteredSaved.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl border border-gray-100 p-12 text-center"
                      >
                        <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-500">
                          No listings match "{searchQuery}"
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-xs text-red-500 underline"
                        >
                          Clear search
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        layout
                        // ↓ KEY CHANGE: 2-col on mobile, 2-col on sm, 3-col on xl
                        className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                      >
                        <AnimatePresence>
                          {filteredSaved.map((listing, i) => (
                            <motion.div
                              key={listing.id}
                              layout
                              initial={{ opacity: 0, y: 16 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: i * 0.06 },
                              }}
                              exit={{ opacity: 0, scale: 0.95 }}
                            >
                              <SavedCard
                                listing={listing}
                                onRemove={handleRemove}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ── SETTINGS ────────────────────────────────────────────── */}
                {activeTab === "settings" && (
                  <div>
                    <div className="mb-5">
                      <h1 className="text-2xl font-semibold text-gray-900">
                        Account settings
                      </h1>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Manage your profile and security
                      </p>
                    </div>
                    <SettingsTab user={user} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* ── Mobile bottom tab bar ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              activeTab === id ? "text-red-500" : "text-gray-400"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {id === "saved" && saved.length > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[9px] font-semibold bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                  {saved.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Undo toast ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <UndoToast
            listing={toast.listing}
            onUndo={handleUndo}
            onDismiss={() => {
              setToast(null);
              setUndoBuffer(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPage;
