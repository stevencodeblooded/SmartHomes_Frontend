// src/components/property-detail/PropertyReviews.jsx

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Star, User, X, ChevronRight, PenLine } from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "James Mwangi",
    date: "2025-03-10",
    rating: 5,
    comment:
      "Great apartment, very clean and the landlord was responsive. Water and electricity were reliable throughout my stay. Would highly recommend.",
  },
  {
    id: 2,
    name: "Aisha Kamau",
    date: "2025-01-22",
    rating: 4,
    comment:
      "Good location, close to the main road. The unit was as described. Only issue was parking space was a bit tight.",
  },
  {
    id: 3,
    name: "Brian Otieno",
    date: "2024-11-05",
    rating: 4,
    comment:
      "Quiet neighborhood, neighbors are friendly. The apartment itself is spacious and well maintained.",
  },
  {
    id: 4,
    name: "Grace Wanjiku",
    date: "2024-09-18",
    rating: 3,
    comment:
      "Decent place for the price. A few maintenance issues at the start but the landlord sorted them out quickly.",
  },
  {
    id: 5,
    name: "Kevin Njoroge",
    date: "2024-07-30",
    rating: 5,
    comment:
      "Loved living here. Security is excellent and the compound is always clean. Will look here first when I need a place again.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const avg = (reviews) =>
  reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

// ── Star rating ───────────────────────────────────────────────────────────────
const StarRating = ({ value, onChange, readonly = false, size = "sm" }) => {
  const [hovered, setHovered] = useState(null);
  const w = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(null)}
          className={readonly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            className={w}
            fill={(hovered ?? value) >= star ? "#ef4444" : "none"}
            stroke={(hovered ?? value) >= star ? "#ef4444" : "#d1d5db"}
          />
        </button>
      ))}
    </div>
  );
};

// ── Mini rating bar ───────────────────────────────────────────────────────────
const RatingBar = ({ label, count, total }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-gray-500 w-4 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-400 rounded-full transition-all duration-500"
        style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
      />
    </div>
    <span className="text-xs text-gray-400 w-3 shrink-0">{count}</span>
  </div>
);

// ── Single review card ────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div className="py-4 border-b border-gray-100 last:border-0">
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
        </div>
      </div>
      <StarRating value={review.rating} readonly />
    </div>
    <p className="text-sm text-gray-600 leading-relaxed pl-10">
      {review.comment}
    </p>
  </div>
);

// ── Write-review form ─────────────────────────────────────────────────────────
const WriteReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!rating) e.rating = "Please select a rating.";
    if (!comment.trim()) e.comment = "Please write a short review.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), rating, comment: comment.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Your name
        </label>
        <input
          type="text"
          placeholder="e.g. James Mwangi"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: "" }));
          }}
          className={`w-full px-4 py-2.5 rounded-3xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-300 ${
            errors.name ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">
          Your rating
        </label>
        <StarRating
          value={rating}
          onChange={(v) => {
            setRating(v);
            if (errors.rating) setErrors((p) => ({ ...p, rating: "" }));
          }}
          size="lg"
        />
        {errors.rating && (
          <p className="text-xs text-red-500 mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Your review
        </label>
        <textarea
          rows={3}
          placeholder="Share your experience with this property…"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (errors.comment) setErrors((p) => ({ ...p, comment: "" }));
          }}
          className={`w-full px-4 py-2.5 rounded-3xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300 ${
            errors.comment ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.comment && (
          <p className="text-xs text-red-500 mt-1">{errors.comment}</p>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-3xl text-sm font-semibold transition-colors"
        >
          Submit review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-3xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// ── Reviews Drawer ────────────────────────────────────────────────────────────
const ReviewsDrawer = ({ reviews, onClose, onAddReview, openOnForm }) => {
  const [filter, setFilter] = useState("recent");
  const [showForm, setShowForm] = useState(openOnForm);
  const [submitted, setSubmitted] = useState(false);

  // "entering" → "visible" → "leaving"
  const [animState, setAnimState] = useState("entering");
  const mobile = isMobile();

  // Trigger entering → visible on next two frames so CSS sees the start state
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimState("visible")),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = useCallback(() => {
    setAnimState("leaving");
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [handleClose]);

  const sorted = [...reviews].sort((a, b) => {
    if (filter === "favourable") return b.rating - a.rating;
    if (filter === "critical") return a.rating - b.rating;
    return new Date(b.date) - new Date(a.date);
  });

  const handleSubmit = (data) => {
    onAddReview(data);
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const isVisible = animState === "visible";

  // ── Animation styles ─────────────────────────────────────────────────────
  // Backdrop: fade in/out
  const backdropStyle = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.32s ease",
  };

  // Mobile: slide up from bottom. Desktop: slide in from right.
  // All positioning is in inline styles to guarantee no Tailwind override gap.
  const drawerStyle = mobile
    ? {
        // Mobile — bottom sheet
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "90vh",
        borderRadius: "16px 16px 0 0",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
      }
    : {
        // Desktop — full-height right panel, flush to all edges
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        width: 440,
        maxHeight: "100vh",
        borderRadius: "16px 0 0 16px",
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
      };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/50"
        style={backdropStyle}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div
        className="z-[1000] bg-white shadow-2xl flex flex-col"
        style={drawerStyle}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">Reviews</h2>
            <p className="text-xs text-gray-400">{reviews.length} reviews</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Write a review */}
          <div className="bg-gray-50 rounded-xl p-4">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-between text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PenLine className="w-4 h-4" />
                  Write a review
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <WriteReviewForm
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            )}
            {submitted && (
              <p className="text-xs text-green-600 font-medium mt-2">
                ✓ Review submitted — thank you!
              </p>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {["recent", "favourable", "critical"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors capitalize ${
                  filter === type
                    ? "bg-red-500 text-white border-red-500"
                    : "text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Review list */}
          <div>
            {sorted.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

// ── Main component — compact summary on page ──────────────────────────────────
const PropertyReviews = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openOnForm, setOpenOnForm] = useState(false);

  const average = avg(reviews);
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const openDrawer = (withForm = false) => {
    setOpenOnForm(withForm);
    setDrawerOpen(true);
  };

  const handleAddReview = (data) => {
    setReviews((prev) => [
      { id: prev.length + 1, date: new Date().toISOString(), ...data },
      ...prev,
    ]);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-5">
        {/* Summary header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-0.5">
              Reviews
            </h2>
            <p className="text-xs text-gray-400">{reviews.length} reviews</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 leading-none mb-1">
              {average}
            </p>
            <StarRating value={Math.round(Number(average))} readonly />
          </div>
        </div>

        {/* Rating breakdown bars */}
        <div className="space-y-1.5">
          {ratingCounts.map(({ star, count }) => (
            <RatingBar
              key={star}
              label={star}
              count={count}
              total={reviews.length}
            />
          ))}
        </div>

        {/* Two teaser reviews */}
        <div className="divide-y divide-gray-100">
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="py-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-none">
                      {review.name}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
                <StarRating value={review.rating} readonly />
              </div>
              <p className="text-xs text-gray-500 pl-9 line-clamp-2 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => openDrawer(false)}
            className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-3xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
          >
            See all {reviews.length} reviews
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDrawer(true)}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-3xl transition-colors flex items-center justify-center gap-1.5"
          >
            <PenLine className="w-4 h-4" />
            Write a review
          </button>
        </div>
      </div>

      {drawerOpen && (
        <ReviewsDrawer
          reviews={reviews}
          onClose={() => setDrawerOpen(false)}
          onAddReview={handleAddReview}
          openOnForm={openOnForm}
        />
      )}
    </>
  );
};

export default PropertyReviews;
