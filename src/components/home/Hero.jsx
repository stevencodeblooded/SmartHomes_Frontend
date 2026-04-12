// src/components/Hero.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const KENYAN_LOCATIONS = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Kakamega",
  "Nyeri",
  "Meru",
  "Machakos",
  "Lamu",
  "Nanyuki",
  "Kericho",
  "Kisii",
  "Bungoma",
  "Kwale",
  "Kilifi",
  "Westlands, Nairobi",
  "Kilimani, Nairobi",
  "Karen, Nairobi",
  "Parklands, Nairobi",
  "Upper Hill, Nairobi",
  "Ngong Road, Nairobi",
  "Runda, Nairobi",
  "Lavington, Nairobi",
  "South C, Nairobi",
  "Kasarani, Nairobi",
  "Embakasi, Nairobi",
  "Lang'ata, Nairobi",
  "Nyali, Mombasa",
  "Bamburi, Mombasa",
  "Likoni, Mombasa",
  "Diani, Kwale",
];

const QUICK_FILTERS = [
  { id: "apartments", label: "Apartments" },
  { id: "detached", label: "Houses" },
  { id: "room", label: "Rooms" },
  { id: "suites", label: "Suites" },
  { id: "student", label: "Student" },
];

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      setSuggestions(
        KENYAN_LOCATIONS.filter((l) =>
          l.toLowerCase().includes(val.toLowerCase()),
        ).slice(0, 6),
      );
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (loc) => {
    setQuery(loc);
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (onSearch) onSearch({ location: query, type: selectedType });
    navigate(
      `/search?location=${encodeURIComponent(query)}${selectedType ? `&types=${selectedType}` : ""}`,
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative mt-20 overflow-hidden">
      {/* ── Background ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&q=80')",
          filter: "brightness(0.45)",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-28 min-h-[420px] md:min-h-[520px]">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 max-w-3xl leading-tight tracking-tight">
          Stop scrolling.
          <span className="relative inline-block">
            <span
              className="relative z-10 text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #f87171, #fb923c)",
              }}
            >
              Start moving in.
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 opacity-60" />
          </span>
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
          Browse thousands of verified rental properties across Kenya — from
          Nairobi to Mombasa and everywhere in between.
        </p>

        {/* ── Search Card ──────────────────────────────────────────── */}
        <div className="w-full max-w-2xl mb-6" ref={containerRef}>
          <div
            className={`bg-white rounded-2xl shadow-2xl transition-all duration-200 ${
              isFocused ? "shadow-red-200/50 ring-2 ring-red-300" : ""
            }`}
          >
            {/* Quick type filters inside card */}
            <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-gray-100 flex-wrap">
              <span className="text-xs text-gray-400 mr-1 font-medium">
                Type:
              </span>
              {QUICK_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() =>
                    setSelectedType(selectedType === f.id ? null : f.id)
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                    selectedType === f.id
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Main search row */}
            <div className="flex items-center px-4 py-3 gap-3">
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInput}
                  onFocus={() => {
                    setIsFocused(true);
                    if (suggestions.length > 0) setIsOpen(true);
                  }}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by city, region, or neighborhood..."
                  className="w-full text-sm md:text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                />
              </div>
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                    setIsOpen(false);
                  }}
                  className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Autocomplete dropdown */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto">
              {suggestions.map((loc) => (
                <button
                  key={loc}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(loc)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{loc}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-white/50 text-xs font-medium">Popular:</span>
          {["Westlands", "Kilimani", "Karen", "Mombasa", "Kisumu"].map(
            (loc) => (
              <button
                key={loc}
                onClick={() => {
                  setQuery(loc);
                  handleSelect(loc);
                }}
                className="text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1 rounded-full transition-all backdrop-blur-sm"
              >
                {loc}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
