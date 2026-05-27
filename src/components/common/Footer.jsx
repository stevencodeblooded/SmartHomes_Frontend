// src/components/common/Footer.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ExternalLink,
  Search,
  Bell,
  HelpCircle,
  FileText,
  Users,
  MessageSquare,
} from "lucide-react";
import { ApartmentLogoNested } from "./ApartmentLogo";

// ── Footer data ───────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    title: "Tenant Area",
    links: [
      { label: "Search for rentals", to: "/search", icon: Search },
      { label: "Create listing alert", to: "#", icon: Bell },
      { label: "FAQs", to: "#", icon: HelpCircle },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About us", to: "#", icon: Users },
      { label: "Terms & Conditions", to: "#", icon: FileText },
      { label: "Contact us", to: "#", icon: MessageSquare },
    ],
  },
];

const SOCIAL = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const CITIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Diani"];

// ── Mobile accordion section ──────────────────────────────────────────────────
const AccordionSection = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 px-0 text-left"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <ul className="pb-4 space-y-3">
              {links.map(({ label, to, icon: Icon }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-red-500 transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Footer ───────────────────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* ── Top CTA band ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-red-500 to-red-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                Are you a landlord?
              </p>
              <p className="text-red-100 text-sm">
                List your property for free and reach thousands of tenants.
              </p>
            </div>
            <motion.a
              href="/landlord"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white text-red-600 font-semibold px-5 py-2.5 rounded-xl text-sm flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
            >
              List your property
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-12">
          {/* ── Brand column ── */}
          <div className="lg:col-span-1 pb-6 lg:pb-0 border-b border-gray-100 lg:border-0 mb-2 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit group">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 16 }}
              >
                <ApartmentLogoNested />
              </motion.div>
              <span className="text-sm font-bold text-gray-900 group-hover:text-red-500 transition-colors">
                SmartHomes
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
              Kenya's most trusted rental platform. Find your perfect home from
              thousands of verified listings.
            </p>

            {/* Contact snippets */}
            <div className="space-y-2 mb-6">
              {[
                {
                  icon: MapPin,
                  text: "Nairobi, Kenya",
                  href: "https://maps.google.com/?q=Nairobi,Kenya",
                },
                {
                  icon: Mail,
                  text: "hello@smarthomes.co.ke",
                  href: "mailto:hello@smarthomes.co.ke",
                },
                {
                  icon: Phone,
                  text: "+254 700 000 000",
                  href: "tel:+254700000000",
                },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 text-red-300 group-hover:text-red-500 flex-shrink-0 transition-colors" />
                  <span>{text}</span>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Link columns — desktop: side by side, mobile: accordion ── */}
          <div className="lg:col-span-2">
            {/* Mobile: accordion */}
            <div className="lg:hidden">
              {SECTIONS.map((s) => (
                <AccordionSection key={s.title} {...s} />
              ))}
            </div>

            {/* Desktop: two columns */}
            <div className="hidden lg:grid grid-cols-2 gap-8">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map(({ label, to, icon: Icon }) => (
                      <li key={label}>
                        <Link
                          to={to}
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors group"
                        >
                          <Icon className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-colors flex-shrink-0" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Popular cities ── */}
          <div className="lg:col-span-1 pt-6 lg:pt-0 border-t border-gray-100 lg:border-0 mt-2 lg:mt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Popular Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <motion.div
                  key={city}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to={`/search?location=${city}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-full transition-all"
                  >
                    <MapPin className="w-3 h-3" />
                    {city}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* App download hint */}
            <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-semibold text-gray-700 mb-1">
                🏠 Find faster on mobile
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Browse listings, save favourites and contact landlords on the
                go.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-gray-50/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-gray-600">SmartHomes</span>.
              All rights reserved.
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
              in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
