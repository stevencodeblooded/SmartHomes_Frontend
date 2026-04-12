// src/data/amenities.js

/**
 * All Available Amenities Organized by Category
 */
export const AMENITIES_DATA = {
  basic: [
    {
      id: "wifi",
      name: "Wi-Fi",
      icon: "FiWifi",
      description: "High-speed internet connection",
      category: "basic",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: "FiHome",
      description: "Fully equipped kitchen",
      category: "basic",
    },
    {
      id: "tv",
      name: "TV",
      icon: "FiMonitor",
      description: "Television with cable/satellite",
      category: "basic",
    },
    {
      id: "washer",
      name: "Washing Machine",
      icon: "FiDroplet",
      description: "In-unit washing machine",
      category: "basic",
    },
    {
      id: "ac",
      name: "Air Conditioning",
      icon: "FiWind",
      description: "Air conditioning system",
      category: "basic",
    },
    {
      id: "heating",
      name: "Heating",
      icon: "FiSun",
      description: "Central or room heating",
      category: "basic",
    },
    {
      id: "hot_water",
      name: "Hot Water",
      icon: "FiDroplet",
      description: "24/7 hot water supply",
      category: "basic",
    },
    {
      id: "refrigerator",
      name: "Refrigerator",
      icon: "FiBox",
      description: "Full-size refrigerator",
      category: "basic",
    },
    {
      id: "microwave",
      name: "Microwave",
      icon: "FiBox",
      description: "Microwave oven",
      category: "basic",
    },
    {
      id: "dishwasher",
      name: "Dishwasher",
      icon: "FiDroplet",
      description: "Built-in dishwasher",
      category: "basic",
    },
  ],

  facilities: [
    {
      id: "parking",
      name: "Parking",
      icon: "FiTruck",
      description: "Dedicated parking space",
      category: "facilities",
    },
    {
      id: "gym",
      name: "Gym",
      icon: "FiActivity",
      description: "Fitness center/gym",
      category: "facilities",
    },
    {
      id: "pool",
      name: "Swimming Pool",
      icon: "FiDroplet",
      description: "Swimming pool access",
      category: "facilities",
    },
    {
      id: "balcony",
      name: "Balcony",
      icon: "FiHome",
      description: "Private balcony or terrace",
      category: "facilities",
    },
    {
      id: "garden",
      name: "Garden",
      icon: "FiSun",
      description: "Private or shared garden",
      category: "facilities",
    },
    {
      id: "elevator",
      name: "Elevator",
      icon: "FiArrowUp",
      description: "Building elevator",
      category: "facilities",
    },
    {
      id: "laundry",
      name: "Laundry Room",
      icon: "FiDroplet",
      description: "Shared laundry facilities",
      category: "facilities",
    },
    {
      id: "playground",
      name: "Playground",
      icon: "FiSmile",
      description: "Children's play area",
      category: "facilities",
    },
    {
      id: "bbq",
      name: "BBQ Area",
      icon: "FiSun",
      description: "Barbecue/outdoor cooking area",
      category: "facilities",
    },
    {
      id: "clubhouse",
      name: "Clubhouse",
      icon: "FiHome",
      description: "Community clubhouse",
      category: "facilities",
    },
  ],

  kenyan_specific: [
    {
      id: "generator",
      name: "Generator/Backup Power",
      icon: "FiZap",
      description: "Backup power generator",
      category: "kenyan_specific",
      essential: true,
    },
    {
      id: "borehole",
      name: "Borehole/Water Tank",
      icon: "FiDroplet",
      description: "Independent water supply",
      category: "kenyan_specific",
      essential: true,
    },
    {
      id: "security_guard",
      name: "Security Guard",
      icon: "FiShield",
      description: "24/7 security personnel",
      category: "kenyan_specific",
      essential: true,
    },
    {
      id: "electric_fence",
      name: "Electric Fence",
      icon: "FiShield",
      description: "Perimeter electric fence",
      category: "kenyan_specific",
    },
    {
      id: "cctv",
      name: "CCTV Cameras",
      icon: "FiVideo",
      description: "Security camera surveillance",
      category: "kenyan_specific",
      essential: true,
    },
    {
      id: "perimeter_wall",
      name: "Perimeter Wall",
      icon: "FiShield",
      description: "Fenced compound",
      category: "kenyan_specific",
    },
    {
      id: "gated_community",
      name: "Gated Community",
      icon: "FiLock",
      description: "Controlled access estate",
      category: "kenyan_specific",
    },
    {
      id: "backup_water",
      name: "Backup Water Supply",
      icon: "FiDroplet",
      description: "Water storage tanks",
      category: "kenyan_specific",
      essential: true,
    },
    {
      id: "solar_water_heater",
      name: "Solar Water Heater",
      icon: "FiSun",
      description: "Solar-powered hot water",
      category: "kenyan_specific",
    },
    {
      id: "dsq",
      name: "DSQ (Staff Quarters)",
      icon: "FiHome",
      description: "Domestic staff quarters",
      category: "kenyan_specific",
    },
    {
      id: "garbage_collection",
      name: "Garbage Collection",
      icon: "FiTrash",
      description: "Regular waste management",
      category: "kenyan_specific",
    },
    {
      id: "caretaker",
      name: "Caretaker on Site",
      icon: "FiUser",
      description: "On-site property manager",
      category: "kenyan_specific",
    },
    {
      id: "water_heater",
      name: "Water Heater",
      icon: "FiDroplet",
      description: "Electric or gas water heater",
      category: "kenyan_specific",
    },
  ],

  safety: [
    {
      id: "smoke_detector",
      name: "Smoke Detector",
      icon: "FiAlertCircle",
      description: "Smoke alarm system",
      category: "safety",
    },
    {
      id: "fire_extinguisher",
      name: "Fire Extinguisher",
      icon: "FiAlertTriangle",
      description: "Fire safety equipment",
      category: "safety",
    },
    {
      id: "first_aid",
      name: "First Aid Kit",
      icon: "FiHeart",
      description: "Medical first aid supplies",
      category: "safety",
    },
    {
      id: "carbon_monoxide",
      name: "Carbon Monoxide Detector",
      icon: "FiAlertCircle",
      description: "CO detector",
      category: "safety",
    },
    {
      id: "security_door",
      name: "Security Door",
      icon: "FiLock",
      description: "Reinforced security door",
      category: "safety",
    },
    {
      id: "window_guards",
      name: "Window Guards",
      icon: "FiShield",
      description: "Burglar-proof windows",
      category: "safety",
    },
  ],

  other: [
    {
      id: "pet_friendly",
      name: "Pet Friendly",
      icon: "FiHeart",
      description: "Pets allowed",
      category: "other",
    },
    {
      id: "furnished",
      name: "Furnished",
      icon: "FiHome",
      description: "Fully furnished property",
      category: "other",
    },
    {
      id: "semi_furnished",
      name: "Semi-Furnished",
      icon: "FiHome",
      description: "Partially furnished",
      category: "other",
    },
    {
      id: "wheelchair_accessible",
      name: "Wheelchair Accessible",
      icon: "FiUsers",
      description: "Accessible for people with disabilities",
      category: "other",
    },
    {
      id: "workspace",
      name: "Dedicated Workspace",
      icon: "FiBriefcase",
      description: "Home office space",
      category: "other",
    },
    {
      id: "family_friendly",
      name: "Family Friendly",
      icon: "FiUsers",
      description: "Suitable for families with children",
      category: "other",
    },
    {
      id: "long_term_stays",
      name: "Long-term Stays",
      icon: "FiCalendar",
      description: "Suitable for extended stays",
      category: "other",
    },
    {
      id: "instant_booking",
      name: "Instant Booking",
      icon: "FiZap",
      description: "Book instantly without host approval",
      category: "other",
    },
  ],
};

/**
 * Get all amenities as flat array
 */
export const getAllAmenities = () => {
  return [
    ...AMENITIES_DATA.basic,
    ...AMENITIES_DATA.facilities,
    ...AMENITIES_DATA.kenyan_specific,
    ...AMENITIES_DATA.safety,
    ...AMENITIES_DATA.other,
  ];
};

/**
 * Get amenities by category
 * @param {string} category - Category name
 * @returns {Array} Array of amenities
 */
export const getAmenitiesByCategory = (category) => {
  return AMENITIES_DATA[category] || [];
};

/**
 * Get amenity by ID
 * @param {string} id - Amenity ID
 * @returns {Object|null} Amenity object
 */
export const getAmenityById = (id) => {
  const allAmenities = getAllAmenities();
  return allAmenities.find((a) => a.id === id) || null;
};

/**
 * Get essential Kenyan amenities
 * @returns {Array} Array of essential amenities
 */
export const getEssentialAmenities = () => {
  return AMENITIES_DATA.kenyan_specific.filter((a) => a.essential);
};

/**
 * Check if property has essential amenities
 * @param {Array} propertyAmenities - Array of amenity IDs
 * @returns {boolean} True if has all essential amenities
 */
export const hasEssentialAmenities = (propertyAmenities = []) => {
  const essential = getEssentialAmenities();
  return essential.every((amenity) => propertyAmenities.includes(amenity.id));
};

/**
 * Format amenity list for display
 * @param {Array} amenityIds - Array of amenity IDs
 * @returns {Array} Array of amenity objects
 */
export const formatAmenityList = (amenityIds = []) => {
  return amenityIds.map((id) => getAmenityById(id)).filter(Boolean);
};

export default {
  AMENITIES_DATA,
  getAllAmenities,
  getAmenitiesByCategory,
  getAmenityById,
  getEssentialAmenities,
  hasEssentialAmenities,
  formatAmenityList,
};
