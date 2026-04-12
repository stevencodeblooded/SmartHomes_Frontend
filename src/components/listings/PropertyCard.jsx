// src/components/listings/PropertyCard.jsx

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = listing.images || [listing.image];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/property/${listing.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        {/* Main Image */}
        <img
          src={images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* NEW Badge */}
        {listing.isNew && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
            New
          </div>
        )}

        {/* Sample Image Badge (if needed) */}
        {listing.isSample && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              Sample image
            </span>
          </div>
        )}

        {/* Carousel Controls */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-6" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
          {listing.title}
        </h3>

        {/* Address */}
        <p className="text-xs text-gray-600 mb-4 line-clamp-1">
          {listing.address}
        </p>

        {/* Price */}
        <div className="flex items-baseline space-x-1 justify-end">
          <span className="text-sm text-gray-600">
            Ksh.{" "}
            <span className="text-2xl text-gray-900 font-bold">
              {" "}
              {listing.price}
            </span>
          </span>
          <span className="text-sm text-gray-600">/ month</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
