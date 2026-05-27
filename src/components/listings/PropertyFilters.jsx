// src/components/listings/PropertyFilters.jsx

import React, { useState } from "react";
import {
  Home,
  Building2,
  DoorOpen,
  Building,
  GraduationCap,
  RefreshCw,
  Trash2,
  ChevronDown,
  Check,
} from "lucide-react";

// ── Room Dropdown — matches PageHeader sort dropdown style ────────────────────
const ROOM_OPTIONS = ["1", "2", "3", "4", "5+"];

const RoomDropdown = ({ value, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayValue = value ? (value === "5" ? "5+" : value) : placeholder;

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
          open
            ? "border-red-300 bg-red-50 shadow-sm text-red-600"
            : value
              ? "border-gray-300 bg-white text-gray-800 hover:border-red-300 hover:bg-red-50"
              : "border-gray-200 bg-white text-gray-400 hover:border-red-300 hover:bg-red-50"
        }`}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
            open ? "rotate-180 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 bottom-full mb-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50">
          <div className="p-1.5">
            {/* Clear / placeholder option */}
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                !value
                  ? "bg-red-50 text-red-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span>{placeholder}</span>
              {!value && <Check className="w-4 h-4" />}
            </button>

            {/* Number options */}
            {ROOM_OPTIONS.map((opt) => {
              const active =
                value === opt.replace("+", "") ||
                (opt === "5+" && value === "5");
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt.replace("+", ""));
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{opt}</span>
                  {active && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const PropertyFilters = ({
  filters,
  onFilterChange,
  onUpdateResults,
  onClearFilters,
}) => {
  const propertyTypes = [
    { id: "room", label: "Room", icon: DoorOpen },
    { id: "detached", label: "Detached house", icon: Home },
    { id: "apartments", label: "Apartments", icon: Building2 },
    { id: "suites", label: "Suites", icon: Building },
    { id: "student", label: "Student Apartments", icon: GraduationCap },
  ];

  const togglePropertyType = (typeId) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(typeId)
      ? currentTypes.filter((t) => t !== typeId)
      : [...currentTypes, typeId];
    onFilterChange({ propertyTypes: newTypes });
  };

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    } else {
      onFilterChange({
        propertyTypes: [],
        minRent: "",
        maxRent: "",
        minRooms: "",
        maxRooms: "",
      });
    }
  };

  const inputClass =
    "px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all w-full";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-5">
      {/* ── Property Type ── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Property type
        </h3>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = filters.propertyTypes?.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => togglePropertyType(type.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-red-50 border-red-400 text-red-700 shadow-sm shadow-red-100"
                    : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isSelected ? "text-red-500" : ""
                  }`}
                />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Total Rent ── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Total rent</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Minimum"
            value={filters.minRent}
            onChange={(e) => onFilterChange({ minRent: e.target.value })}
            className={inputClass}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxRent}
            onChange={(e) => onFilterChange({ maxRent: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* ── Number of Rooms ── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Number of rooms
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <RoomDropdown
            value={filters.minRooms}
            placeholder="Minimum"
            onChange={(val) => onFilterChange({ minRooms: val })}
          />
          <RoomDropdown
            value={filters.maxRooms}
            placeholder="Max"
            onChange={(val) => onFilterChange({ maxRooms: val })}
          />
        </div>
      </div>

      {/* ── Update Results ── */}
      <button
        onClick={onUpdateResults}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200 transition-all duration-200 active:scale-[0.98]"
      >
        <RefreshCw className="w-4 h-4" />
        Update the results
      </button>

      {/* ── Clear All Filters ── */}
      <button
        onClick={handleClear}
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 font-semibold py-3 px-4 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-200 active:scale-[0.98]"
      >
        <Trash2 className="w-4 h-4" />
        Clear all filters
      </button>
    </div>
  );
};

export default PropertyFilters;
