// src/components/listings/LocationFilter.jsx

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";

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
  "Mtwapa, Mombasa",
  "Diani, Kwale",
];

const LocationFilter = ({ onLocationChange, initialValue = "" }) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Sync if the URL param changes externally (e.g. browser back/forward)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      setSuggestions(
        KENYAN_LOCATIONS.filter((l) =>
          l.toLowerCase().includes(val.toLowerCase()),
        ),
      );
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      onLocationChange("");
    }
  };

  const handleSelect = (location) => {
    setQuery(location);
    setSuggestions([]);
    setIsOpen(false);
    onLocationChange(location);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    onLocationChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Location</h2>

      <div ref={containerRef} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder="Search for a place, city, or region"
            className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder-gray-400"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {query && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            Filtering by: <span className="font-semibold">{query}</span>
          </div>
        )}

        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-56 overflow-y-auto">
            {suggestions.map((loc) => (
              <button
                key={loc}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(loc)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
              >
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                {loc}
              </button>
            ))}
          </div>
        )}

        {isOpen && query.trim().length > 0 && suggestions.length === 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-500">
            No locations found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
