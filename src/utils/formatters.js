// src/utils/formatters.js

import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";
import { DATE_FORMATS } from "./constants";

/**
 * Format a number as Kenyan Shillings (KES)
 * @param {number} amount - The amount to format
 * @param {boolean} includeDecimals - Whether to include decimal places
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, includeDecimals = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "KES 0";
  }

  const formatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });

  return formatter.format(amount).replace("KES", "KES ");
};

/**
 * Format currency without the KES symbol (just the number with commas)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0";
  }

  return new Intl.NumberFormat("en-KE").format(amount);
};

/**
 * Format a date for display
 * @param {string|Date} date - The date to format
 * @param {string} formatString - The format string (default: 'dd MMM yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatString = DATE_FORMATS.DISPLAY) => {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(dateObj)) {
      return "";
    }

    return format(dateObj, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

/**
 * Format a Kenyan phone number
 * @param {string} phone - The phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Handle different Kenyan phone number formats
  if (cleaned.startsWith("254")) {
    // +254 format
    const match = cleaned.match(/^(254)(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
  } else if (cleaned.startsWith("0")) {
    // 0xxx format
    const match = cleaned.match(/^(0\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
  }

  return phone;
};

/**
 * Format an address object into a string
 * @param {Object} addressObject - The address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (addressObject) => {
  if (!addressObject) return "";

  const parts = [
    addressObject.street,
    addressObject.neighborhood,
    addressObject.city,
    addressObject.county,
  ].filter(Boolean);

  return parts.join(", ");
};

/**
 * Format a full address with country
 * @param {Object} addressObject - The address object
 * @returns {string} Formatted full address string
 */
export const formatFullAddress = (addressObject) => {
  if (!addressObject) return "";

  const baseAddress = formatAddress(addressObject);
  return baseAddress ? `${baseAddress}, Kenya` : "";
};

/**
 * Truncate text to a maximum length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(dateObj)) {
      return "";
    }

    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "";
  }
};

/**
 * Format property size
 * @param {number} size - Size in square meters
 * @returns {string} Formatted size string
 */
export const formatPropertySize = (size) => {
  if (!size) return "";
  return `${formatNumber(size)} m²`;
};

/**
 * Format rating with one decimal place
 * @param {number} rating - The rating value
 * @returns {string} Formatted rating
 */
export const formatRating = (rating) => {
  if (!rating) return "0.0";
  return rating.toFixed(1);
};

/**
 * Format review count (e.g., "45 reviews" or "1 review")
 * @param {number} count - Number of reviews
 * @returns {string} Formatted review count
 */
export const formatReviewCount = (count) => {
  if (!count || count === 0) return "No reviews";
  if (count === 1) return "1 review";
  return `${formatNumber(count)} reviews`;
};

/**
 * Format guest count (e.g., "2 guests" or "1 guest")
 * @param {number} count - Number of guests
 * @returns {string} Formatted guest count
 */
export const formatGuestCount = (count) => {
  if (!count || count === 0) return "0 guests";
  if (count === 1) return "1 guest";
  return `${count} guests`;
};

/**
 * Format bedroom count (e.g., "2 bedrooms" or "1 bedroom")
 * @param {number} count - Number of bedrooms
 * @returns {string} Formatted bedroom count
 */
export const formatBedroomCount = (count) => {
  if (!count || count === 0) return "Studio";
  if (count === 1) return "1 bedroom";
  return `${count} bedrooms`;
};

/**
 * Format bathroom count (e.g., "2 bathrooms" or "1 bathroom")
 * @param {number} count - Number of bathrooms
 * @returns {string} Formatted bathroom count
 */
export const formatBathroomCount = (count) => {
  if (!count || count === 0) return "0 bathrooms";
  if (count === 1) return "1 bathroom";
  return `${count} bathrooms`;
};

/**
 * Format property listing count
 * @param {number} count - Number of listings
 * @returns {string} Formatted listing count
 */
export const formatListingCount = (count) => {
  if (!count || count === 0) return "No properties";
  if (count === 1) return "1 property";
  return `${formatNumber(count)} properties`;
};

/**
 * Format percentage
 * @param {number} value - The percentage value (0-100)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value) => {
  if (!value && value !== 0) return "0%";
  return `${Math.round(value)}%`;
};

/**
 * Format duration in nights
 * @param {number} nights - Number of nights
 * @returns {string} Formatted duration
 */
export const formatNights = (nights) => {
  if (!nights || nights === 0) return "0 nights";
  if (nights === 1) return "1 night";
  return `${nights} nights`;
};

/**
 * Format duration in months
 * @param {number} months - Number of months
 * @returns {string} Formatted duration
 */
export const formatMonths = (months) => {
  if (!months || months === 0) return "0 months";
  if (months === 1) return "1 month";
  return `${months} months`;
};

/**
 * Format price per unit (night or month)
 * @param {number} price - The price
 * @param {string} unit - The unit ('night' or 'month')
 * @returns {string} Formatted price per unit
 */
export const formatPricePerUnit = (price, unit = "night") => {
  return `${formatCurrency(price)} / ${unit}`;
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Format booking reference (e.g., BK-2024-001234)
 * @param {string} id - The booking ID
 * @returns {string} Formatted booking reference
 */
export const formatBookingReference = (id) => {
  if (!id) return "";

  const year = new Date().getFullYear();
  const paddedId = String(id).padStart(6, "0");

  return `BK-${year}-${paddedId}`;
};

/**
 * Format time range (e.g., "2:00 PM - 5:00 PM")
 * @param {string} startTime - Start time
 * @param {string} endTime - End time
 * @returns {string} Formatted time range
 */
export const formatTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return "";
  return `${startTime} - ${endTime}`;
};

/**
 * Format occupancy rate
 * @param {number} bookedNights - Number of booked nights
 * @param {number} totalNights - Total available nights
 * @returns {string} Formatted occupancy rate
 */
export const formatOccupancyRate = (bookedNights, totalNights) => {
  if (!totalNights || totalNights === 0) return "0%";

  const rate = (bookedNights / totalNights) * 100;
  return formatPercentage(rate);
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format amenity name (replace underscores with spaces and capitalize)
 * @param {string} amenity - Amenity value
 * @returns {string} Formatted amenity name
 */
export const formatAmenityName = (amenity) => {
  if (!amenity) return "";

  return amenity
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format response rate
 * @param {number} rate - Response rate (0-100)
 * @returns {string} Formatted response rate
 */
export const formatResponseRate = (rate) => {
  if (!rate && rate !== 0) return "N/A";
  return formatPercentage(rate);
};

/**
 * Format date range for display
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = formatDate(startDate, "dd MMM");
  const end = formatDate(endDate, "dd MMM yyyy");

  return `${start} - ${end}`;
};

export default {
  formatCurrency,
  formatNumber,
  formatDate,
  formatPhoneNumber,
  formatAddress,
  formatFullAddress,
  truncateText,
  formatRelativeTime,
  formatPropertySize,
  formatRating,
  formatReviewCount,
  formatGuestCount,
  formatBedroomCount,
  formatBathroomCount,
  formatListingCount,
  formatPercentage,
  formatNights,
  formatMonths,
  formatPricePerUnit,
  formatFileSize,
  formatBookingReference,
  formatTimeRange,
  formatOccupancyRate,
  capitalizeWords,
  formatAmenityName,
  formatResponseRate,
  formatDateRange,
};
