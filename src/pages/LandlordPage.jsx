// src/pages/LandlordPage.jsx
// Landlord property management dashboard

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Home,
  TrendingUp,
  Eye,
  MessageSquare,
  ToggleRight,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Building2,
  Sparkles,
} from "lucide-react";
import LandlordPropertyCard from "../components/landload/LandlordPropertyCard";
import ListingFormDrawer from "../components/landload/ListingFormDrawer";

// ── Mock logged-in landlord ───────────────────────────────────────────────────
const LANDLORD = {
  name: "James Mwangi",
  email: "james@example.com",
  avatar: "JM",
};

// ── Sample properties (replace with API data) ─────────────────────────────────
const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Modern 2BR Apartment – Westlands",
    propertyType: "apartments",
    city: "Nairobi",
    area: "Westlands",
    address: "14 Mpaka Road, Westlands",
    price: 55000,
    deposit: 110000,
    bedrooms: 2,
    bathrooms: 2,
    areaSize: 95,
    furnishing: "Furnished",
    leasePeriod: "Unlimited",
    availability: "As soon as possible",
    description: "Beautiful modern apartment with city views.",
    amenities: ["wifi", "parking", "security"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    ],
    lat: -1.2676,
    lng: 36.8041,
    contactName: "James Mwangi",
    phone: "+254712345678",
    email: "james@example.com",
    contactMethod: "WhatsApp",
    acceptTerms: true,
    active: true,
    isNew: true,
    enquiries: 8,
    views: 142,
  },
  {
    id: 2,
    title: "3BR Detached House – Karen",
    propertyType: "detached",
    city: "Nairobi",
    area: "Karen",
    address: "Karen Road, Karen",
    price: 120000,
    deposit: 240000,
    bedrooms: 3,
    bathrooms: 3,
    areaSize: 180,
    furnishing: "Semi-furnished",
    leasePeriod: "1 year",
    availability: "Within 1 month",
    description: "Spacious family home in a serene Karen compound.",
    amenities: ["parking", "security", "garden"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
    ],
    lat: -1.3419,
    lng: 36.7082,
    contactName: "James Mwangi",
    phone: "+254712345678",
    email: "james@example.com",
    contactMethod: "WhatsApp",
    acceptTerms: true,
    active: false,
    isNew: false,
    enquiries: 3,
    views: 67,
  },
];

// ── Stats card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
    <div
      className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  </div>
);

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = ({ onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-5">
      <Building2 className="w-10 h-10 text-red-300" />
    </div>
    <h3 className="text-base font-bold text-gray-800 mb-2">
      No properties yet
    </h3>
    <p className="text-sm text-gray-400 max-w-xs mb-6 leading-relaxed">
      Add your first property listing and start reaching thousands of verified
      tenants.
    </p>
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-red-200 active:scale-95"
    >
      <Plus className="w-4 h-4" />
      Add your first property
    </button>
  </motion.div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const LandlordPage = () => {
  const [properties, setProperties] = useState(SAMPLE_PROPERTIES);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive
  const [toast, setToast] = useState(null);

  // ── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── CRUD ────────────────────────────────────────────────────────────────────
  const handleSave = (data) => {
    setProperties((prev) => {
      const exists = prev.find((p) => p.id === data.id);
      if (exists) {
        showToast("Property updated successfully.");
        return prev.map((p) => (p.id === data.id ? { ...p, ...data } : p));
      }
      showToast("Property published successfully! 🎉");
      return [{ ...data, enquiries: 0, views: 0, isNew: true }, ...prev];
    });
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast("Property deleted.", "info");
  };

  const handleToggleActive = (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  };

  const openAddDrawer = () => {
    setEditingProperty(null);
    setDrawerOpen(true);
  };

  // ── Derived lists ────────────────────────────────────────────────────────────
  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.area || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? p.active !== false
          : p.active === false;
    return matchSearch && matchStatus;
  });

  const totalActive = properties.filter((p) => p.active !== false).length;
  const totalViews = properties.reduce((s, p) => s + (p.views || 0), 0);
  const totalEnquiries = properties.reduce((s, p) => s + (p.enquiries || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${
              toast.type === "info"
                ? "bg-gray-800 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {toast.type === "info" ? (
              <XCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Welcome card ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 mb-6 text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {LANDLORD.avatar}
              </div>
              <div>
                <p className="text-red-100 text-xs font-medium mb-0.5">
                  Welcome back
                </p>
                <h1 className="text-xl font-bold">{LANDLORD.name}</h1>
                <p className="text-red-200 text-xs mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {properties.length}{" "}
                  {properties.length === 1 ? "property" : "properties"} listed
                </p>
              </div>
            </div>

            <button
              onClick={openAddDrawer}
              className="flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-3 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-shadow active:scale-95 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add property
            </button>
          </div>

          {/* Stats row */}
          <div className="relative grid grid-cols-3 gap-3 mt-6">
            {[
              { label: "Active listings", value: totalActive, icon: Home },
              { label: "Total views", value: totalViews, icon: Eye },
              {
                label: "Total enquiries",
                value: totalEnquiries,
                icon: MessageSquare,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/15 rounded-2xl p-3 text-center backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 mx-auto mb-1 text-red-100" />
                <p className="text-xl font-bold">{value}</p>
                <p className="text-[10px] text-red-200 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Search + filter bar ─────────────────────────────────────────── */}
        {properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your properties…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition-all"
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
              {[
                { id: "all", label: "All" },
                { id: "active", label: "Active", icon: CheckCircle },
                { id: "inactive", label: "Inactive", icon: XCircle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setFilterStatus(id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === id
                      ? "bg-red-500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {label}
                </button>
              ))}
            </div>

            {/* Add button — desktop shortcut */}
            <button
              onClick={openAddDrawer}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-red-200 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add property
            </button>
          </motion.div>
        )}

        {/* ── Property grid / empty state ─────────────────────────────────── */}
        {properties.length === 0 ? (
          <EmptyState onAdd={openAddDrawer} />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            <Filter className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-sm font-medium">
              No properties match your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="mt-3 text-xs text-red-500 underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((property, i) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.06 },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <LandlordPropertyCard
                    property={property}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleActive={handleToggleActive}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Listing form drawer ─────────────────────────────────────────────── */}
      <ListingFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
        editingProperty={editingProperty}
      />
    </div>
  );
};

export default LandlordPage;
