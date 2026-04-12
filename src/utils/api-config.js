// src/utils/api-config.js

import { API_BASE_URL } from "./constants";

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    VERIFY_EMAIL: "/auth/verify-email",
    VERIFY_PHONE: "/auth/verify-phone",
    RESEND_VERIFICATION: "/auth/resend-verification",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REFRESH_TOKEN: "/auth/refresh-token",
    CURRENT_USER: "/auth/me",
  },

  // Properties
  PROPERTIES: {
    BASE: "/properties",
    SEARCH: "/properties/search",
    FEATURED: "/properties/featured",
    BY_ID: (id) => `/properties/${id}`,
    CREATE: "/properties",
    UPDATE: (id) => `/properties/${id}`,
    DELETE: (id) => `/properties/${id}`,
    UPLOAD_IMAGES: (id) => `/properties/${id}/images`,
    DELETE_IMAGE: (propertyId, imageId) =>
      `/properties/${propertyId}/images/${imageId}`,
    TOGGLE_STATUS: (id) => `/properties/${id}/toggle-status`,
    MY_LISTINGS: "/properties/my-listings",
  },

  // Bookings
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    CREATE: "/bookings",
    UPDATE: (id) => `/bookings/${id}`,
    CANCEL: (id) => `/bookings/${id}/cancel`,
    CONFIRM: (id) => `/bookings/${id}/confirm`,
    REJECT: (id) => `/bookings/${id}/reject`,
    USER_BOOKINGS: "/bookings/my-bookings",
    PROPERTY_BOOKINGS: (propertyId) => `/bookings/property/${propertyId}`,
    CHECK_AVAILABILITY: "/bookings/check-availability",
  },

  // Reviews
  REVIEWS: {
    BASE: "/reviews",
    BY_ID: (id) => `/reviews/${id}`,
    CREATE: "/reviews",
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
    PROPERTY_REVIEWS: (propertyId) => `/reviews/property/${propertyId}`,
    USER_REVIEWS: "/reviews/my-reviews",
    REPLY: (id) => `/reviews/${id}/reply`,
  },

  // Users
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    UPDATE_PASSWORD: "/users/change-password",
    UPLOAD_PHOTO: "/users/profile/photo",
    SETTINGS: "/users/settings",
    DELETE_ACCOUNT: "/users/account",
    BY_ID: (id) => `/users/${id}`,
  },

  // Messages
  MESSAGES: {
    BASE: "/messages",
    CONVERSATIONS: "/messages/conversations",
    CONVERSATION: (conversationId) =>
      `/messages/conversations/${conversationId}`,
    SEND: "/messages/send",
    MARK_READ: (messageId) => `/messages/${messageId}/read`,
    DELETE_CONVERSATION: (conversationId) =>
      `/messages/conversations/${conversationId}`,
  },

  // Payments (M-Pesa)
  PAYMENTS: {
    INITIATE_MPESA: "/payments/mpesa/initiate",
    VERIFY_PAYMENT: (transactionId) => `/payments/${transactionId}/verify`,
    PAYMENT_HISTORY: "/payments/history",
    PAYMENT_BY_ID: (id) => `/payments/${id}`,
  },

  // Favorites/Saved Properties
  FAVORITES: {
    BASE: "/favorites",
    ADD: "/favorites/add",
    REMOVE: (propertyId) => `/favorites/${propertyId}`,
    MY_FAVORITES: "/favorites/my-favorites",
    CHECK: (propertyId) => `/favorites/check/${propertyId}`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: "/notifications",
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    DELETE: (id) => `/notifications/${id}`,
    UNREAD_COUNT: "/notifications/unread-count",
  },

  // Analytics (for landlords)
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    EARNINGS: "/analytics/earnings",
    OCCUPANCY: "/analytics/occupancy",
    PROPERTY_PERFORMANCE: (propertyId) => `/analytics/property/${propertyId}`,
  },

  // Location/Search
  LOCATION: {
    SEARCH_LOCATIONS: "/location/search",
    POPULAR_DESTINATIONS: "/location/popular",
    NEARBY: "/location/nearby",
  },

  // Admin (for future use)
  ADMIN: {
    USERS: "/admin/users",
    PROPERTIES: "/admin/properties",
    BOOKINGS: "/admin/bookings",
    REPORTS: "/admin/reports",
    VERIFY_PROPERTY: (id) => `/admin/properties/${id}/verify`,
    BAN_USER: (id) => `/admin/users/${id}/ban`,
  },
};

/**
 * Build query string from params object
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
export const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, value);
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Build full URL with query parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} Full URL
 */
export const buildUrl = (endpoint, params = {}) => {
  const queryString = buildQueryString(params);
  return `${endpoint}${queryString}`;
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

/**
 * Response Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Error Messages
 */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT: "Request timeout. Please try again.",
  UNAUTHORIZED: "You are not authorized. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

/**
 * Get error message from response
 * @param {Object} error - Error object
 * @returns {string} Error message
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;

    if (data && data.message) {
      return data.message;
    }

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return data?.error || API_ERROR_MESSAGES.VALIDATION_ERROR;
      case HTTP_STATUS.UNAUTHORIZED:
        return API_ERROR_MESSAGES.UNAUTHORIZED;
      case HTTP_STATUS.FORBIDDEN:
        return API_ERROR_MESSAGES.FORBIDDEN;
      case HTTP_STATUS.NOT_FOUND:
        return API_ERROR_MESSAGES.NOT_FOUND;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return API_ERROR_MESSAGES.SERVER_ERROR;
      default:
        return API_ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  } else if (error.request) {
    // Request made but no response
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  } else if (error.code === "ECONNABORTED") {
    // Request timeout
    return API_ERROR_MESSAGES.TIMEOUT;
  }

  return error.message || API_ERROR_MESSAGES.UNKNOWN_ERROR;
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  buildQueryString,
  buildUrl,
  HTTP_METHODS,
  HTTP_STATUS,
  API_ERROR_MESSAGES,
  getErrorMessage,
};
