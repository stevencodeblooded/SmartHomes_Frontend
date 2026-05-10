// src/components/property-detail/ImageGallery.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Grid2X2 } from "lucide-react";

const AUTO_SCROLL_DELAY = 10000; // 10 seconds between slides
const RESUME_AFTER = 5000; // resume auto-scroll 5s after user interaction

const ImageGallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Use refs for timers so they don't trigger re-renders
  const mobileTimerRef = useRef(null);
  const mobileResumeRef = useRef(null);
  const lightboxTimerRef = useRef(null);
  const lightboxResumeRef = useRef(null);
  const mobileAutoOn = useRef(true);
  const lightboxAutoOn = useRef(true);

  // ── Mobile auto-scroll ───────────────────────────────────────────────────

  const startMobileAuto = useCallback(() => {
    clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = setInterval(() => {
      if (mobileAutoOn.current) {
        setMobileIndex((p) => (p + 1) % images.length);
      }
    }, AUTO_SCROLL_DELAY);
  }, [images.length]);

  const pauseMobileAuto = useCallback(() => {
    mobileAutoOn.current = false;
    clearTimeout(mobileResumeRef.current);
    mobileResumeRef.current = setTimeout(() => {
      mobileAutoOn.current = true;
    }, RESUME_AFTER);
  }, []);

  useEffect(() => {
    mobileAutoOn.current = true;
    startMobileAuto();
    return () => {
      clearInterval(mobileTimerRef.current);
      clearTimeout(mobileResumeRef.current);
    };
  }, [startMobileAuto]);

  // ── Lightbox auto-scroll ─────────────────────────────────────────────────

  const startLightboxAuto = useCallback(() => {
    clearInterval(lightboxTimerRef.current);
    lightboxTimerRef.current = setInterval(() => {
      if (lightboxAutoOn.current) {
        setCurrentIndex((p) => (p + 1) % images.length);
      }
    }, AUTO_SCROLL_DELAY);
  }, [images.length]);

  const pauseLightboxAuto = useCallback(() => {
    lightboxAutoOn.current = false;
    clearTimeout(lightboxResumeRef.current);
    lightboxResumeRef.current = setTimeout(() => {
      lightboxAutoOn.current = true;
    }, RESUME_AFTER);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      lightboxAutoOn.current = true;
      startLightboxAuto();
    } else {
      clearInterval(lightboxTimerRef.current);
      clearTimeout(lightboxResumeRef.current);
    }
    return () => {
      clearInterval(lightboxTimerRef.current);
      clearTimeout(lightboxResumeRef.current);
    };
  }, [lightboxOpen, startLightboxAuto]);

  // ── Keyboard: Escape closes, arrow keys navigate ─────────────────────────

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        pauseLightboxAuto();
        setCurrentIndex((p) => (p + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        pauseLightboxAuto();
        setCurrentIndex((p) => (p - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length, pauseLightboxAuto]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const nextLightbox = (e) => {
    e?.stopPropagation();
    pauseLightboxAuto();
    setCurrentIndex((p) => (p + 1) % images.length);
  };
  const prevLightbox = (e) => {
    e?.stopPropagation();
    pauseLightboxAuto();
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
  };
  const nextMobile = (e) => {
    e?.stopPropagation();
    pauseMobileAuto();
    setMobileIndex((p) => (p + 1) % images.length);
  };
  const prevMobile = (e) => {
    e?.stopPropagation();
    pauseMobileAuto();
    setMobileIndex((p) => (p - 1 + images.length) % images.length);
  };

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      pauseMobileAuto();
      setMobileIndex((p) =>
        diff > 0
          ? (p + 1) % images.length
          : (p - 1 + images.length) % images.length,
      );
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const [mainImage, ...thumbnailImages] = images;
  const visibleThumbnails = thumbnailImages.slice(0, 4);
  const remainingCount = thumbnailImages.length - 4;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          MOBILE — full-width hero carousel with auto-scroll
      ───────────────────────────────────────────────────────────────────── */}
      <div className="block md:hidden relative w-full overflow-hidden bg-black">
        <div
          className="relative h-[300px] sm:h-[380px] w-full select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => openLightbox(mobileIndex)}
        >
          {/* Crossfade images */}
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === mobileIndex ? 1 : 0,
                pointerEvents: i === mobileIndex ? "auto" : "none",
              }}
            >
              <img
                src={img}
                alt={`Property ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={prevMobile}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextMobile}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Counter pill */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <Grid2X2 className="w-3.5 h-3.5" />
            {mobileIndex + 1} / {images.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  pauseMobileAuto();
                  setMobileIndex(i);
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === mobileIndex ? 20 : 6,
                  height: 6,
                  background:
                    i === mobileIndex ? "#fff" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>

          {/* Auto-scroll progress bar — resets key on each slide change */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10 overflow-hidden">
            <div
              key={`mobile-${mobileIndex}`}
              className="h-full bg-red-400"
              style={{
                animation: `kfProgress ${AUTO_SCROLL_DELAY}ms linear forwards`,
              }}
            />
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-1.5 px-3 py-2.5 bg-gray-900 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                pauseMobileAuto();
                setMobileIndex(i);
                openLightbox(i);
              }}
              className="flex-shrink-0 rounded overflow-hidden transition-all duration-200"
              style={{
                width: 52,
                height: 40,
                outline:
                  i === mobileIndex
                    ? "2px solid #ef4444"
                    : "2px solid transparent",
                outlineOffset: 1,
              }}
            >
              <img
                src={img}
                alt={`Thumb ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          DESKTOP — original mosaic grid (unchanged)
      ───────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-4 gap-2 h-[400px]">
          <div
            className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openLightbox(0)}
          >
            <img
              src={mainImage}
              alt="Property main"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>

          {visibleThumbnails.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer group overflow-hidden rounded-lg"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image}
                alt={`Property ${index + 2}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {index === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    +{remainingCount}
                  </span>
                </div>
              )}
              {image.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1">
                  {image.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          LIGHTBOX — fullscreen, shared between mobile & desktop
      ───────────────────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>

          {/* Keyboard hint — desktop only */}
          <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 z-20 items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-xs px-3 py-1.5 rounded-full pointer-events-none">
            <kbd className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white">
              Esc
            </kbd>
            to close
            <span className="opacity-30 mx-0.5">·</span>
            <kbd className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white">
              ←
            </kbd>
            <kbd className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white">
              →
            </kbd>
            to navigate
          </div>

          {/* Image area */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Crossfade images */}
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Property ${i + 1}`}
                className="absolute max-w-[90%] max-h-[85vh] object-contain transition-opacity duration-700"
                style={{ opacity: i === currentIndex ? 1 : 0 }}
              />
            ))}

            {/* Arrows */}
            <button
              onClick={prevLightbox}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </button>

            {/* Dots + progress bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      pauseLightboxAuto();
                      setCurrentIndex(i);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-white w-8 h-2"
                        : "bg-white/50 w-2 h-2 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-40 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  key={`lb-${currentIndex}`}
                  className="h-full bg-red-400 rounded-full"
                  style={{
                    animation: `kfProgress ${AUTO_SCROLL_DELAY}ms linear forwards`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared keyframe for progress bars */}
      <style>{`
        @keyframes kfProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default ImageGallery;
