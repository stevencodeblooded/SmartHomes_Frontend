// src/components/property-detail/ImageGalleryEnhanced.jsx

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageGalleryEnhanced = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images to support both string URLs and objects with labels
  const normalizedImages = images.map((img) =>
    typeof img === "string" ? { url: img, label: null } : img,
  );

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length,
    );
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  // Layout: First image large, then grid of remaining images
  const [mainImage, ...thumbnailImages] = normalizedImages;
  const visibleThumbnails = thumbnailImages.slice(0, 4);
  const remainingCount = Math.max(0, thumbnailImages.length - 4);

  return (
    <>
      {/* Gallery Grid */}
      <div className="w-full bg-gray-100 p-2">
        <div className="grid grid-cols-4 gap-2 h-[400px]">
          {/* Main Large Image */}
          <div
            className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden rounded-lg bg-white"
            onClick={() => openLightbox(0)}
          >
            <img
              src={mainImage.url}
              alt={mainImage.label || "Property main"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

            {/* Label for main image */}
            {mainImage.label && (
              <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black text-sm font-semibold px-3 py-2">
                {mainImage.label}
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {visibleThumbnails.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer group overflow-hidden rounded-lg bg-white"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image.url}
                alt={image.label || `Property ${index + 2}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

              {/* Show remaining count on last thumbnail */}
              {index === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-3xl font-bold">
                    +{remainingCount}
                  </span>
                </div>
              )}

              {/* Yellow label for special images */}
              {image.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1.5 truncate">
                  {image.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-20 shadow-xl"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center px-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={normalizedImages[currentIndex].url}
              alt={
                normalizedImages[currentIndex].label ||
                `Property ${currentIndex + 1}`
              }
              className="max-w-full max-h-[85vh] object-contain select-none"
              draggable={false}
            />

            {/* Image Label (if exists) */}
            {normalizedImages[currentIndex].label && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded-lg shadow-lg">
                {normalizedImages[currentIndex].label}
              </div>
            )}

            {/* Previous Button */}
            {normalizedImages.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
              </button>
            )}

            {/* Next Button */}
            {normalizedImages.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
              </button>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
              {/* Dot Indicators */}
              <div className="flex space-x-2 max-w-xs overflow-x-auto scrollbar-hide px-4">
                {normalizedImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`rounded-full transition-all flex-shrink-0 ${
                      index === currentIndex
                        ? "bg-white w-8 h-2"
                        : "bg-white/50 w-2 h-2 hover:bg-white/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentIndex + 1} / {normalizedImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ImageGalleryEnhanced;
