// src/components/property-detail/PropertyMap.jsx

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react";

const PropertyMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("streets"); // streets | satellite | minimal
  const [isLoaded, setIsLoaded] = useState(false);

  const tileStyles = {
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      label: "Street",
    },
    minimal: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      label: "Minimal",
    },
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      label: "Dark",
    },
  };

  useEffect(() => {
    const loadMap = async () => {
      if (!window.L) {
        // Load Leaflet CSS
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);

        // Load Leaflet JS
        await new Promise((res) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = res;
          document.head.appendChild(script);
        });
      }

      if (mapInstanceRef.current || !mapRef.current) return;

      const L = window.L;
      const lat = location?.lat || 1.3521;
      const lng = location?.lng || 103.8198;

      // Init map — no default controls
      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      }).setView([lat, lng], 15);

      // Tile layer
      L.tileLayer(tileStyles[mapStyle].url, {
        maxZoom: 19,
      }).addTo(map);

      // ── Radial pulse rings ──────────────────────────────────────────
      const pulseIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:80px;height:80px;transform:translate(-50%,-50%)">
            <!-- Outermost ring -->
            <div style="
              position:absolute;inset:0;
              border-radius:50%;
              background:rgba(99,102,241,0.08);
              animation:pulse3 2.5s ease-out infinite;
            "></div>
            <!-- Middle ring -->
            <div style="
              position:absolute;
              top:10px;left:10px;right:10px;bottom:10px;
              border-radius:50%;
              background:rgba(99,102,241,0.14);
              animation:pulse3 2.5s ease-out 0.4s infinite;
            "></div>
            <!-- Inner glow ring -->
            <div style="
              position:absolute;
              top:20px;left:20px;right:20px;bottom:20px;
              border-radius:50%;
              background:rgba(99,102,241,0.22);
              animation:pulse3 2.5s ease-out 0.8s infinite;
            "></div>
            <!-- Core pin -->
            <div style="
              position:absolute;
              top:26px;left:26px;
              width:28px;height:28px;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              background:linear-gradient(135deg,#6366f1,#8b5cf6);
              box-shadow:0 4px 20px rgba(99,102,241,0.6),0 0 0 3px white;
            ">
              <div style="
                position:absolute;
                top:50%;left:50%;
                transform:translate(-50%,-50%) rotate(45deg);
                width:10px;height:10px;
                border-radius:50%;
                background:white;
                opacity:0.9;
              "></div>
            </div>
          </div>
          <style>
            @keyframes pulse3 {
              0%   { transform: scale(0.6); opacity: 0.8; }
              70%  { transform: scale(1.4); opacity: 0; }
              100% { transform: scale(1.4); opacity: 0; }
            }
          </style>
        `,
        iconSize: [80, 80],
        iconAnchor: [40, 40],
      });

      const marker = L.marker([lat, lng], { icon: pulseIcon }).addTo(map);

      // ── Elegant popup ──────────────────────────────────────────────
      const popup = L.popup({
        closeButton: false,
        className: "property-popup",
        offset: [0, -36],
        maxWidth: 260,
      }).setContent(`
        <div style="
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
          min-width:220px;
        ">
          <div style="
            display:flex;align-items:flex-start;gap:10px;
          ">
            <div style="
              width:36px;height:36px;border-radius:10px;flex-shrink:0;
              background:linear-gradient(135deg,#6366f1,#8b5cf6);
              display:flex;align-items:center;justify-content:center;
            ">
              <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p style="margin:0;font-size:13px;font-weight:700;color:#1e1b4b;line-height:1.3;">
                ${location?.address || "580 Woodlands Drive 16"}
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#6b7280;">Singapore</p>
            </div>
          </div>
          <div style="
            margin-top:12px;padding-top:12px;
            border-top:1px solid #f3f4f6;
            display:flex;gap:16px;
          ">
            <div>
              <p style="margin:0;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">MRT</p>
              <p style="margin:2px 0 0;font-size:12px;color:#374151;font-weight:600;">5 min walk</p>
            </div>
            <div>
              <p style="margin:0;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Amenities</p>
              <p style="margin:2px 0 0;font-size:12px;color:#374151;font-weight:600;">Nearby</p>
            </div>
            <div>
              <p style="margin:0;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Schools</p>
              <p style="margin:2px 0 0;font-size:12px;color:#374151;font-weight:600;">3 min</p>
            </div>
          </div>
        </div>
      `);

      marker.bindPopup(popup).openPopup();

      // Small neighborhood POI markers
      const pois = [
        { lat: lat + 0.004, lng: lng + 0.006, label: "MRT", color: "#10b981" },
        { lat: lat - 0.003, lng: lng + 0.008, label: "Mall", color: "#f59e0b" },
        { lat: lat + 0.002, lng: lng - 0.007, label: "Park", color: "#34d399" },
        {
          lat: lat - 0.005,
          lng: lng - 0.004,
          label: "School",
          color: "#3b82f6",
        },
      ];

      pois.forEach(({ lat: pLat, lng: pLng, label, color }) => {
        const poiIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              background:white;
              border:2px solid ${color};
              color:${color};
              font-size:9px;font-weight:700;
              padding:2px 6px;
              border-radius:20px;
              white-space:nowrap;
              box-shadow:0 2px 8px rgba(0,0,0,0.12);
              letter-spacing:0.03em;
            ">${label}</div>
          `,
          iconSize: [50, 20],
          iconAnchor: [25, 10],
        });
        L.marker([pLat, pLng], { icon: poiIcon }).addTo(map);
      });

      // Subtle radius circle
      L.circle([lat, lng], {
        radius: 300,
        color: "#6366f1",
        fillColor: "#6366f1",
        fillOpacity: 0.05,
        weight: 1,
        dashArray: "6 4",
        opacity: 0.4,
      }).addTo(map);

      setIsLoaded(true);
      mapInstanceRef.current = map;

      // Inject popup CSS
      const style = document.createElement("style");
      style.textContent = `
        .property-popup .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          padding: 0 !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(99,102,241,0.1) !important;
          border: 1px solid rgba(99,102,241,0.1) !important;
          overflow: hidden;
        }
        .property-popup .leaflet-popup-content {
          margin: 16px !important;
          width: auto !important;
        }
        .property-popup .leaflet-popup-tip {
          background: white !important;
          box-shadow: none !important;
        }
        .property-popup .leaflet-popup-tip-container {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08));
        }
        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `;
      document.head.appendChild(style);
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle tile style changes
  const switchStyle = (style) => {
    if (!mapInstanceRef.current || !window.L) return;
    setMapStyle(style);
    const map = mapInstanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof window.L.TileLayer) map.removeLayer(layer);
    });
    window.L.tileLayer(tileStyles[style].url, { maxZoom: 19 }).addTo(map);
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Location</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {location?.address || "580 Woodlands Drive 16, Singapore"}
            </p>
          </div>
        </div>

        {/* Style switcher pills */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-0.5">
          {Object.entries(tileStyles).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => switchStyle(key)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                mapStyle === key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div
        className="relative rounded-2xl z-20 overflow-hidden shadow-xl shadow-gray-200/80 border border-gray-100"
        style={{ height: "420px" }}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-red-400 animate-bounce" />
              </div>
              <p className="text-sm text-slate-400 font-medium">Loading map…</p>
            </div>
          </div>
        )}

        {/* Actual map */}
        <div ref={mapRef} className="w-full h-full" />

        {/* ── Custom zoom controls ── */}
        <div className="absolute bottom-5 right-4 z-[400] flex flex-col gap-1.5">
          <button
            onClick={zoomIn}
            className="w-9 h-9 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={zoomOut}
            className="w-9 h-9 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* ── Open in Maps CTA ── */}
        <div className="absolute bottom-5 left-4 z-[400]">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location?.lat || 1.3521},${location?.lng || 103.8198}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/95 backdrop-blur-sm hover:bg-white px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 text-xs font-semibold text-gray-700 transition-all hover:shadow-xl active:scale-95 group"
          >
            <Navigation className="w-3.5 h-3.5 text-red-500 group-hover:rotate-12 transition-transform" />
            Open in Google Maps
          </a>
        </div>

        {/* ── Subtle vignette overlay ── */}
        <div
          className="absolute inset-0 z-[200] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.04) 100%)",
          }}
        />

        {/* ── Top-left attribution badge ── */}
        <div className="absolute top-3 left-3 z-[300] pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] text-gray-400 font-medium">
            © OpenStreetMap
          </div>
        </div>
      </div>

      {/* ── Neighborhood tags below map ── */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: "🚇", label: "Admiralty MRT", sub: "5 min walk" },
          { icon: "🛒", label: "Causeway Point", sub: "8 min walk" },
          { icon: "🌳", label: "Woodlands Park", sub: "3 min walk" },
          { icon: "🏫", label: "Innova Primary", sub: "4 min walk" },
        ].map(({ icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 shadow-sm hover:shadow-md hover:border-red-100 transition-all cursor-default"
          >
            <span className="text-base">{icon}</span>
            <div>
              <p className="text-xs font-semibold text-gray-800 leading-none">
                {label}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyMap;
