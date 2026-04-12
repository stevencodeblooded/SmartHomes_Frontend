// src/components/listings/PropertyFilters.jsx

import React from "react";
import {
  Home,
  Building2,
  DoorOpen,
  Building,
  GraduationCap,
  RefreshCw,
  Trash2,
} from "lucide-react";

const PropertyFilters = ({
  filters,
  onFilterChange,
  onUpdateResults,
  onClearFilters,
}) => {
  const propertyTypes = [
    { id: "room", label: "room", icon: DoorOpen },
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

  // Shared input class — red focus ring
  const inputClass =
    "px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all w-full";

  const selectClass =
    "px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all w-full appearance-none cursor-pointer";

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
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium
                  transition-all whitespace-nowrap
                  ${
                    isSelected
                      ? "bg-red-50 border-red-400 text-red-700 shadow-sm shadow-red-100"
                      : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                  }
                `}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-red-500" : ""}`}
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
          {/* Wrapper for custom arrow */}
          <div className="relative">
            <select
              value={filters.minRooms}
              onChange={(e) => onFilterChange({ minRooms: e.target.value })}
              className={selectClass}
            >
              <option value="">Minimum</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              value={filters.maxRooms}
              onChange={(e) => onFilterChange({ maxRooms: e.target.value })}
              className={selectClass}
            >
              <option value="">Max</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Update Results ── */}
      <button
        onClick={onUpdateResults}
        className="
          w-full flex items-center justify-center gap-2
          bg-red-500 hover:bg-red-600 active:bg-red-700
          text-white font-semibold
          py-3 px-4 rounded-xl
          shadow-md shadow-red-200
          hover:shadow-lg hover:shadow-red-200
          transition-all duration-200
          active:scale-[0.98]
        "
      >
        <RefreshCw className="w-4 h-4" />
        Update the results
      </button>

      {/* ── Clear All Filters ── */}
      <button
        onClick={handleClear}
        className="
          w-full flex items-center justify-center gap-2
          bg-white hover:bg-red-50
          text-red-500 hover:text-red-600
          font-semibold
          py-3 px-4 rounded-xl
          border border-red-200 hover:border-red-300
          transition-all duration-200
          active:scale-[0.98]
        "
      >
        <Trash2 className="w-4 h-4" />
        Clear all filters
      </button>
    </div>
  );
};

export default PropertyFilters;
