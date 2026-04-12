// src/data/propertyTypes.js

/**
 * Property Types with Detailed Information
 */
export const PROPERTY_TYPES_DATA = [
  {
    id: "apartment",
    name: "Apartment",
    description: "Self-contained unit in a multi-story building",
    icon: "FiHome",
    typical_size: "50-150 sqm",
    typical_bedrooms: "1-3",
    typical_rent_range: { min: 20000, max: 100000 },
    features: ["Shared facilities", "Multiple floors", "Urban locations"],
  },
  {
    id: "house",
    name: "House",
    description: "Standalone residential building with private compound",
    icon: "FiHome",
    typical_size: "100-400 sqm",
    typical_bedrooms: "2-5",
    typical_rent_range: { min: 40000, max: 300000 },
    features: ["Private compound", "Garden space", "Parking"],
  },
  {
    id: "bedsitter",
    name: "Bedsitter",
    description: "Single room with attached bathroom and kitchenette",
    icon: "FiKey",
    typical_size: "20-35 sqm",
    typical_bedrooms: "0",
    typical_rent_range: { min: 8000, max: 25000 },
    features: ["Compact living", "Affordable", "Single occupant"],
  },
  {
    id: "studio",
    name: "Studio",
    description: "Open-plan living space with separate bathroom",
    icon: "FiSquare",
    typical_size: "25-45 sqm",
    typical_bedrooms: "0",
    typical_rent_range: { min: 12000, max: 35000 },
    features: ["Open floor plan", "Modern design", "Efficient space"],
  },
  {
    id: "maisonette",
    name: "Maisonette",
    description: "Two-story house with separate entrance",
    icon: "FiLayers",
    typical_size: "120-250 sqm",
    typical_bedrooms: "3-4",
    typical_rent_range: { min: 60000, max: 180000 },
    features: ["Two floors", "Private entrance", "Townhouse style"],
  },
  {
    id: "villa",
    name: "Villa",
    description: "Luxurious standalone property with extensive grounds",
    icon: "FiAward",
    typical_size: "250-600 sqm",
    typical_bedrooms: "4-6",
    typical_rent_range: { min: 150000, max: 500000 },
    features: ["Luxury finishes", "Large compound", "Premium location"],
  },
  {
    id: "townhouse",
    name: "Townhouse",
    description: "Multi-story house in a row of similar properties",
    icon: "FiGrid",
    typical_size: "100-200 sqm",
    typical_bedrooms: "2-4",
    typical_rent_range: { min: 50000, max: 150000 },
    features: ["Shared walls", "Private entrance", "Community amenities"],
  },
  {
    id: "bungalow",
    name: "Bungalow",
    description: "Single-story detached house",
    icon: "FiHome",
    typical_size: "80-200 sqm",
    typical_bedrooms: "2-4",
    typical_rent_range: { min: 35000, max: 120000 },
    features: ["Single level", "Easy access", "Garden space"],
  },
  {
    id: "penthouse",
    name: "Penthouse",
    description: "Luxury apartment on the top floor with premium views",
    icon: "FiStar",
    typical_size: "150-400 sqm",
    typical_bedrooms: "3-5",
    typical_rent_range: { min: 120000, max: 400000 },
    features: ["Top floor", "Panoramic views", "Luxury amenities"],
  },
  {
    id: "duplex",
    name: "Duplex",
    description: "Two-level apartment with internal staircase",
    icon: "FiLayers",
    typical_size: "100-200 sqm",
    typical_bedrooms: "2-4",
    typical_rent_range: { min: 60000, max: 180000 },
    features: ["Two levels", "Internal stairs", "Apartment building"],
  },
  {
    id: "mansion",
    name: "Mansion",
    description: "Very large luxury residence",
    icon: "FiAward",
    typical_size: "400+ sqm",
    typical_bedrooms: "5+",
    typical_rent_range: { min: 250000, max: 1000000 },
    features: ["Extensive space", "Multiple amenities", "Premium features"],
  },
  {
    id: "cottage",
    name: "Cottage",
    description: "Small cozy house, often in suburban or rural setting",
    icon: "FiHome",
    typical_size: "60-120 sqm",
    typical_bedrooms: "1-3",
    typical_rent_range: { min: 25000, max: 80000 },
    features: ["Cozy design", "Quiet location", "Private compound"],
  },
];

/**
 * Get property type by ID
 * @param {string} id - Property type ID
 * @returns {Object|null} Property type object
 */
export const getPropertyTypeById = (id) => {
  return PROPERTY_TYPES_DATA.find((type) => type.id === id) || null;
};

/**
 * Get property types suitable for bedroom count
 * @param {number} bedrooms - Number of bedrooms
 * @returns {Array} Array of suitable property types
 */
export const getPropertyTypesByBedrooms = (bedrooms) => {
  if (bedrooms === 0) {
    return PROPERTY_TYPES_DATA.filter(
      (type) => type.id === "bedsitter" || type.id === "studio",
    );
  }

  return PROPERTY_TYPES_DATA.filter((type) => {
    const range = type.typical_bedrooms.split("-");
    if (range.length === 1) {
      // Bedsitter (0 bedrooms)
      return false;
    }
    const min = parseInt(range[0]);
    const max = range[1].includes("+") ? Infinity : parseInt(range[1]);
    return bedrooms >= min && bedrooms <= max;
  });
};

/**
 * Get property types within price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Array of suitable property types
 */
export const getPropertyTypesByPrice = (minPrice, maxPrice) => {
  return PROPERTY_TYPES_DATA.filter((type) => {
    const typeMin = type.typical_rent_range.min;
    const typeMax = type.typical_rent_range.max;

    return (
      (typeMin >= minPrice && typeMin <= maxPrice) ||
      (typeMax >= minPrice && typeMax <= maxPrice) ||
      (typeMin <= minPrice && typeMax >= maxPrice)
    );
  });
};

/**
 * Get affordable property types (under 30,000 KES)
 * @returns {Array} Array of affordable property types
 */
export const getAffordablePropertyTypes = () => {
  return PROPERTY_TYPES_DATA.filter(
    (type) => type.typical_rent_range.min < 30000,
  );
};

/**
 * Get luxury property types (over 150,000 KES)
 * @returns {Array} Array of luxury property types
 */
export const getLuxuryPropertyTypes = () => {
  return PROPERTY_TYPES_DATA.filter(
    (type) => type.typical_rent_range.min > 150000,
  );
};

/**
 * Get family-friendly property types
 * @returns {Array} Array of family-friendly property types
 */
export const getFamilyFriendlyPropertyTypes = () => {
  return PROPERTY_TYPES_DATA.filter((type) => {
    const range = type.typical_bedrooms.split("-");
    if (range.length === 1) return false;

    const max = range[1].includes("+") ? 5 : parseInt(range[1]);
    return max >= 3;
  });
};

/**
 * Format property type for display
 * @param {string} id - Property type ID
 * @returns {string} Formatted property type name
 */
export const formatPropertyType = (id) => {
  const type = getPropertyTypeById(id);
  return type ? type.name : id;
};

export default {
  PROPERTY_TYPES_DATA,
  getPropertyTypeById,
  getPropertyTypesByBedrooms,
  getPropertyTypesByPrice,
  getAffordablePropertyTypes,
  getLuxuryPropertyTypes,
  getFamilyFriendlyPropertyTypes,
  formatPropertyType,
};
