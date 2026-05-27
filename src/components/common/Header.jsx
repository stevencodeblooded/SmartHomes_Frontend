// src/components/common/Header.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Menu,
  Globe,
  User,
  ChevronRight,
  Home,
  Heart,
  Bell,
  LogIn,
  UserPlus,
  MapPin,
  Sparkles,
} from "lucide-react";
import { ApartmentLogoNested } from "./ApartmentLogo";
import { AuthModal } from "./AuthViews";

// ── Kenyan locations for search suggestions ──────────────────────────────────
const SEARCH_SUGGESTIONS = [
  "Westlands, Nairobi",
  "Kilimani, Nairobi",
  "Karen, Nairobi",
  "Parklands, Nairobi",
  "Nyali, Mombasa",
  "Bamburi, Mombasa",
  "Kisumu CBD",
  "Nakuru Town",
  "Eldoret Town",
  "Diani, Kwale",
];

// ── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "New listings", to: "/search", icon: Sparkles },
  { label: "Favorites", to: "/user", icon: Heart },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [authModal, setAuthModal] = useState(null);
  const [notifDot, setNotifDot] = useState(true);

  const searchInputRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = false;

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu on outside click ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Focus search input when overlay opens ─────────────────────────────────
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 120);
    } else {
      setSearchQuery("");
      setSuggestions([]);
    }
  }, [searchOpen]);

  // ── Lock body scroll when search/menu open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = authModal || searchOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModal, searchOpen]);

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Search input ──────────────────────────────────────────────────────────
  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSuggestions(
      val.trim().length > 0
        ? SEARCH_SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(val.toLowerCase()),
          ).slice(0, 5)
        : SEARCH_SUGGESTIONS.slice(0, 5),
    );
  };

  const handleSearchFocus = () => {
    setSuggestions(
      searchQuery.trim().length > 0
        ? SEARCH_SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase()),
          ).slice(0, 5)
        : SEARCH_SUGGESTIONS.slice(0, 5),
    );
  };

  const handleSearchSubmit = (query = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?location=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const openAuth = (view) => {
    setMenuOpen(false);
    setAuthModal(view);
  };

  // ── Animation variants ────────────────────────────────────────────────────
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -8,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  const searchPanelVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 28 },
    },
    exit: { opacity: 0, y: -16, transition: { duration: 0.16 } },
  };

  const suggestionVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    }),
  };

  return (
    <>
      {/* ── Search overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="search-backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />

            {/* Search panel */}
            <motion.div
              key="search-panel"
              variants={searchPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl"
              style={{ borderRadius: "0 0 24px 24px" }}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
                {/* Input row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm transition-all">
                    <Search className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInput}
                      onFocus={handleSearchFocus}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSearchSubmit()
                      }
                      placeholder="Search by city, region, or neighborhood…"
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSuggestions(SEARCH_SUGGESTIONS.slice(0, 5));
                        }}
                        className="text-gray-300 hover:text-gray-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleSearchSubmit()}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition-colors flex-shrink-0 shadow-md shadow-red-200"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-3 rounded-2xl hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Suggestions */}
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <div className="mt-4 space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
                        {searchQuery
                          ? "Matching locations"
                          : "Popular searches"}
                      </p>
                      {suggestions.map((s, i) => (
                        <motion.button
                          key={s}
                          custom={i}
                          variants={suggestionVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => handleSearchSubmit(s)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors text-left group"
                        >
                          <MapPin className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors font-medium flex-1">
                            {s}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-red-300 transition-colors" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main header ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          delay: 0.05,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <motion.div
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 16 }}
              >
                <ApartmentLogoNested />
              </motion.div>
              <span className="text-sm font-bold text-gray-900 tracking-tight group-hover:text-red-500 transition-colors whitespace-nowrap">
                SmartHomes
              </span>
            </Link>

            {/* ── Centre: search pill (desktop) ── */}
            <motion.button
              onClick={() => setSearchOpen(true)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-3 flex-1 max-w-sm mx-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-red-200 rounded-full px-4 py-2.5 text-left transition-all group shadow-sm"
            >
              <Search className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors font-medium flex-1">
                Search city, region…
              </span>
              <span className="text-xs text-gray-300 bg-white border border-gray-200 px-2 py-0.5 rounded-full font-medium hidden lg:block">
                ⌘K
              </span>
            </motion.button>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Nav links — desktop only */}
              {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}

              {/* Search icon — mobile only */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </motion.button>

              {/* Notification bell — authenticated only (demo) */}
              {isAuthenticated && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={() => setNotifDot(false)}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifDot && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                  )}
                </motion.button>
              )}

              {/* ── Menu / user button ── */}
              <div className="relative" ref={menuRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setMenuOpen((o) => !o)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${
                    menuOpen
                      ? "border-red-300 bg-red-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: menuOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Menu
                      className={`w-[18px] h-[18px] ${menuOpen ? "text-red-500" : "text-gray-700"}`}
                    />
                  </motion.div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      menuOpen ? "bg-red-100" : "bg-gray-100"
                    }`}
                  >
                    <User
                      className={`w-4 h-4 ${menuOpen ? "text-red-500" : "text-gray-600"}`}
                    />
                  </div>
                </motion.button>

                {/* ── Dropdown menu ── */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      key="menu"
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_64px_rgba(0,0,0,0.13)] z-50 overflow-hidden"
                      style={{ top: "100%", transformOrigin: "top right" }}
                    >
                      {/* Header strip */}
                      <div className="px-4 pt-4 pb-3 border-b border-gray-50">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Account
                        </p>
                      </div>

                      {/* Auth actions */}
                      <div className="p-2">
                        <motion.button
                          whileHover={{ x: 2 }}
                          onClick={() => openAuth("login")}
                          className="group w-full flex items-center gap-3 rounded-2xl px-3 py-3 transition-all hover:bg-red-50"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0">
                            <LogIn className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                          </div>
                          <div className="flex flex-col items-start flex-1">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                              Log in
                            </span>
                            <span className="text-xs text-gray-400">
                              Access your account
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-300 transition-colors" />
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 2 }}
                          onClick={() => openAuth("signup-full")}
                          className="group w-full flex items-center gap-3 rounded-2xl px-3 py-3 transition-all hover:bg-red-50"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0">
                            <UserPlus className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                          </div>
                          <div className="flex flex-col items-start flex-1">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                              Register
                            </span>
                            <span className="text-xs text-gray-400">
                              Create a new account
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-300 transition-colors" />
                        </motion.button>
                      </div>

                      {/* Divider + quick links */}
                      <div className="border-t border-gray-50 p-2">
                        <Link
                          to="/search"
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
                            New listings
                          </span>
                        </Link>
                        <Link
                          to="/user"
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
                            Saved listings
                          </span>
                        </Link>
                      </div>

                      {/* Footer strip */}
                      <div className="border-t border-gray-50 px-4 py-3 bg-gray-50/60">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Discover rentals across Kenya 🇰🇪
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Auth Modal ─────────────────────────────────────────────────────── */}
      {authModal && (
        <AuthModal startView={authModal} onClose={() => setAuthModal(null)} />
      )}
    </>
  );
};

export default Header;
