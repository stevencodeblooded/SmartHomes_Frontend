// src/components/Hero.jsx

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronRight, X, ArrowRight } from "lucide-react";
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
  { id: "apartments", label: "Apartments", emoji: "🏢" },
  { id: "detached", label: "Houses", emoji: "🏡" },
  { id: "room", label: "Rooms", emoji: "🚪" },
  { id: "suites", label: "Suites", emoji: "✨" },
  { id: "student", label: "Student", emoji: "🎓" },
];

const STATS = [
  { value: "12,400+", label: "Active listings" },
  { value: "47", label: "Cities covered" },
  { value: "98%", label: "Verified landlords" },
];

// Rotating location words for the animated headline
const ROTATING_WORDS = [
  "Westlands",
  "Karen",
  "Kilimani",
  "Mombasa",
  "Kisumu",
  "Runda",
];

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Rotating word animation
  useEffect(() => {
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  // Close suggestions on outside click
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
        }

        /* Staggered reveal animations */
        .hero-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-reveal.d1 { transition-delay: 0.05s; }
        .hero-reveal.d2 { transition-delay: 0.18s; }
        .hero-reveal.d3 { transition-delay: 0.30s; }
        .hero-reveal.d4 { transition-delay: 0.42s; }
        .hero-reveal.d5 { transition-delay: 0.54s; }

        /* Rotating word */
        .rotating-word {
          display: inline-block;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rotating-word.out {
          opacity: 0;
          transform: translateY(-10px);
        }
        .rotating-word.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Search card glow */
        .search-card {
          transition: box-shadow 0.3s ease;
        }
        .search-card:focus-within {
          box-shadow:
            0 0 0 3px rgba(239,68,68,0.15),
            0 32px 64px rgba(0,0,0,0.18),
            0 8px 16px rgba(0,0,0,0.08);
        }

        /* Filter pill hover */
        .filter-pill {
          transition: all 0.18s ease;
          border: 1.5px solid transparent;
        }
        .filter-pill:hover {
          border-color: #ef4444;
          color: #ef4444;
          background: #fff1f1;
        }
        .filter-pill.active {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }

        /* Stat counter */
        .stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.15);
        }

        /* Floating property cards */
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50%       { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-8px) rotate(-1deg); }
        }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 6.5s ease-in-out infinite 0.8s; }
        .float-c { animation: floatC 4.8s ease-in-out infinite 1.5s; }

        /* Grain overlay */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* Autocomplete dropdown */
        .autocomplete {
          animation: dropIn 0.18s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Search button shine */
        .search-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
          border-radius: inherit;
        }
        .search-btn:hover::after {
          transform: translateX(100%);
        }

        /* Popular tag */
        .pop-tag {
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .pop-tag:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-1px);
        }

        /* Bottom wave */
        .hero-wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          line-height: 0;
        }
      `}</style>

      <section
        className="hero-root relative mt-16 overflow-hidden grain"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Background image ─────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580216643062-cf460548a66a?w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.38) saturate(1.1)",
            transform: "scale(1.04)",
          }}
        />

        {/* Gradient layers for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(15,10,5,0.65) 0%, rgba(10,5,0,0.2) 45%, rgba(10,5,0,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 70%)",
          }}
        />

        {/* ── Floating property preview cards (decorative) ─────── */}
        {/* Left card */}
        <div
          className="float-a absolute hidden lg:block"
          style={{ left: "3%", top: "22%", zIndex: 2, opacity: 0.9 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              padding: "10px 14px",
              width: 180,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 90,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=80"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                margin: "0 0 2px",
              }}
            >
              Kilimani Apt
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 11,
                margin: 0,
              }}
            >
              Ksh 55,000 / mo
            </p>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              <span
                style={{
                  background: "rgba(239,68,68,0.25)",
                  color: "#fca5a5",
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 20,
                }}
              >
                2 bed
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 20,
                }}
              >
                New
              </span>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div
          className="float-b absolute hidden lg:block"
          style={{ right: "3%", top: "18%", zIndex: 2, opacity: 0.9 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 16,
              padding: "10px 14px",
              width: 180,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 90,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&q=80"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                margin: "0 0 2px",
              }}
            >
              Karen House
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 11,
                margin: 0,
              }}
            >
              Ksh 120,000 / mo
            </p>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              <span
                style={{
                  background: "rgba(239,68,68,0.25)",
                  color: "#fca5a5",
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 20,
                }}
              >
                3 bed
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  padding: "2px 7px",
                  borderRadius: 20,
                }}
              >
                Garden
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-right small card */}
        <div
          className="float-c absolute hidden xl:block"
          style={{ right: "6%", bottom: "22%", zIndex: 2, opacity: 0.85 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "10px 14px",
              width: 160,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&q=80"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  margin: "0 0 2px",
                }}
              >
                Westlands Studio
              </p>
              <p
                style={{
                  color: "#fca5a5",
                  fontSize: 12,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Ksh 18k
              </p>
            </div>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────── */}
        <div
          className="relative flex flex-col items-center justify-center flex-1 text-center px-4"
          style={{
            paddingTop: "clamp(5rem, 12vw, 9rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            zIndex: 3,
          }}
        >
          {/* Eyebrow badge */}
          <div
            className={`hero-reveal d1 ${mounted ? "visible" : ""}`}
            style={{ marginBottom: 28 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 100,
                padding: "7px 18px",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ef4444",
                  boxShadow: "0 0 8px #ef4444",
                  display: "inline-block",
                }}
              />
              Kenya's most trusted rental platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`hero-reveal d2 ${mounted ? "visible" : ""}`}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 780,
              marginBottom: 20,
            }}
          >
            Find your home in{" "}
            <span
              className={`rotating-word ${wordVisible ? "in" : "out"}`}
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #f87171 20%, #fb923c 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          {/* Subline */}
          <p
            className={`hero-reveal d3 ${mounted ? "visible" : ""}`}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 40,
              fontWeight: 300,
            }}
          >
            Browse thousands of verified rentals across Kenya — apartments,
            houses, studios and more.
          </p>

          {/* ── Search card ──────────────────────────────────────── */}
          <div
            className={`hero-reveal d4 ${mounted ? "visible" : ""} w-full`}
            style={{ maxWidth: 680, marginBottom: 20, position: "relative" }}
            ref={containerRef}
          >
            <div
              className="search-card"
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow:
                  "0 24px 56px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1)",
                overflow: "visible",
              }}
            >
              {/* Property type tabs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 16px 10px",
                  borderBottom: "1px solid #f3f4f6",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9ca3af",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginRight: 4,
                    flexShrink: 0,
                  }}
                >
                  I'm looking for
                </span>
                {QUICK_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() =>
                      setSelectedType(selectedType === f.id ? null : f.id)
                    }
                    className={`filter-pill ${selectedType === f.id ? "active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 13px",
                      borderRadius: 100,
                      fontSize: 12.5,
                      fontWeight: 500,
                      background: selectedType === f.id ? "#ef4444" : "#f9fafb",
                      color: selectedType === f.id ? "#fff" : "#374151",
                      border:
                        selectedType === f.id
                          ? "1.5px solid #ef4444"
                          : "1.5px solid #e5e7eb",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <span>{f.emoji}</span>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search input row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  gap: 12,
                }}
              >
                <MapPin
                  style={{
                    width: 20,
                    height: 20,
                    color: "#ef4444",
                    flexShrink: 0,
                  }}
                />
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
                  placeholder="City, neighborhood or region..."
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#111827",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setSuggestions([]);
                      setIsOpen(false);
                    }}
                    style={{
                      color: "#d1d5db",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <X style={{ width: 16, height: 16 }} />
                  </button>
                )}

                {/* Search button */}
                <button
                  onClick={handleSearch}
                  className="search-btn"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 13,
                    padding: "11px 22px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 16px rgba(239,68,68,0.4)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(239,68,68,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(239,68,68,0.4)";
                  }}
                >
                  <Search style={{ width: 16, height: 16 }} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Autocomplete dropdown */}
            {isOpen && suggestions.length > 0 && (
              <div
                className="autocomplete"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow:
                    "0 20px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)",
                  border: "1px solid #f3f4f6",
                  overflow: "hidden",
                  zIndex: 50,
                }}
              >
                {suggestions.map((loc, i) => (
                  <button
                    key={loc}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(loc)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 18px",
                      background: "none",
                      border: "none",
                      borderBottom:
                        i < suggestions.length - 1
                          ? "1px solid #f9fafb"
                          : "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.12s ease",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fef2f2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <MapPin
                      style={{
                        width: 14,
                        height: 14,
                        color: "#ef4444",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        color: "#374151",
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {loc}
                    </span>
                    <ChevronRight
                      style={{ width: 14, height: 14, color: "#d1d5db" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Popular searches */}
          <div
            className={`hero-reveal d4 ${mounted ? "visible" : ""}`}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 52,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 500,
              }}
            >
              Popular:
            </span>
            {["Westlands", "Kilimani", "Karen", "Nyali", "Kisumu"].map(
              (loc) => (
                <button
                  key={loc}
                  className="pop-tag"
                  onClick={() => {
                    setQuery(loc);
                    handleSelect(loc);
                  }}
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "5px 14px",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {loc}
                </button>
              ),
            )}
          </div>

          {/* ── Stats bar ─────────────────────────────────────────── */}
          <div
            className={`hero-reveal d5 ${mounted ? "visible" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 2px",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      margin: 0,
                      fontWeight: 400,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
                {i < STATS.length - 1 && (
                  <div className="stat-divider hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA strip ──────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 400,
            }}
          >
            Are you a landlord?
          </span>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              fontWeight: 600,
              color: "#fca5a5",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            List your property for free
            <ArrowRight style={{ width: 13, height: 13 }} />
          </button>
        </div>

        {/* ── Wave divider at very bottom ───────────────────────── */}
        <div className="hero-wave" style={{ zIndex: 4 }}>
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: 48 }}
          >
            <path
              d="M0 48 L0 28 Q180 0 360 20 Q540 40 720 18 Q900 0 1080 22 Q1260 44 1440 16 L1440 48 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
