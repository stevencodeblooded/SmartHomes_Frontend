// src/components/home/FeaturedCategories.jsx

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiSquare,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { DoorOpen } from "lucide-react";

const FeaturedCategories = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Now matches PropertyFilters.jsx propertyTypes exactly
  const categories = [
    {
      id: "room",
      title: "Room",
      description: "Private room in a shared property",
      icon: <DoorOpen size={28} />,
      link: "/search?propertyType=room",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      count: "1,200+ properties",
    },
    {
      id: "detached",
      title: "Detached House",
      description: "Standalone homes with full privacy",
      icon: <FiHome size={28} />,
      link: "/search?propertyType=detached",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      count: "3,210+ properties",
    },
    {
      id: "apartments",
      title: "Apartments",
      description: "Modern flats and apartment units",
      icon: <FiGrid size={28} />,
      link: "/search?propertyType=apartments",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      count: "5,680+ properties",
    },
    {
      id: "suites",
      title: "Suites",
      description: "Premium self-contained suites",
      icon: <FiSquare size={28} />,
      link: "/search?propertyType=suites",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      count: "450+ properties",
    },
    {
      id: "student",
      title: "Student Apartments",
      description: "Ideal for students near campus",
      icon: <FiUsers size={28} />,
      link: "/search?propertyType=student",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      count: "890+ properties",
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

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollTo({
        left:
          scrollContainerRef.current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-600">
              Discover the perfect type of accommodation for your needs
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all ${
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
              className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all ${
                canScrollRight
                  ? "hover:bg-gray-50 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <FiChevronRight size={24} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="flex-shrink-0 w-72 group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}
                  />
                  <div
                    className={`${category.bgColor} ${category.textColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    {category.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        {category.count}
                      </span>
                      <span className="text-red-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg group"
          >
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
