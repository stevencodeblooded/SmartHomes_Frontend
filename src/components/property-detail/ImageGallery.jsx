// src/components/property-detail/ImageGallery.jsx

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageGallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Layout: First image large, then grid of remaining images
  const [mainImage, ...thumbnailImages] = images;
  const visibleThumbnails = thumbnailImages.slice(0, 4);
  const remainingCount = thumbnailImages.length - 4;

  return (
    <>
      {/* Gallery Grid */}
      <div className="w-full">
        <div className="grid grid-cols-4 gap-2 h-[400px]">
          {/* Main Large Image */}
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

          {/* Thumbnail Grid */}
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

              {/* Show remaining count on last thumbnail */}
              {index === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    +{remainingCount}
                  </span>
                </div>
              )}

              {/* Yellow label for special images (like "Ensuite Bathroom") */}
              {image.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1">
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
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>

          {/* Main Image */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Property ${currentIndex + 1}`}
              className="max-w-[90%] max-h-[90vh] object-contain"
            />

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Image Counter and Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
              {/* Dot Indicators */}
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-8 h-2"
                        : "bg-white/50 w-2 h-2 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
