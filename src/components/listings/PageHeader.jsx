// src/components/listings/PageHeader.jsx

import { ChevronDown, X } from "lucide-react";
import {
  DoorOpen,
  Home,
  Building2,
  Building,
  GraduationCap,
} from "lucide-react";

// Maps sidebar type IDs → human-readable pill labels
const PROPERTY_TYPE_META = {
  room: { label: "Room rental", icon: DoorOpen },
  detached: { label: "Detached house for rent", icon: Home },
  apartments: { label: "Apartment for rent", icon: Building2 },
  suites: { label: "Suites for rent", icon: Building },
  student: { label: "Student apartments for rent", icon: GraduationCap },
};

const PageHeader = ({
  totalListings,
  sortBy,
  onSortChange,
  selectedTypes = [],
  onToggleType,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        All available rental properties in Kenya at a glance
      </h1>

      {/* Active property type pills — only shown when at least one is selected */}
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {selectedTypes.map((typeId) => {
            const meta = PROPERTY_TYPE_META[typeId];
            if (!meta) return null;
            const Icon = meta.icon;
            return (
              <button
                key={typeId}
                onClick={() => onToggleType(typeId)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-medium transition-all hover:bg-red-100 hover:shadow-sm group"
              >
                <Icon className="w-4 h-4" />
                {meta.label}
                <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      )}

      {/* Listings Count and Sort */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">
            {totalListings.toLocaleString()}
          </span>{" "}
          Rentable Listings Found
        </p>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent cursor-pointer"
          >
            <option value="latest">The latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
