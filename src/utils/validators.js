// src/utils/validators.js

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate Kenyan phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Kenyan phone number patterns:
  // 0712345678 (10 digits starting with 0)
  // 254712345678 (12 digits starting with 254)
  // +254712345678 (with +)

  const kenyanMobileRegex = /^(254|0)(7|1)\d{8}$/;

  if (!kenyanMobileRegex.test(cleaned)) {
    return {
      isValid: false,
      error:
        "Please enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678)",
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, error: string, strength: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: "Password is required", strength: "none" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
      strength: "weak",
    };
  }

  // Check password strength
  let strength = "weak";
  let strengthScore = 0;

  if (password.length >= 8) strengthScore++;
  if (password.length >= 12) strengthScore++;
  if (/[a-z]/.test(password)) strengthScore++;
  if (/[A-Z]/.test(password)) strengthScore++;
  if (/[0-9]/.test(password)) strengthScore++;
  if (/[^a-zA-Z0-9]/.test(password)) strengthScore++;

  if (strengthScore >= 5) {
    strength = "strong";
  } else if (strengthScore >= 3) {
    strength = "medium";
  }

  // Require at least medium strength
  if (strengthScore < 3) {
    return {
      isValid: false,
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      strength,
    };
  }

  return { isValid: true, error: "", strength };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (typeof value === "string" && value.trim() === "") {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateMinLength = (
  value,
  minLength,
  fieldName = "This field",
) => {
  if (!value) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters long`,
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateMaxLength = (
  value,
  maxLength,
  fieldName = "This field",
) => {
  if (!value) {
    return { isValid: true, error: "" };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`,
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePriceRange = (min, max) => {
  if (min !== null && min !== undefined && min < 0) {
    return { isValid: false, error: "Minimum price cannot be negative" };
  }

  if (max !== null && max !== undefined && max < 0) {
    return { isValid: false, error: "Maximum price cannot be negative" };
  }

  if (min !== null && max !== null && min > max) {
    return {
      isValid: false,
      error: "Minimum price cannot be greater than maximum price",
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate date range
 * @param {Date|string} checkIn - Check-in date
 * @param {Date|string} checkOut - Check-out date
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateDateRange = (checkIn, checkOut) => {
  if (!checkIn) {
    return { isValid: false, error: "Check-in date is required" };
  }

  if (!checkOut) {
    return { isValid: false, error: "Check-out date is required" };
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    return { isValid: false, error: "Check-in date cannot be in the past" };
  }

  if (checkOutDate <= checkInDate) {
    return {
      isValid: false,
      error: "Check-out date must be after check-in date",
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate move-in date
 * @param {Date|string} moveInDate - Move-in date
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateMoveInDate = (moveInDate) => {
  if (!moveInDate) {
    return { isValid: false, error: "Move-in date is required" };
  }

  const moveIn = new Date(moveInDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (moveIn < today) {
    return { isValid: false, error: "Move-in date cannot be in the past" };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateNumberRange = (value, min, max, fieldName = "Value") => {
  if (value === null || value === undefined) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (isNaN(value)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }

  if (value < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (value > max) {
    return { isValid: false, error: `${fieldName} must not exceed ${max}` };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateFileType = (
  file,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
) => {
  if (!file) {
    return { isValid: false, error: "File is required" };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type not supported. Allowed types: ${allowedTypes
        .map((t) => t.split("/")[1])
        .join(", ")}`,
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateFileSize = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file) {
    return { isValid: false, error: "File is required" };
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File size must not exceed ${maxSizeMB}MB`,
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateUrl = (url) => {
  if (!url) {
    return { isValid: false, error: "URL is required" };
  }

  try {
    new URL(url);
    return { isValid: true, error: "" };
  } catch (error) {
    return { isValid: false, error: "Please enter a valid URL" };
  }
};

/**
 * Validate property title
 * @param {string} title - Property title to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePropertyTitle = (title) => {
  const requiredValidation = validateRequired(title, "Property title");
  if (!requiredValidation.isValid) return requiredValidation;

  const minLengthValidation = validateMinLength(title, 10, "Property title");
  if (!minLengthValidation.isValid) return minLengthValidation;

  const maxLengthValidation = validateMaxLength(title, 100, "Property title");
  if (!maxLengthValidation.isValid) return maxLengthValidation;

  return { isValid: true, error: "" };
};

/**
 * Validate property description
 * @param {string} description - Property description to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePropertyDescription = (description) => {
  const requiredValidation = validateRequired(
    description,
    "Property description",
  );
  if (!requiredValidation.isValid) return requiredValidation;

  const minLengthValidation = validateMinLength(
    description,
    50,
    "Property description",
  );
  if (!minLengthValidation.isValid) return minLengthValidation;

  const maxLengthValidation = validateMaxLength(
    description,
    2000,
    "Property description",
  );
  if (!maxLengthValidation.isValid) return maxLengthValidation;

  return { isValid: true, error: "" };
};

/**
 * Validate M-Pesa phone number
 * @param {string} phone - M-Pesa phone number to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateMpesaPhone = (phone) => {
  const phoneValidation = validatePhone(phone);
  if (!phoneValidation.isValid) return phoneValidation;

  const cleaned = phone.replace(/\D/g, "");

  // M-Pesa is only available on Safaricom (07xx) numbers
  if (!cleaned.match(/^(254|0)7\d{8}$/)) {
    return {
      isValid: false,
      error: "M-Pesa is only available on Safaricom numbers (07xxxxxxxx)",
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate rating value
 * @param {number} rating - Rating to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateRating = (rating) => {
  return validateNumberRange(rating, 1, 5, "Rating");
};

/**
 * Validate review text
 * @param {string} reviewText - Review text to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateReviewText = (reviewText) => {
  const requiredValidation = validateRequired(reviewText, "Review");
  if (!requiredValidation.isValid) return requiredValidation;

  const minLengthValidation = validateMinLength(reviewText, 20, "Review");
  if (!minLengthValidation.isValid) return minLengthValidation;

  const maxLengthValidation = validateMaxLength(reviewText, 1000, "Review");
  if (!maxLengthValidation.isValid) return maxLengthValidation;

  return { isValid: true, error: "" };
};

/**
 * Validate form with multiple fields
 * @param {Object} formData - Object with field names as keys and values
 * @param {Object} validationRules - Object with field names as keys and validation functions as values
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach((fieldName) => {
    const validationFunction = validationRules[fieldName];
    const fieldValue = formData[fieldName];

    const result = validationFunction(fieldValue);

    if (!result.isValid) {
      errors[fieldName] = result.error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validatePasswordConfirmation,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePriceRange,
  validateDateRange,
  validateMoveInDate,
  validateNumberRange,
  validateFileType,
  validateFileSize,
  validateUrl,
  validatePropertyTitle,
  validatePropertyDescription,
  validateMpesaPhone,
  validateRating,
  validateReviewText,
  validateForm,
};
