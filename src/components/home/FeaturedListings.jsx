// src/components/home/FeaturedListings.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiMapPin,
  FiPlusCircle,
  FiMaximize2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiTable,
} from "react-icons/fi";
import { MOCK_PROPERTIES } from "../../data/mockProperties";
import { formatCurrency } from "../../utils/formatters";
import { VerifiedBadge, FeaturedBadge } from "../common/Badge";
import Card from "../common/Card";
import { PropertyCardSkeleton } from "../common/Loader";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <Link to={`/property/${property.id}`} className="block flex-shrink-0 w-80">
      <Card padding="none" hover className="overflow-hidden h-full group">
        {/* Image Gallery */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={
              // property.images[currentImageIndex] ||
              "https://images.pexels.com/photos/6920435/pexels-photo-6920435.jpeg"
            }
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ›
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {property.images.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <FiHeart
              size={20}
              className={`transition-all ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.featured && <FeaturedBadge size="sm" />}
            {property.verified && <VerifiedBadge size="sm" />}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location & Price */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
                <FiMapPin size={14} />
                <span>
                  {property.location.neighborhood}, {property.location.city}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                {property.title}
              </h3>
            </div>
          </div>

          {/* Property Type */}
          <p className="text-sm text-gray-500 mb-3 capitalize">
            {property.propertyType} • {property.rentalType}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              {/* <FiBed size={16} /> */}
              <FiPlusCircle size={16} />
              <span>
                {property.bedrooms === 0
                  ? "Studio"
                  : `${property.bedrooms} bed`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {/* <FiBath size={16} /> */}
              <FiTable size={16} />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1">
              <FiMaximize2 size={16} />
              <span>{property.size}m²</span>
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {property.rating > 0 && (
                <>
                  <div className="flex items-center gap-1">
                    <FiStar
                      className="fill-yellow-400 text-yellow-400"
                      size={16}
                    />
                    <span className="font-semibold text-gray-900">
                      {property.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({property.reviewsCount})
                  </span>
                </>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {property.price.month
                  ? formatCurrency(property.price.month)
                  : formatCurrency(property.price.night)}
              </div>
              <div className="text-xs text-gray-500">
                {property.price.month ? "/ month" : "/ night"}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const featured = MOCK_PROPERTIES.filter((property) => property.featured);
      setProperties(featured.slice(0, 12));
      setLoading(false);
    }, 500);
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, [loading]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Width of card + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Featured Properties
            </h2>
            <p className="text-sm text-gray-600">
              Handpicked properties across Kenya
            </p>
          </div>
          <Link
            to="/search?featured=true"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold group"
          >
            View all featured
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {!loading && (
            <>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "hover:bg-gray-50 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                style={{ transform: "translateY(-50%) translateX(-50%)" }}
              >
                <FiChevronLeft size={24} className="text-gray-700" />
              </button>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "hover:bg-gray-50 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                style={{ transform: "translateY(-50%) translateX(50%)" }}
              >
                <FiChevronRight size={24} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Properties Horizontal Scroll */}
          {loading ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <PropertyCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {!loading && (
          <div className="text-center mt-8">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg group"
            >
              Explore all properties
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
