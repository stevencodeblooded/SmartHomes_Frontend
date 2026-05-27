// src/components/listings/PropertyCard.jsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const AUTO_SLIDE_DELAY = 10000; // 10 seconds
const RESUME_AFTER = 5000; // resume auto-slide 5s after manual interaction

// Detect mobile once per render — auto-slide only runs on mobile
const isMobileDevice = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const PropertyCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Auto-slide state — driven by refs so timers never cause re-renders
  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const autoActiveRef = useRef(true); // true = auto-slide is running
  const isMobile = useRef(isMobileDevice());

  const images = listing.images?.length ? listing.images : [listing.image];
  const hasMultiple = images.length > 1;

  // ── Start auto-slide interval ─────────────────────────────────────────────
  const startAuto = useCallback(() => {
    if (!isMobile.current || !hasMultiple) return;
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (autoActiveRef.current) {
        setCurrentImageIndex((p) => (p + 1) % images.length);
      }
    }, AUTO_SLIDE_DELAY);
  }, [hasMultiple, images.length]);

  // ── Pause auto-slide briefly after manual interaction ─────────────────────
  const pauseAuto = useCallback(() => {
    autoActiveRef.current = false;
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      autoActiveRef.current = true;
    }, RESUME_AFTER);
  }, []);

  // Mount: start auto-slide on mobile only
  useEffect(() => {
    isMobile.current = isMobileDevice();
    autoActiveRef.current = true;
    startAuto();
    return () => {
      clearInterval(autoTimerRef.current);
      clearTimeout(resumeTimerRef.current);
    };
  }, [startAuto]);

  // ── Navigation handlers ───────────────────────────────────────────────────
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pauseAuto();
    setCurrentImageIndex((p) => (p + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pauseAuto();
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((f) => !f);
  };

  return (
    <Link
      to={`/property/${listing.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* ── Image section ─────────────────────────────────────────────── */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        {/* Crossfade image stack */}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={listing.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:scale-110 transition-transform duration-500"
            style={{ opacity: i === currentImageIndex ? 1 : 0 }}
          />
        ))}

        {/* NEW badge */}
        {listing.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
            New
          </div>
        )}

        {/* Sample image badge */}
        {listing.isSample && (
          <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              Sample image
            </span>
          </div>
        )}

        {/* Desktop carousel arrows — visible on hover only */}
        {hasMultiple && (
          <div className="hidden md:flex absolute inset-0 items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* Mobile carousel arrows — always visible when there are multiple images */}
        {hasMultiple && (
          <div className="flex md:hidden absolute inset-0 items-center justify-between px-2 z-10">
            <button
              onClick={prevImage}
              className="w-7 h-7 bg-black/35 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="w-7 h-7 bg-black/35 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Favourite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIndex ? "bg-white w-6" : "bg-white/60 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* Auto-slide progress bar — mobile only, resets key on each slide */}
        {hasMultiple && (
          <div className="md:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10 overflow-hidden">
            <div
              key={`progress-${currentImageIndex}`}
              className="h-full bg-white/70"
              style={{
                animation: `cardAutoProgress ${AUTO_SLIDE_DELAY}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      {/* ── Content section ───────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
          {listing.title}
        </h3>
        <p className="text-xs text-gray-600 mb-4 line-clamp-1">
          {listing.address}
        </p>
        <div className="flex items-baseline space-x-1 justify-end">
          <span className="text-sm text-gray-600">
            Ksh.{" "}
            <span className="text-2xl text-gray-900 font-bold">
              {listing.price}
            </span>
          </span>
          <span className="text-sm text-gray-600">/ month</span>
        </div>
      </div>

      {/* Progress bar keyframe — injected once per card instance */}
      <style>{`
        @keyframes cardAutoProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </Link>
  );
};

export default PropertyCard;
