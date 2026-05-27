// src/components/landlord/LandlordPropertyCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

const LandlordPropertyCard = ({
  property,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const image =
    property.images?.[0] ||
    property.image ||
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80";
  const active = property.active !== false; // default true

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${
        active ? "border-gray-200" : "border-dashed border-gray-300 opacity-70"
      }`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Status badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
            active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}
        >
          {active ? (
            <>
              <CheckCircle className="w-3 h-3" /> Active
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3" /> Inactive
            </>
          )}
        </div>

        {/* New badge */}
        {property.isNew && (
          <div className="absolute top-3 right-12 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            New
          </div>
        )}

        {/* Three-dot menu */}
        <div className="absolute top-2.5 right-2.5">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 z-20 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      onEdit(property);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                    Edit listing
                  </button>

                  <Link
                    to={`/property/${property.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    View live listing
                  </Link>

                  <button
                    onClick={() => {
                      onToggleActive(property.id);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {active ? (
                      <>
                        <ToggleRight className="w-3.5 h-3.5 text-green-500" />{" "}
                        Set inactive
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-3.5 h-3.5 text-gray-400" /> Set
                        active
                      </>
                    )}
                  </button>

                  <div className="border-t border-gray-100" />

                  <button
                    onClick={() => {
                      setConfirmDel(true);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete listing
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3" />
          {property.area}
          {property.city ? `, ${property.city}` : ""}
        </p>

        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-3 leading-snug">
          {property.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5" />
            {property.bedrooms || "—"} bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            {property.bathrooms || "—"} bath
          </span>
          <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
            {property.propertyType || property.type || "Property"}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400">Monthly rent</p>
            <p className="text-base font-bold text-gray-900">
              Ksh {Number(property.price).toLocaleString()}
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(property)}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors text-gray-500"
              title="Edit"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <Link
              to={`/property/${property.id}`}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-500 flex items-center justify-center transition-colors text-gray-500"
              title="View live"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {confirmDel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setConfirmDel(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm mx-4"
            >
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900 text-center mb-2">
                Delete this listing?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                <strong>{property.title}</strong> will be permanently removed.
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDel(false)}
                  className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:border-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(property.id);
                    setConfirmDel(false);
                  }}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandlordPropertyCard;
