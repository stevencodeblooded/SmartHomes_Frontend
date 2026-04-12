// src/components/common/Header.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiMenu, FiGlobe, FiUser } from "react-icons/fi";
import { ApartmentLogoNested } from "./ApartmentLogo";
import { AuthModal } from "./AuthViews";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // "login" | "signup-full" | null
  const [authModal, setAuthModal] = useState(null);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const isAuthenticated = false;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = authModal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModal]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?location=${searchQuery}`);
      setShowSearchDropdown(false);
      setSearchQuery("");
    }
  };

  const openAuth = (view) => {
    setShowMobileMenu(false);
    setAuthModal(view);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <ApartmentLogoNested />
              <h1 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                SmartHomes
              </h1>
            </Link>

            {/* ── Right side ── */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              {/* New listing link */}
              <Link
                to="/search"
                className="hidden lg:block text-sm text-gray-700 hover:text-red-500 font-medium transition-colors whitespace-nowrap"
              >
                New listings
              </Link>

              {/* Globe */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiGlobe size={20} className="text-gray-600" />
              </button>

              {/* Menu + user toggle */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMobileMenu((o) => !o)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-gray-200 hover:shadow-md rounded-full transition-all"
                >
                  <FiMenu size={18} className="text-gray-700" />
                  <FiUser size={18} className="text-gray-700" />
                </button>

                {showMobileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                    style={{ top: "100%" }}
                  >
                    <button
                      onClick={() => openAuth("login")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FiUser size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Log in
                      </span>
                    </button>
                    <button
                      onClick={() => openAuth("signup-full")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <FiUser size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Register
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Auth Modal (shared views from AuthViews.jsx) ── */}
      {authModal && (
        <AuthModal startView={authModal} onClose={() => setAuthModal(null)} />
      )}
    </>
  );
};

export default Header;
