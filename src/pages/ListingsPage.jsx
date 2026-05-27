// src/pages/ListingsPage.jsx
// All filters are read from & written to URL search params.
// Shareable URLs, back-button friendly, hero search pre-populates filters.

import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  RefreshCw,
  Trash2,
  DoorOpen,
  Home,
  Building2,
  Building,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import LocationFilter from "../components/listings/LocationFilter";
import PropertyFilters from "../components/listings/PropertyFilters";
import PropertyGrid from "../components/listings/PropertyGrid";
import PageHeader from "../components/listings/PageHeader";
import Pagination from "../components/common/Pagination";

// ── Kenyan dummy listings ────────────────────────────────────────────────────
const ALL_LISTINGS = [
  {
    id: 1,
    title: "1 Bedroom Apartment – Westlands",
    address: "Westlands, Nairobi",
    city: "Nairobi",
    price: 35000,
    bedrooms: 1,
    type: "apartments",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    isNew: true,
  },
  {
    id: 2,
    title: "2 Bedroom Apartment – Kilimani",
    address: "Kilimani, Nairobi",
    city: "Nairobi",
    price: 55000,
    bedrooms: 2,
    type: "apartments",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
    isNew: true,
  },
  {
    id: 3,
    title: "3 Bedroom Detached House – Karen",
    address: "Karen, Nairobi",
    city: "Nairobi",
    price: 120000,
    bedrooms: 3,
    type: "detached",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
    isNew: false,
  },
  {
    id: 4,
    title: "Studio Room – Ngong Road",
    address: "Ngong Road, Nairobi",
    city: "Nairobi",
    price: 18000,
    bedrooms: 1,
    type: "room",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
    isNew: true,
  },
  {
    id: 5,
    title: "Executive Suite – Upper Hill",
    address: "Upper Hill, Nairobi",
    city: "Nairobi",
    price: 95000,
    bedrooms: 2,
    type: "suites",
    image:
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=500&q=80",
    isNew: false,
  },
  {
    id: 6,
    title: "Student Apartment – Near UoN",
    address: "Parklands, Nairobi",
    city: "Nairobi",
    price: 14000,
    bedrooms: 1,
    type: "student",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
    isNew: true,
  },
  {
    id: 7,
    title: "2 Bedroom Apartment – Mombasa Road",
    address: "Mombasa Road, Nairobi",
    city: "Nairobi",
    price: 40000,
    bedrooms: 2,
    type: "apartments",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
    isNew: false,
  },
  {
    id: 8,
    title: "4 Bedroom Detached House – Runda",
    address: "Runda, Nairobi",
    city: "Nairobi",
    price: 200000,
    bedrooms: 4,
    type: "detached",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    isNew: false,
  },
  {
    id: 9,
    title: "Beachfront Suite – Nyali",
    address: "Nyali, Mombasa",
    city: "Mombasa",
    price: 85000,
    bedrooms: 2,
    type: "suites",
    image:
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=500&q=80",
    isNew: true,
  },
  {
    id: 10,
    title: "1 Bedroom Apartment – Bamburi",
    address: "Bamburi, Mombasa",
    city: "Mombasa",
    price: 28000,
    bedrooms: 1,
    type: "apartments",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    isNew: false,
  },
  {
    id: 11,
    title: "3 Bedroom House – Kisumu CBD",
    address: "Kisumu CBD, Kisumu",
    city: "Kisumu",
    price: 45000,
    bedrooms: 3,
    type: "detached",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
    isNew: true,
  },
  {
    id: 12,
    title: "Student Room – Near Egerton",
    address: "Nakuru Town, Nakuru",
    city: "Nakuru",
    price: 8000,
    bedrooms: 1,
    type: "student",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
    isNew: false,
  },
  {
    id: 13,
    title: "Single Room – Thika Town",
    address: "Thika Town, Thika",
    city: "Thika",
    price: 7500,
    bedrooms: 1,
    type: "room",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
    isNew: true,
  },
  {
    id: 14,
    title: "2 Bedroom Apartment – Eldoret",
    address: "Eldoret Town, Eldoret",
    city: "Eldoret",
    price: 22000,
    bedrooms: 2,
    type: "apartments",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
    isNew: false,
  },
  {
    id: 15,
    title: "Luxury Suite – Diani Beach",
    address: "Diani, Kwale",
    city: "Kwale",
    price: 110000,
    bedrooms: 3,
    type: "suites",
    image:
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=500&q=80",
    isNew: true,
  },
];

const ITEMS_PER_PAGE = 9;
const MOBILE_INITIAL = 6;

const PROPERTY_TYPES = [
  { id: "room", label: "Room", icon: DoorOpen },
  { id: "detached", label: "Detached house", icon: Home },
  { id: "apartments", label: "Apartments", icon: Building2 },
  { id: "suites", label: "Suites", icon: Building },
  { id: "student", label: "Student Apartments", icon: GraduationCap },
];

// ── URL param helpers ────────────────────────────────────────────────────────
const paramsToFilters = (params) => {
  const typesParam =
    params.get("types") ||
    params.get("type") ||
    params.get("propertyType") ||
    "";
  return {
    location: params.get("location") || "",
    propertyTypes: typesParam ? typesParam.split(",").filter(Boolean) : [],
    minRent: params.get("minRent") || "",
    maxRent: params.get("maxRent") || "",
    minRooms: params.get("minRooms") || "",
    maxRooms: params.get("maxRooms") || "",
  };
};

const filtersToParams = (filters, sortBy, page) => {
  const p = {};
  if (filters.location) p.location = filters.location;
  if (filters.propertyTypes.length) p.types = filters.propertyTypes.join(",");
  if (filters.minRent) p.minRent = filters.minRent;
  if (filters.maxRent) p.maxRent = filters.maxRent;
  if (filters.minRooms) p.minRooms = filters.minRooms;
  if (filters.maxRooms) p.maxRooms = filters.maxRooms;
  if (sortBy && sortBy !== "latest") p.sort = sortBy;
  if (page && page > 1) p.page = page;
  return p;
};

const activeFilterCount = (filters) =>
  filters.propertyTypes.length +
  (filters.minRent ? 1 : 0) +
  (filters.maxRent ? 1 : 0) +
  (filters.minRooms ? 1 : 0) +
  (filters.maxRooms ? 1 : 0);

// ── Mobile Filter Panel ──────────────────────────────────────────────────────
const MobileFilterPanel = ({ filters, onFilterChange, onClose, onClear }) => {
  const toggleType = (id) => {
    const current = filters.propertyTypes || [];
    onFilterChange({
      propertyTypes: current.includes(id)
        ? current.filter((t) => t !== id)
        : [...current, id],
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-[150] bg-black/40" onClick={onClose} />
      <div
        className="fixed inset-y-0 left-0 z-[160] w-full bg-white shadow-2xl overflow-y-auto"
        style={{ animation: "slideInLeft 0.3s ease-out" }}
      >
        <style>{`@keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="font-semibold text-gray-900">Filter criteria</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Property type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Property type
            </h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => toggleType(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all whitespace-nowrap ${
                    filters.propertyTypes?.includes(id)
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Total rent */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Total rent (Ksh)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Minimum"
                value={filters.minRent}
                onChange={(e) => onFilterChange({ minRent: e.target.value })}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxRent}
                onChange={(e) => onFilterChange({ maxRent: e.target.value })}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Number of rooms */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Number of rooms
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["minRooms", "maxRooms"].map((key) => (
                <div key={key} className="relative">
                  <select
                    value={filters[key]}
                    onChange={(e) => onFilterChange({ [key]: e.target.value })}
                    className="w-full px-3 py-2.5 pr-9 border border-gray-300 rounded-lg text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">
                      {key === "minRooms" ? "Minimum" : "Max"}
                    </option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                        {n === 5 ? "+" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5 space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Show results
          </button>
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear all filters
          </button>
        </div>
      </div>
    </>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ── FIX: replace mobileListings state + hasMore state with a single counter ──
  const [mobileCount, setMobileCount] = useState(MOBILE_INITIAL);

  // All filter state lives in the URL
  const filters = paramsToFilters(searchParams);
  const sortBy = searchParams.get("sort") || "latest";
  const currentPage = Number(searchParams.get("page") || 1);

  // Filtering + sorting derived from URL state
  const filteredListings = useMemo(() => {
    let result = [...ALL_LISTINGS];
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(
        (l) =>
          l.city.toLowerCase().includes(loc) ||
          l.address.toLowerCase().includes(loc),
      );
    }
    if (filters.propertyTypes.length)
      result = result.filter((l) => filters.propertyTypes.includes(l.type));
    if (filters.minRent)
      result = result.filter((l) => l.price >= Number(filters.minRent));
    if (filters.maxRent)
      result = result.filter((l) => l.price <= Number(filters.maxRent));
    if (filters.minRooms)
      result = result.filter((l) => l.bedrooms >= Number(filters.minRooms));
    if (filters.maxRooms)
      result = result.filter((l) => l.bedrooms <= Number(filters.maxRooms));

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return result;
  }, [filters, sortBy]);

  // ── FIX: mobile listings slice from filteredListings so filters apply ──
  const mobileListings = filteredListings.slice(0, mobileCount);
  const hasMore = mobileCount < filteredListings.length;

  // ── FIX: reset mobile count whenever filters change ──
  const handleFilterChange = (partial) => {
    const merged = { ...filters, ...partial };
    setMobileCount(MOBILE_INITIAL); // reset so load-more restarts from top
    setSearchParams(filtersToParams(merged, sortBy, 1), { replace: false });
  };

  const handleSortChange = (newSort) => {
    setMobileCount(MOBILE_INITIAL);
    setSearchParams(filtersToParams(filters, newSort, 1), { replace: false });
  };

  const handlePageChange = (page) => {
    setSearchParams(filtersToParams(filters, sortBy, page), { replace: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setMobileCount(MOBILE_INITIAL);
    setSearchParams({}, { replace: false });
  };

  const handleToggleTypeFromHeader = (typeId) => {
    handleFilterChange({
      propertyTypes: filters.propertyTypes.includes(typeId)
        ? filters.propertyTypes.filter((t) => t !== typeId)
        : [...filters.propertyTypes, typeId],
    });
  };

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ── FIX: load more increments counter up to filtered total only ──
  const handleLoadMore = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 700));
    setMobileCount((prev) =>
      Math.min(prev + MOBILE_INITIAL, filteredListings.length),
    );
  }, [filteredListings.length]);

  const filterCount = activeFilterCount(filters);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky mt-20 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a place, city, or region"
            value={filters.location}
            onChange={(e) => handleFilterChange({ location: e.target.value })}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
          />
        </div>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="relative flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {filterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
              <LocationFilter
                initialValue={filters.location}
                onLocationChange={(location) =>
                  handleFilterChange({ location })
                }
              />
              <PropertyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <PageHeader
              totalListings={filteredListings.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              selectedTypes={filters.propertyTypes}
              onToggleType={handleToggleTypeFromHeader}
            />

            {/* Mobile grid — uses mobileListings (filtered + sliced) */}
            <div className="lg:hidden">
              {mobileListings.length > 0 ? (
                <PropertyGrid listings={mobileListings} />
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                  <p className="text-gray-500 text-lg font-medium">
                    No listings match your filters.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Desktop grid — paginated */}
            <div className="hidden lg:block">
              {paginatedListings.length > 0 ? (
                <PropertyGrid listings={paginatedListings} />
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                  <p className="text-gray-500 text-lg font-medium">
                    No listings match your filters.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredListings.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex items-center">
        <a
          href="/"
          className="flex-1 flex flex-col items-center py-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs">Home</span>
        </a>
        <button className="flex-1 flex flex-col items-center py-3 text-red-500">
          <svg
            className="w-5 h-5 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs font-medium">Search</span>
        </button>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex-1 flex flex-col items-center py-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 mb-1" />
          <span className="text-xs">Filters</span>
        </button>
      </div>

      {showMobileFilters && (
        <MobileFilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowMobileFilters(false)}
          onClear={handleClearFilters}
        />
      )}
    </div>
  );
};

export default ListingsPage;
