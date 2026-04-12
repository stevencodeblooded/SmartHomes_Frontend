// src/utils/helpers.js

import {
  differenceInDays,
  differenceInMonths,
  parseISO,
  isWithinInterval,
} from "date-fns";
import { SERVICE_FEE_PERCENTAGE } from "./constants";

/**
 * Calculate number of nights between check-in and check-out
 * @param {string|Date} checkIn - Check-in date
 * @param {string|Date} checkOut - Check-out date
 * @returns {number} Number of nights
 */
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const checkInDate = typeof checkIn === "string" ? parseISO(checkIn) : checkIn;
  const checkOutDate =
    typeof checkOut === "string" ? parseISO(checkOut) : checkOut;

  return differenceInDays(checkOutDate, checkInDate);
};

/**
 * Calculate number of months between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of months
 */
export const calculateMonths = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;

  return differenceInMonths(end, start);
};

/**
 * Calculate total price for a booking
 * @param {number} basePrice - Base price per night/month
 * @param {number} units - Number of nights or months
 * @param {number} serviceFeePercentage - Service fee percentage
 * @param {number} cleaningFee - Optional cleaning fee
 * @returns {Object} Price breakdown
 */
export const calculateTotalPrice = (
  basePrice,
  units,
  serviceFeePercentage = SERVICE_FEE_PERCENTAGE,
  cleaningFee = 0,
) => {
  const subtotal = basePrice * units;
  const serviceFee = (subtotal * serviceFeePercentage) / 100;
  const total = subtotal + serviceFee + cleaningFee;

  return {
    subtotal,
    serviceFee,
    cleaningFee,
    total,
  };
};

/**
 * Check if a date is available based on availability array
 * @param {string|Date} date - Date to check
 * @param {Array} availability - Array of available date ranges or blocked dates
 * @returns {boolean} Whether the date is available
 */
export const isDateAvailable = (date, availability = []) => {
  if (!date || !availability || availability.length === 0) return true;

  const checkDate = typeof date === "string" ? parseISO(date) : date;

  // Check if date is in any blocked range
  for (const range of availability) {
    if (range.blocked) {
      const start = parseISO(range.start);
      const end = parseISO(range.end);

      if (isWithinInterval(checkDate, { start, end })) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Get the main image from a property's images array
 * @param {Array} images - Array of image objects or URLs
 * @returns {string} Main image URL
 */
export const getPropertyMainImage = (images = []) => {
  if (!images || images.length === 0) {
    return "/assets/images/placeholder-property.jpg";
  }

  // If images are objects with a 'main' flag
  const mainImage = images.find((img) => img.isMain || img.main);
  if (mainImage) {
    return typeof mainImage === "string" ? mainImage : mainImage.url;
  }

  // Otherwise return first image
  const firstImage = images[0];
  return typeof firstImage === "string" ? firstImage : firstImage.url;
};

/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - Title to convert to slug
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (title) => {
  if (!title) return "";

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Sort properties by price
 * @param {Array} properties - Array of property objects
 * @param {string} order - 'asc' or 'desc'
 * @param {string} priceType - 'night' or 'month'
 * @returns {Array} Sorted properties
 */
export const sortByPrice = (properties, order = "asc", priceType = "night") => {
  if (!properties || properties.length === 0) return [];

  return [...properties].sort((a, b) => {
    const priceA = a.price?.[priceType] || 0;
    const priceB = b.price?.[priceType] || 0;

    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
};

/**
 * Sort properties by rating
 * @param {Array} properties - Array of property objects
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted properties
 */
export const sortByRating = (properties, order = "desc") => {
  if (!properties || properties.length === 0) return [];

  return [...properties].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;

    return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
  });
};

/**
 * Sort properties by date created
 * @param {Array} properties - Array of property objects
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted properties
 */
export const sortByDate = (properties, order = "desc") => {
  if (!properties || properties.length === 0) return [];

  return [...properties].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Filter properties by amenities
 * @param {Array} properties - Array of property objects
 * @param {Array} selectedAmenities - Array of amenity values to filter by
 * @returns {Array} Filtered properties
 */
export const filterByAmenities = (properties, selectedAmenities = []) => {
  if (!properties || properties.length === 0) return [];
  if (!selectedAmenities || selectedAmenities.length === 0) return properties;

  return properties.filter((property) => {
    const propertyAmenities = property.amenities || [];
    return selectedAmenities.every((amenity) =>
      propertyAmenities.includes(amenity),
    );
  });
};

/**
 * Filter properties by price range
 * @param {Array} properties - Array of property objects
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @param {string} priceType - 'night' or 'month'
 * @returns {Array} Filtered properties
 */
export const filterByPriceRange = (
  properties,
  minPrice,
  maxPrice,
  priceType = "night",
) => {
  if (!properties || properties.length === 0) return [];

  return properties.filter((property) => {
    const price = property.price?.[priceType] || 0;

    if (minPrice !== null && minPrice !== undefined && price < minPrice) {
      return false;
    }

    if (maxPrice !== null && maxPrice !== undefined && price > maxPrice) {
      return false;
    }

    return true;
  });
};

/**
 * Filter properties by bedroom count
 * @param {Array} properties - Array of property objects
 * @param {number} bedrooms - Number of bedrooms
 * @returns {Array} Filtered properties
 */
export const filterByBedrooms = (properties, bedrooms) => {
  if (!properties || properties.length === 0) return [];
  if (bedrooms === null || bedrooms === undefined) return properties;

  return properties.filter((property) => {
    if (bedrooms === 5) {
      // 5+ bedrooms
      return property.bedrooms >= 5;
    }
    return property.bedrooms === bedrooms;
  });
};

/**
 * Filter properties by location
 * @param {Array} properties - Array of property objects
 * @param {string} location - Location to filter by (city or neighborhood)
 * @returns {Array} Filtered properties
 */
export const filterByLocation = (properties, location) => {
  if (!properties || properties.length === 0) return [];
  if (!location) return properties;

  const searchTerm = location.toLowerCase();

  return properties.filter((property) => {
    const city = (property.location?.city || "").toLowerCase();
    const neighborhood = (property.location?.neighborhood || "").toLowerCase();

    return city.includes(searchTerm) || neighborhood.includes(searchTerm);
  });
};

/**
 * Calculate average rating from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {number} Average rating
 */
export const calculateAverageRating = (reviews = []) => {
  if (!reviews || reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return sum / reviews.length;
};

/**
 * Calculate category ratings average
 * @param {Array} reviews - Array of review objects with categoryRatings
 * @returns {Object} Average ratings by category
 */
export const calculateCategoryRatings = (reviews = []) => {
  if (!reviews || reviews.length === 0) {
    return {
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      value: 0,
      checkin: 0,
    };
  }

  const categories = [
    "cleanliness",
    "accuracy",
    "communication",
    "location",
    "value",
    "checkin",
  ];
  const averages = {};

  categories.forEach((category) => {
    const ratings = reviews
      .map((review) => review.categoryRatings?.[category])
      .filter((rating) => rating !== null && rating !== undefined);

    averages[category] =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;
  });

  return averages;
};

/**
 * Group properties by location
 * @param {Array} properties - Array of property objects
 * @returns {Object} Properties grouped by city
 */
export const groupByLocation = (properties) => {
  if (!properties || properties.length === 0) return {};

  return properties.reduce((grouped, property) => {
    const city = property.location?.city || "Other";

    if (!grouped[city]) {
      grouped[city] = [];
    }

    grouped[city].push(property);
    return grouped;
  }, {});
};

/**
 * Search properties by query string
 * @param {Array} properties - Array of property objects
 * @param {string} query - Search query
 * @returns {Array} Filtered properties
 */
export const searchProperties = (properties, query) => {
  if (!properties || properties.length === 0) return [];
  if (!query || query.trim() === "") return properties;

  const searchTerm = query.toLowerCase().trim();

  return properties.filter((property) => {
    const title = (property.title || "").toLowerCase();
    const description = (property.description || "").toLowerCase();
    const city = (property.location?.city || "").toLowerCase();
    const neighborhood = (property.location?.neighborhood || "").toLowerCase();
    const propertyType = (property.propertyType || "").toLowerCase();

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      city.includes(searchTerm) ||
      neighborhood.includes(searchTerm) ||
      propertyType.includes(searchTerm)
    );
  });
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get coordinates from address (placeholder - would integrate with geocoding API)
 * @param {string} address - Address string
 * @returns {Object} Coordinates {lat, lng}
 */
export const getCoordinatesFromAddress = async (address) => {
  // Placeholder - in production would use Google Maps Geocoding API or similar
  // For now, return default Nairobi coordinates
  return {
    lat: -1.2921,
    lng: 36.8219,
  };
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

/**
 * Convert degrees to radians
 * @param {number} degrees - Degrees value
 * @returns {number} Radians value
 */
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Paginate an array
 * @param {Array} items - Array to paginate
 * @param {number} page - Current page (1-indexed)
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Paginated result
 */
export const paginate = (items, page = 1, itemsPerPage = 12) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Generate an array of page numbers for pagination
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxButtons - Maximum pagination buttons to show
 * @returns {Array} Array of page numbers
 */
export const getPaginationRange = (currentPage, totalPages, maxButtons = 5) => {
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfButtons = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - halfButtons);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
};

/**
 * Generate a random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} Whether object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Format Kenyan phone number for M-Pesa (254 format)
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneForMpesa = (phone) => {
  if (!phone) return "";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("254")) {
    return cleaned;
  }

  if (cleaned.startsWith("0")) {
    return "254" + cleaned.substring(1);
  }

  return "254" + cleaned;
};

export default {
  calculateNights,
  calculateMonths,
  calculateTotalPrice,
  isDateAvailable,
  getPropertyMainImage,
  generateSlug,
  sortByPrice,
  sortByRating,
  sortByDate,
  filterByAmenities,
  filterByPriceRange,
  filterByBedrooms,
  filterByLocation,
  calculateAverageRating,
  calculateCategoryRatings,
  groupByLocation,
  searchProperties,
  debounce,
  getCoordinatesFromAddress,
  calculateDistance,
  paginate,
  getPaginationRange,
  generateId,
  deepClone,
  isEmpty,
  formatPhoneForMpesa,
};
