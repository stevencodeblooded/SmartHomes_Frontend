// src/components/home/PopularDestinations.jsx

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatNumber } from "../../utils/formatters";

const PopularDestinations = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollIntervalRef = useRef(null);

  const destinations = [
    {
      name: "Westlands",
      city: "Nairobi",
      image:
        "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
      properties: 245,
      averageRent: 80000,
      description: "Upscale area with modern amenities",
    },
    {
      name: "Kilimani",
      city: "Nairobi",
      image:
        "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&auto=format&fit=crop",
      properties: 189,
      averageRent: 60000,
      description: "Popular residential hub near CBD",
    },
    {
      name: "Karen",
      city: "Nairobi",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
      properties: 134,
      averageRent: 150000,
      description: "Prestigious leafy suburb",
    },
    {
      name: "Mombasa",
      city: "Mombasa",
      image:
        "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&auto=format&fit=crop",
      properties: 298,
      averageRent: 45000,
      description: "Coastal city with beaches",
    },
    {
      name: "Kisumu",
      city: "Kisumu",
      image:
        "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudHN8ZW58MHx8MHx8fDA%3D",
      properties: 167,
      averageRent: 35000,
      description: "Lakeside city on Lake Victoria",
    },
    {
      name: "Lavington",
      city: "Nairobi",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      properties: 156,
      averageRent: 120000,
      description: "Affluent quiet neighborhood",
    },
    {
      name: "Nakuru",
      city: "Nakuru",
      image:
        "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&auto=format&fit=crop",
      properties: 198,
      averageRent: 28000,
      description: "Growing city with great opportunities",
    },
    {
      name: "Runda",
      city: "Nairobi",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      properties: 89,
      averageRent: 220000,
      description: "Premium gated community",
    },
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Auto scroll functionality
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) return; // Already running

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current && !isHovered) {
        const cardWidth = 320 + 24;
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + cardWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
    }

    // Start auto-scrolling
    startAutoScroll();

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
      stopAutoScroll();
    };
  }, []);

  // Handle hover state changes
  useEffect(() => {
    if (isHovered) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }, [isHovered]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 + 24;
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2 leading-tight">
              Popular Destinations
            </h2>
            <p className="text-sm text-gray-600">
              Explore the most sought-after locations across Kenya
            </p>
          </div>

          {/* Navigation Arrows for Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "hover:bg-gray-50 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <FiChevronLeft size={24} className="text-gray-700" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center transition-all ${
                canScrollRight
                  ? "hover:bg-gray-50 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <FiChevronRight size={24} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Destinations Horizontal Scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {destinations.map((destination, index) => (
              <Link
                key={index}
                to={`/search?location=${destination.name}`}
                className="flex-shrink-0 w-80 group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    {/* Location Name */}
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-red-300 transition-colors">
                      {destination.name}
                    </h3>

                    {/* City Badge */}
                    <div className="flex items-center gap-1 text-sm text-white/90 mb-2">
                      <FiMapPin size={14} />
                      <span>{destination.city}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/80 mb-3">
                      {destination.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <div className="text-sm">
                        <span className="font-medium">
                          {formatNumber(destination.properties)} properties
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-white/70">From </span>
                        <span className="font-semibold">
                          KES {formatNumber(destination.averageRent)}/mo
                        </span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Destinations */}
        <div className="text-center mt-8">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg group"
          >
            Explore all destinations
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
