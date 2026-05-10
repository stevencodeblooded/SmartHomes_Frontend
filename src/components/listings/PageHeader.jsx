// src/components/listings/PageHeader.jsx

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, ArrowUpDown, Check } from "lucide-react";
import {
  DoorOpen,
  Home,
  Building2,
  Building,
  GraduationCap,
} from "lucide-react";

const PROPERTY_TYPE_META = {
  room: { label: "Room rental", icon: DoorOpen },
  detached: { label: "Detached house for rent", icon: Home },
  apartments: { label: "Apartment for rent", icon: Building2 },
  suites: { label: "Suites for rent", icon: Building },
  student: { label: "Student apartments for rent", icon: GraduationCap },
};

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
];

const PageHeader = ({
  totalListings,
  sortBy,
  onSortChange,
  selectedTypes = [],
  onToggleType,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentSort =
    SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      {/* Title */}
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-snug">
        All available rental properties in Kenya at a glance
      </h1>

      {/* Active property type pills */}
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          {selectedTypes.map((typeId) => {
            const meta = PROPERTY_TYPE_META[typeId];
            if (!meta) return null;

            const Icon = meta.icon;

            return (
              <button
                key={typeId}
                onClick={() => onToggleType(typeId)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs sm:text-sm font-medium transition-all hover:bg-red-100 hover:shadow-sm group"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />

                {meta.label}

                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      )}

      {/* Count + Sort row */}
      <div className="flex items-center justify-between gap-3">
        {/* Listing count */}
        <p className="text-xs sm:text-sm text-gray-500 shrink-0">
          <span className="font-semibold text-gray-800">
            {totalListings.toLocaleString()}
          </span>{" "}
          <span className="hidden sm:inline">Rentable Listings Found</span>
          <span className="sm:hidden">listings</span>
        </p>

        {/* Custom Sort Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-all duration-200 ${
              open
                ? "border-red-300 bg-red-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50"
            }`}
          >
            <ArrowUpDown
              className={`w-4 h-4 transition-colors ${
                open ? "text-red-500" : "text-gray-400"
              }`}
            />

            <span
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                open ? "text-red-600" : "text-gray-700"
              }`}
            >
              <span className="sm:hidden">
                {currentSort.value === "latest"
                  ? "Latest"
                  : currentSort.value === "price-low"
                    ? "Low → High"
                    : "High → Low"}
              </span>

              <span className="hidden sm:inline">{currentSort.label}</span>
            </span>

            <ChevronDown
              className={`w-4 h-4 transition-all duration-200 ${
                open ? "rotate-180 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-2">
                {SORT_OPTIONS.map((option) => {
                  const active = sortBy === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                        active
                          ? "bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{option.label}</span>

                      {active && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
