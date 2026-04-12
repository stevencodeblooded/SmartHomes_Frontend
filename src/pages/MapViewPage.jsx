// src/pages/MapViewPage.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, List, SlidersHorizontal, ChevronRight } from "lucide-react";
import { ApartmentLogoNested } from "../components/common/ApartmentLogo";

// ─── Sample listings data ───────────────────────────────────────────────────
const ALL_LISTINGS = [
  {
    id: 1,
    title: "1 bedroom apartment in Westlands",
    address: "Westlands Road, Nairobi",
    price: 45000,
    area: 45,
    bedrooms: 1,
    type: "Apartments",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    lat: -1.2673,
    lng: 36.8033,
  },
  {
    id: 2,
    title: "Studio room in Kilimani",
    address: "Kilimani Road, Nairobi",
    price: 25000,
    area: 20,
    bedrooms: 1,
    type: "room",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
    lat: -1.2864,
    lng: 36.7819,
  },
  {
    id: 3,
    title: "3 bedroom detached house in Karen",
    address: "Karen Road, Nairobi",
    price: 150000,
    area: 200,
    bedrooms: 3,
    type: "Detached house",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
    lat: -1.3531,
    lng: 36.7119,
  },
  {
    id: 4,
    title: "2 bedroom apartment in Lavington",
    address: "Lavington, Nairobi",
    price: 80000,
    area: 90,
    bedrooms: 2,
    type: "Apartments",
    image:
      "https://images.unsplash.com/photo-1502672260066-6bc35f0a1f6c?w=500&q=80",
    lat: -1.2821,
    lng: 36.7619,
  },
  {
    id: 5,
    title: "Student apartment in Parklands",
    address: "Parklands Road, Nairobi",
    price: 18000,
    area: 22,
    bedrooms: 1,
    type: "Student Apartments",
    image:
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=500&q=80",
    lat: -1.2621,
    lng: 36.8219,
  },
  {
    id: 6,
    title: "Luxury suite in Upper Hill",
    address: "Upper Hill, Nairobi",
    price: 120000,
    area: 75,
    bedrooms: 2,
    type: "Suites",
    image:
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=500&q=80",
    lat: -1.3021,
    lng: 36.8119,
  },
  {
    id: 7,
    title: "Room in shared house, South B",
    address: "South B, Nairobi",
    price: 12000,
    area: 15,
    bedrooms: 1,
    type: "room",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
    lat: -1.3221,
    lng: 36.8421,
  },
  {
    id: 8,
    title: "2 bedroom apartment in Runda",
    address: "Runda, Nairobi",
    price: 180000,
    area: 130,
    bedrooms: 2,
    type: "Apartments",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
    lat: -1.2121,
    lng: 36.8019,
  },
  {
    id: 9,
    title: "Detached house in Gigiri",
    address: "Gigiri, Nairobi",
    price: 250000,
    area: 300,
    bedrooms: 4,
    type: "Detached house",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    lat: -1.2321,
    lng: 36.7919,
  },
  {
    id: 10,
    title: "Student studio in Ngong Road",
    address: "Ngong Road, Nairobi",
    price: 15000,
    area: 18,
    bedrooms: 1,
    type: "Student Apartments",
    image:
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80",
    lat: -1.3121,
    lng: 36.7719,
  },
];

// ─── Cluster logic ──────────────────────────────────────────────────────────
const clusterListings = (listings, zoom) => {
  const radius = zoom < 12 ? 0.05 : zoom < 14 ? 0.02 : 0.008;
  const clusters = [];
  const used = new Set();

  listings.forEach((listing, i) => {
    if (used.has(i)) return;
    const group = [listing];
    used.add(i);

    listings.forEach((other, j) => {
      if (used.has(j)) return;
      const dist = Math.sqrt(
        Math.pow(listing.lat - other.lat, 2) +
          Math.pow(listing.lng - other.lng, 2),
      );
      if (dist < radius) {
        group.push(other);
        used.add(j);
      }
    });

    const avgLat = group.reduce((s, l) => s + l.lat, 0) / group.length;
    const avgLng = group.reduce((s, l) => s + l.lng, 0) / group.length;
    const minPrice = Math.min(...group.map((l) => l.price));

    clusters.push({ listings: group, lat: avgLat, lng: avgLng, minPrice });
  });

  return clusters;
};

// ─── Cluster Panel ──────────────────────────────────────────────────────────
const ClusterPanel = ({ cluster, onClose, onSelectListing }) => (
  <div
    className="absolute bottom-0 left-0 right-0 z-[400] bg-white rounded-t-2xl shadow-2xl max-h-72 overflow-y-auto"
    style={{ animation: "slideUp 0.25s ease-out" }}
  >
    <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <span className="font-semibold text-gray-900 text-sm">
        {cluster.listings.length} listings in this area
      </span>
      <button
        onClick={onClose}
        className="p-1.5 hover:bg-gray-100 rounded-full"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    <div className="divide-y divide-gray-50">
      {cluster.listings.map((listing) => (
        <div
          key={listing.id}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => onSelectListing(listing)}
        >
          <img
            src={listing.image}
            alt={listing.title}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {listing.title}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {listing.address}
            </p>
            <p className="text-red-600 font-bold text-sm mt-1">
              KES {listing.price.toLocaleString()} / month
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Mobile Cluster Sheet ───────────────────────────────────────────────────
const MobileClusterSheet = ({ cluster, onClose, onSelectListing }) => (
  <>
    <div className="fixed inset-0 z-[400] bg-black/30" onClick={onClose} />
    <div
      className="fixed bottom-0 left-0 right-0 z-[410] bg-white rounded-t-2xl shadow-2xl max-h-[60vh] overflow-y-auto"
      style={{ animation: "slideUp 0.25s ease-out" }}
    >
      <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
        <span className="font-semibold text-gray-900 text-sm mt-2">
          {cluster.listings.length} listings here
        </span>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-full mt-2"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {cluster.listings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectListing(listing)}
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {listing.title}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {listing.address}
              </p>
              <p className="text-red-600 font-bold text-sm mt-1">
                KES {listing.price.toLocaleString()} / month
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  </>
);

// ─── Mobile Listing Card ────────────────────────────────────────────────────
const MobileListingCard = ({ listing, onClose, onNavigate }) => (
  <>
    <div className="fixed inset-0 z-[400] bg-transparent" onClick={onClose} />
    <div
      className="fixed bottom-20 left-4 right-4 z-[410] bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{ animation: "slideUp 0.25s ease-out" }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-10 bg-white/90 p-1 rounded-full shadow"
      >
        <X className="w-3.5 h-3.5 text-gray-600" />
      </button>
      <div className="flex gap-3 p-3 cursor-pointer" onClick={onNavigate}>
        <img
          src={listing.image}
          alt={listing.title}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">
            {listing.title}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {listing.address}
          </p>
          <p className="text-red-600 font-bold text-sm mt-2">
            KES {listing.price.toLocaleString()} / month
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 self-center flex-shrink-0" />
      </div>
    </div>
  </>
);

// ─── Filter Form (shared between desktop sidebar & mobile panel) ────────────
const PROPERTY_TYPES = [
  "room",
  "Detached house",
  "Apartments",
  "Suites",
  "Student Apartments",
];

const FilterForm = ({ filters, onChange, onApply, onClear }) => (
  <div className="p-5 space-y-5">
    {/* Property Type */}
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Property type
      </h3>
      <div className="flex flex-wrap gap-2">
        {PROPERTY_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() =>
              onChange({
                ...filters,
                propertyTypes: filters.propertyTypes.includes(t)
                  ? filters.propertyTypes.filter((x) => x !== t)
                  : [...filters.propertyTypes, t],
              })
            }
            className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
              filters.propertyTypes.includes(t)
                ? "bg-red-500 border-red-500 text-white"
                : "border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>

    {/* Total Rent */}
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Total rent (KES)
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Minimum"
          value={filters.minRent}
          onChange={(e) => onChange({ ...filters, minRent: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="number"
          placeholder="Maximum"
          value={filters.maxRent}
          onChange={(e) => onChange({ ...filters, maxRent: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
    </div>

    {/* Area */}
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Area (m²)</h3>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Minimum"
          value={filters.minArea}
          onChange={(e) => onChange({ ...filters, minArea: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="number"
          placeholder="Maximum"
          value={filters.maxArea}
          onChange={(e) => onChange({ ...filters, maxArea: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
    </div>

    {/* Rooms */}
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Number of rooms
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={filters.minRooms}
          onChange={(e) => onChange({ ...filters, minRooms: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
        >
          <option value="">Minimum</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value="5">5+</option>
        </select>
        <select
          value={filters.maxRooms}
          onChange={(e) => onChange({ ...filters, maxRooms: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
        >
          <option value="">Maximum</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value="5">5+</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <button
      onClick={onApply}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
    >
      Update the results
    </button>
    <button
      onClick={onClear}
      className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition-colors text-sm"
    >
      Clear all filters
    </button>
  </div>
);

// ─── Main MapViewPage ───────────────────────────────────────────────────────
const MapViewPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [mapZoom, setMapZoom] = useState(12);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const defaultFilters = {
    propertyTypes: [],
    minRent: "",
    maxRent: "",
    minArea: "",
    maxArea: "",
    minRooms: "",
    maxRooms: "",
  };
  const [filters, setFilters] = useState(defaultFilters);

  // Compute filtered listings from current filters
  const getFilteredListings = (f = filters) => {
    return ALL_LISTINGS.filter((l) => {
      if (f.propertyTypes.length > 0 && !f.propertyTypes.includes(l.type))
        return false;
      if (f.minRent && l.price < Number(f.minRent)) return false;
      if (f.maxRent && l.price > Number(f.maxRent)) return false;
      if (f.minArea && l.area < Number(f.minArea)) return false;
      if (f.maxArea && l.area > Number(f.maxArea)) return false;
      if (f.minRooms && l.bedrooms < Number(f.minRooms)) return false;
      if (f.maxRooms && l.bedrooms > Number(f.maxRooms)) return false;
      return true;
    });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMarkers = (L, map, zoom, listings = ALL_LISTINGS) => {
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    const clusters = clusterListings(listings, zoom);

    clusters.forEach((cluster) => {
      const isCluster = cluster.listings.length > 1;

      const icon = L.divIcon({
        className: "",
        html: isCluster
          ? `<div style="
              background:#e53e3e;color:white;
              width:36px;height:36px;border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-size:13px;font-weight:700;
              box-shadow:0 2px 8px rgba(0,0,0,0.25);
              border:2px solid white;cursor:pointer;
            ">${cluster.listings.length}</div>`
          : `<div style="
              background:#1a202c;color:white;
              padding:5px 10px;border-radius:8px;
              font-size:12px;font-weight:700;
              white-space:nowrap;
              box-shadow:0 2px 8px rgba(0,0,0,0.25);
              cursor:pointer;position:relative;
            ">
              KES ${cluster.minPrice.toLocaleString()}
              <div style="
                position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);
                width:0;height:0;
                border-left:5px solid transparent;
                border-right:5px solid transparent;
                border-top:5px solid #1a202c;
              "></div>
            </div>`,
        iconSize: isCluster ? [36, 36] : [110, 32],
        iconAnchor: isCluster ? [18, 18] : [55, 37],
      });

      const marker = L.marker([cluster.lat, cluster.lng], { icon });
      marker.on("click", (e) => {
        e.originalEvent.stopPropagation();
        if (isCluster) {
          setSelectedListing(null);
          setSelectedCluster(cluster);
        } else {
          setSelectedCluster(null);
          setSelectedListing(cluster.listings[0]);
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  };

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!window.L) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      if (mapInstanceRef.current || !mapRef.current) return;

      const L = window.L;
      // ── Centre on Nairobi, Kenya ──
      const map = L.map(mapRef.current, { zoomControl: false }).setView(
        [-1.2921, 36.8219],
        12,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);

      renderMarkers(L, map, 12, ALL_LISTINGS);

      map.on("zoomend", () => {
        const z = map.getZoom();
        setMapZoom(z);
        renderMarkers(L, map, z, getFilteredListings());
        setSelectedCluster(null);
        setSelectedListing(null);
      });

      map.on("click", () => {
        setSelectedCluster(null);
        setSelectedListing(null);
      });

      mapInstanceRef.current = map;
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const applyFilters = (f = filters) => {
    if (mapInstanceRef.current && window.L) {
      const zoom = mapInstanceRef.current.getZoom();
      renderMarkers(
        window.L,
        mapInstanceRef.current,
        zoom,
        getFilteredListings(f),
      );
    }
    setSelectedCluster(null);
    setSelectedListing(null);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    if (mapInstanceRef.current && window.L) {
      const zoom = mapInstanceRef.current.getZoom();
      renderMarkers(window.L, mapInstanceRef.current, zoom, ALL_LISTINGS);
    }
    setSelectedCluster(null);
    setSelectedListing(null);
    setShowMobileFilters(false);
  };

  const handleNavigateToListing = (listing) => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-gray-100"
      style={{ zIndex: 100 }}
    >
      {/* ─── MOBILE TOP BAR ─── */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
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
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
          />
        </div>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full text-sm font-medium flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter criteria
        </button>
      </div>

      {/* ─── DESKTOP TOP BAR ─── */}
      <div className="hidden lg:flex items-center justify-between px-6 bg-white border-b border-gray-100 flex-shrink-0">
        <Link to="/" className="flex items-center flex-shrink-0">
          <ApartmentLogoNested />
          <h1 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            SmartHomes
          </h1>
        </Link>
        <div className="flex-1 max-w-md mx-8 relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-red-400"
          />
        </div>
        <button
          onClick={() => navigate("/search")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* ─── MAIN AREA ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── DESKTOP SIDEBAR ─── */}
        <div className="hidden lg:flex flex-col w-96 bg-white border-r border-gray-100 flex-shrink-0 overflow-y-auto">
          <FilterForm
            filters={filters}
            onChange={setFilters}
            onApply={() => applyFilters()}
            onClear={clearFilters}
          />
        </div>

        {/* ─── MAP AREA ─── */}
        <div className="flex-1 relative overflow-hidden">
          <div ref={mapRef} className="w-full h-full" />

          {/* List view button - Desktop */}
          <button
            onClick={() => navigate("/listings")}
            className="hidden lg:flex absolute top-4 left-1/2 -translate-x-1/2 z-[300] items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full shadow-lg font-semibold text-sm transition-colors"
          >
            <List className="w-4 h-4" />
            List view
          </button>

          {/* List view button - Mobile */}
          <button
            onClick={() => navigate("/listings")}
            className="lg:hidden absolute top-3 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm"
          >
            <List className="w-4 h-4" />
            List view
          </button>

          {/* Close button - Desktop */}
          <button
            onClick={() => navigate("/listings")}
            className="hidden lg:flex absolute top-4 right-4 z-[300] items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Close button - Mobile */}
          <button
            onClick={() => navigate("/listings")}
            className="lg:hidden absolute top-3 right-3 z-[300] flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-lg"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          {/* Desktop Cluster Panel */}
          {!isMobile &&
            selectedCluster &&
            selectedCluster.listings.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-[400]">
                <ClusterPanel
                  cluster={selectedCluster}
                  onClose={() => setSelectedCluster(null)}
                  onSelectListing={(listing) => {
                    setSelectedCluster(null);
                    setSelectedListing(listing);
                  }}
                />
              </div>
            )}

          {/* Desktop Single Listing Popup */}
          {!isMobile && selectedListing && (
            <div
              className="absolute z-[400] pointer-events-none"
              style={{ inset: 0 }}
            >
              <div
                className="absolute pointer-events-auto"
                style={{
                  bottom: "80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-72">
                  <button
                    onClick={() => setSelectedListing(null)}
                    className="absolute top-2 right-2 z-10 bg-white/90 p-1 rounded-full shadow"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <div
                    className="relative h-40 overflow-hidden cursor-pointer"
                    onClick={() => handleNavigateToListing(selectedListing)}
                  >
                    <img
                      src={selectedListing.image}
                      alt={selectedListing.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div
                    className="p-3 cursor-pointer"
                    onClick={() => handleNavigateToListing(selectedListing)}
                  >
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                      {selectedListing.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      {selectedListing.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-bold text-sm">
                        KES {selectedListing.price.toLocaleString()} / month
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <div className="lg:hidden flex items-center bg-white border-t border-gray-200 flex-shrink-0">
        <a
          href="/"
          className="flex-1 flex flex-col items-center py-3 text-gray-500"
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
        <button className="flex-1 flex flex-col items-center py-3 text-red-600">
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
          className="flex-1 flex flex-col items-center py-3 text-gray-500"
        >
          <SlidersHorizontal className="w-5 h-5 mb-1" />
          <span className="text-xs">Filters</span>
        </button>
      </div>

      {/* ─── MOBILE CLUSTER SHEET ─── */}
      {isMobile && selectedCluster && selectedCluster.listings.length > 1 && (
        <MobileClusterSheet
          cluster={selectedCluster}
          onClose={() => setSelectedCluster(null)}
          onSelectListing={(listing) => {
            setSelectedCluster(null);
            setSelectedListing(listing);
          }}
        />
      )}

      {/* ─── MOBILE LISTING CARD ─── */}
      {isMobile && selectedListing && (
        <MobileListingCard
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onNavigate={() => handleNavigateToListing(selectedListing)}
        />
      )}

      {/* ─── MOBILE FILTER PANEL ─── */}
      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 z-[500] bg-black/40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div
            className="fixed inset-y-0 left-0 z-[510] w-full bg-white shadow-2xl flex flex-col"
            style={{ animation: "slideInLeft 0.3s ease-out" }}
          >
            <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <span className="font-bold text-gray-900">Filter criteria</span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterForm
                filters={filters}
                onChange={setFilters}
                onApply={() => applyFilters()}
                onClear={clearFilters}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapViewPage;
