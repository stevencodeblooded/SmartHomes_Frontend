import React, { useState } from "react";
import { Star, User } from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "James Mwangi",
    date: "March 2025",
    rating: 5,
    comment:
      "Great apartment, very clean and the landlord was responsive. Water and electricity were reliable throughout my stay. Would highly recommend.",
  },
  {
    id: 2,
    name: "Aisha Kamau",
    date: "January 2025",
    rating: 4,
    comment:
      "Good location, close to the main road. The unit was as described. Only issue was parking space was a bit tight.",
  },
  {
    id: 3,
    name: "Brian Otieno",
    date: "November 2024",
    rating: 4,
    comment:
      "Quiet neighborhood, neighbors are friendly. The apartment itself is spacious and well maintained.",
  },
  {
    id: 4,
    name: "Grace Wanjiku",
    date: "September 2024",
    rating: 3,
    comment:
      "Decent place for the price. A few maintenance issues at the start but the landlord sorted them out quickly.",
  },
  {
    id: 5,
    name: "Kevin Njoroge",
    date: "July 2024",
    rating: 5,
    comment:
      "Loved living here. Security is excellent and the compound is always clean. Will look here first when I need a place again.",
  },
];

const StarRating = ({ value, onChange, readonly = false }) => {
  const [hovered, setHovered] = useState(null);

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
            className="w-4 h-4"
            fill={(hovered ?? value) >= star ? "#ef4444" : "none"}
            stroke={(hovered ?? value) >= star ? "#ef4444" : "#d1d5db"}
          />
        </button>
      ))}
    </div>
  );
};

const average = (reviews) =>
  reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

const RatingBar = ({ label, count, total }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] text-gray-500 w-5">{label}★</span>
    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-400"
        style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
      />
    </div>
    <span className="text-[10px] text-gray-400 w-3">{count}</span>
  </div>
);

const PropertyReviews = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [filter, setFilter] = useState("recent");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avg = average(reviews);

  // Sorting logic
  const sortedReviews = [...reviews].sort((a, b) => {
    if (filter === "recent") return new Date(b.date) - new Date(a.date);
    if (filter === "critical") return a.rating - b.rating;
    if (filter === "favourable") return b.rating - a.rating;
    return 0;
  });

  const visible = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim() || !name.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      name,
      date: new Date().toISOString(),
      rating,
      comment,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
    setName("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Reviews</h2>
          <p className="text-xs text-gray-400">{reviews.length} reviews</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold">{avg}</div>
          <StarRating value={Math.round(avg)} readonly />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["recent", "critical", "favourable"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`text-xs px-3 py-1 rounded-full border ${
              filter === type
                ? "bg-red-500 text-white border-red-500"
                : "text-gray-500 border-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Breakdown toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="text-xs text-gray-400"
      >
        {showBreakdown ? "Hide breakdown" : "Show breakdown"}
      </button>

      {showBreakdown && (
        <div className="space-y-1">
          {ratingCounts.map(({ star, count }) => (
            <RatingBar
              key={star}
              label={star}
              count={count}
              total={reviews.length}
            />
          ))}
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-3">
        {visible.map((review) => (
          <div key={review.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                  <User className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <StarRating value={review.rating} readonly />
            </div>

            <p className="text-sm text-gray-600 pl-9 line-clamp-2">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show more */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-red-500"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      )}

      {/* Success message */}
      {submitted && (
        <div className="text-xs text-green-600">
          Review submitted successfully
        </div>
      )}

      {/* Write review */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full text-sm py-2 bg-red-500 text-white rounded-lg"
        >
          Write a review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />

          <StarRating value={rating} onChange={setRating} />

          <textarea
            rows={2}
            placeholder="Your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
          />

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyReviews;
