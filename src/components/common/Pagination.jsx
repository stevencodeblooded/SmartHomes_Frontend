// src/components/common/Pagination.jsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// ─── Utility: clamp ─────────────────────────────────────────────────────────
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// ─── Infinite Scroll Hook ───────────────────────────────────────────────────
export const useInfiniteScroll = ({ hasMore, onLoadMore, threshold = 300 }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (loading || !hasMore) return;
      const scrolled = window.innerHeight + window.scrollY;
      const total = document.documentElement.scrollHeight;
      if (total - scrolled < threshold) {
        setLoading(true);
        await onLoadMore();
        setLoading(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, onLoadMore, threshold]);

  return { loading };
};

// ─── Mobile Infinite Scroll Sentinel ────────────────────────────────────────
const InfiniteScrollSentinel = ({ onLoadMore, hasMore }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) {
      setDone(true);
      return;
    }
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          await onLoadMore?.();
          setLoading(false);
        }
      },
      { threshold: 0.1 },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="w-8 h-px bg-gray-200" />
        <p className="text-xs text-gray-400 font-medium">You've seen it all</p>
      </div>
    );
  }

  return (
    <div ref={sentinelRef} className="flex items-center justify-center py-8">
      {loading && (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs font-medium">Loading more…</span>
        </div>
      )}
    </div>
  );
};

// ─── Main Pagination ─────────────────────────────────────────────────────────
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onLoadMore,
  hasMore = true,
  maxButtons = 5,
  className = "",
}) => {
  const [hovered, setHovered] = useState(null);

  // Decide: mobile gets infinite scroll, desktop gets numbered pagination
  // We do this purely via CSS (show/hide based on breakpoint)

  if (totalPages <= 1 && !onLoadMore) return null;

  // ── Page number generation ──────────────────────────────────────────────
  const getPages = () => {
    if (totalPages <= maxButtons + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const half = Math.floor(maxButtons / 2);
    let start = clamp(currentPage - half, 2, totalPages - maxButtons);
    let end = clamp(start + maxButtons - 1, maxButtons, totalPages - 1);

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const showInfo = totalItems && itemsPerPage;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      {/* ── MOBILE: Infinite scroll sentinel ─────────────────────── */}
      <div className="lg:hidden">
        <InfiniteScrollSentinel onLoadMore={onLoadMore} hasMore={hasMore} />
      </div>

      {/* ── DESKTOP: Full pagination ──────────────────────────────── */}
      <div
        className={`hidden lg:flex flex-col items-center gap-4 ${className}`}
      >
        {/* Results info */}
        {showInfo && (
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {startItem}–{endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {totalItems.toLocaleString()}
            </span>{" "}
            properties
          </p>
        )}

        {/* Pagination row */}
        <div className="flex items-center gap-1.5">
          {/* Prev */}
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              group relative flex items-center gap-1.5 pl-3 pr-4 h-10
              rounded-xl border text-sm font-semibold transition-all duration-200
              ${
                currentPage === 1
                  ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                  : "border-gray-200 text-gray-600 bg-white hover:border-red-300 hover:text-red-600 hover:bg-red-50 hover:shadow-md hover:shadow-red-100 active:scale-95"
              }
            `}
            aria-label="Previous page"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${currentPage > 1 ? "group-hover:-translate-x-0.5" : ""}`}
            />
            <span>Prev</span>
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {pages.map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm select-none"
                >
                  ···
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => page !== currentPage && onPageChange(page)}
                  onMouseEnter={() => setHovered(page)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
                    relative w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      page === currentPage
                        ? "bg-gradient-to-br from-red-500 to-purple-600 text-white shadow-lg shadow-red-200 scale-105"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 hover:shadow-md hover:shadow-red-100 active:scale-95"
                    }
                  `}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                  {/* Active indicator dot */}
                  {page === currentPage && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
                  )}
                </button>
              ),
            )}
          </div>

          {/* Next */}
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`
              group relative flex items-center gap-1.5 pl-4 pr-3 h-10
              rounded-xl border text-sm font-semibold transition-all duration-200
              ${
                currentPage === totalPages
                  ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                  : "border-gray-200 text-gray-600 bg-white hover:border-red-300 hover:text-red-600 hover:bg-red-50 hover:shadow-md hover:shadow-red-100 active:scale-95"
              }
            `}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${currentPage < totalPages ? "group-hover:translate-x-0.5" : ""}`}
            />
          </button>
        </div>

        {/* Page jump (for many pages) */}
        {totalPages > 10 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Jump to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              defaultValue={currentPage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = clamp(Number(e.target.value), 1, totalPages);
                  onPageChange(val);
                  e.target.value = val;
                }
              }}
              className="w-16 h-8 border border-gray-200 rounded-lg text-center text-sm text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
            />
            <span>of {totalPages}</span>
          </div>
        )}
      </div>
    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  maxButtons: PropTypes.number,
  className: PropTypes.string,
};

// ─── Named exports for backwards compat ─────────────────────────────────────

export const PaginationWithInfo = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLoadMore,
  hasMore,
  className = "",
}) => (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    totalItems={totalItems}
    itemsPerPage={itemsPerPage}
    onPageChange={onPageChange}
    onLoadMore={onLoadMore}
    hasMore={hasMore}
    className={className}
  />
);

export const LoadMorePagination = ({
  hasMore,
  loading,
  onLoadMore,
  className = "",
}) => {
  if (!hasMore) return null;
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-400 hover:shadow-lg hover:shadow-red-100 transition-all font-semibold text-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading…
          </>
        ) : (
          "Load more properties"
        )}
      </button>
    </div>
  );
};

export default Pagination;
