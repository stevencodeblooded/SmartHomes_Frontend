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
                    className="absolute right-0 mt-3 w-60 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={{ top: "100%" }}
                  >
                    {/* Top section */}
                    <div className="p-2">
                      <button
                        onClick={() => openAuth("login")}
                        className="group w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-red-50"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 group-hover:bg-red-100 transition-colors">
                          <FiUser
                            size={16}
                            className="text-gray-500 group-hover:text-red-500 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col items-start">
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                            Log in
                          </span>
                          <span className="text-xs text-gray-500">
                            Access your account
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => openAuth("signup-full")}
                        className="group w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-red-50"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 group-hover:bg-red-100 transition-colors">
                          <FiUser
                            size={16}
                            className="text-gray-500 group-hover:text-red-500 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col items-start">
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                            Register
                          </span>
                          <span className="text-xs text-gray-500">
                            Create a new account
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Bottom subtle section */}
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/60">
                      <p className="text-xs leading-relaxed text-gray-500">
                        Discover rentals, apartments, and homes across Kenya.
                      </p>
                    </div>
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
