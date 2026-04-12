// src/data/kenyanLocations.js

/**
 * Kenyan Cities with Coordinates
 */
export const KENYAN_CITIES_DATA = [
  {
    name: "Nairobi",
    county: "Nairobi",
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },
  {
    name: "Mombasa",
    county: "Mombasa",
    coordinates: { lat: -4.0435, lng: 39.6682 },
  },
  {
    name: "Kisumu",
    county: "Kisumu",
    coordinates: { lat: -0.0917, lng: 34.768 },
  },
  {
    name: "Nakuru",
    county: "Nakuru",
    coordinates: { lat: -0.3031, lng: 36.08 },
  },
  {
    name: "Eldoret",
    county: "Uasin Gishu",
    coordinates: { lat: 0.5143, lng: 35.2698 },
  },
  {
    name: "Thika",
    county: "Kiambu",
    coordinates: { lat: -1.0332, lng: 37.0692 },
  },
  {
    name: "Malindi",
    county: "Kilifi",
    coordinates: { lat: -3.2167, lng: 40.1167 },
  },
  {
    name: "Kitale",
    county: "Trans-Nzoia",
    coordinates: { lat: 1.0158, lng: 35.0062 },
  },
  {
    name: "Garissa",
    county: "Garissa",
    coordinates: { lat: -0.4536, lng: 39.6401 },
  },
  {
    name: "Kakamega",
    county: "Kakamega",
    coordinates: { lat: 0.2827, lng: 34.7519 },
  },
  {
    name: "Nyeri",
    county: "Nyeri",
    coordinates: { lat: -0.4197, lng: 36.9475 },
  },
  {
    name: "Machakos",
    county: "Machakos",
    coordinates: { lat: -1.5177, lng: 37.2634 },
  },
  { name: "Meru", county: "Meru", coordinates: { lat: 0.0469, lng: 37.6495 } },
  {
    name: "Kericho",
    county: "Kericho",
    coordinates: { lat: -0.3676, lng: 35.2836 },
  },
  {
    name: "Naivasha",
    county: "Nakuru",
    coordinates: { lat: -0.7133, lng: 36.4331 },
  },
];

/**
 * Nairobi Neighborhoods with Details
 */
export const NAIROBI_NEIGHBORHOODS_DATA = [
  {
    name: "Westlands",
    zone: "West",
    description:
      "Upscale commercial and residential area with modern amenities",
    averageRent: 80000,
    popularity: 5,
    coordinates: { lat: -1.2675, lng: 36.807 },
    landmarks: ["Sarit Centre", "The Mall Westlands", "Westgate Mall"],
  },
  {
    name: "Kilimani",
    zone: "West",
    description:
      "Popular residential area close to CBD with good infrastructure",
    averageRent: 60000,
    popularity: 5,
    coordinates: { lat: -1.2902, lng: 36.7872 },
    landmarks: ["Yaya Centre", "The Junction Mall", "Prestige Plaza"],
  },
  {
    name: "Lavington",
    zone: "West",
    description: "Affluent neighborhood known for security and tranquility",
    averageRent: 120000,
    popularity: 4,
    coordinates: { lat: -1.2822, lng: 36.7685 },
    landmarks: ["Lavington Mall", "Valley Arcade", "Lavington Green"],
  },
  {
    name: "Karen",
    zone: "South West",
    description: "Prestigious leafy suburb with spacious properties",
    averageRent: 150000,
    popularity: 4,
    coordinates: { lat: -1.3217, lng: 36.7019 },
    landmarks: ["Karen Blixen Museum", "The Hub Karen", "Giraffe Centre"],
  },
  {
    name: "Kileleshwa",
    zone: "West",
    description: "Quiet residential area popular with expatriates",
    averageRent: 70000,
    popularity: 5,
    coordinates: { lat: -1.289, lng: 36.784 },
    landmarks: ["Kasuku Centre", "Mandalay Shopping Centre"],
  },
  {
    name: "Parklands",
    zone: "North West",
    description: "Diverse neighborhood with good amenities and transport links",
    averageRent: 55000,
    popularity: 4,
    coordinates: { lat: -1.264, lng: 36.8238 },
    landmarks: ["Aga Khan Hospital", "Parklands Sports Club"],
  },
  {
    name: "South B",
    zone: "South",
    description: "Established middle-income residential area",
    averageRent: 40000,
    popularity: 4,
    coordinates: { lat: -1.3133, lng: 36.8344 },
    landmarks: ["Nairobi South Hospital", "Capital Centre"],
  },
  {
    name: "South C",
    zone: "South",
    description: "Well-planned residential estate with good security",
    averageRent: 45000,
    popularity: 4,
    coordinates: { lat: -1.3189, lng: 36.8287 },
    landmarks: ["T-Mall", "Nairobi West Hospital"],
  },
  {
    name: "Embakasi",
    zone: "East",
    description: "Expansive area with affordable housing options",
    averageRent: 25000,
    popularity: 3,
    coordinates: { lat: -1.3219, lng: 36.8926 },
    landmarks: [
      "Jomo Kenyatta International Airport",
      "Utawala Shopping Centre",
    ],
  },
  {
    name: "Kasarani",
    zone: "North East",
    description: "Growing residential area with good infrastructure",
    averageRent: 30000,
    popularity: 4,
    coordinates: { lat: -1.2208, lng: 36.8981 },
    landmarks: ["Kasarani Stadium", "Thika Road Mall"],
  },
  {
    name: "Ruaka",
    zone: "North West",
    description: "Fast-growing town along Limuru Road",
    averageRent: 35000,
    popularity: 4,
    coordinates: { lat: -1.2058, lng: 36.7844 },
    landmarks: ["Quickmart Ruaka", "Ruaka Town Centre"],
  },
  {
    name: "Runda",
    zone: "North",
    description: "Exclusive gated community with luxurious homes",
    averageRent: 180000,
    popularity: 3,
    coordinates: { lat: -1.2209, lng: 36.7833 },
    landmarks: ["Runda Mall", "Two Rivers Mall"],
  },
  {
    name: "Muthaiga",
    zone: "North",
    description: "Elite neighborhood with colonial charm",
    averageRent: 200000,
    popularity: 3,
    coordinates: { lat: -1.2478, lng: 36.8228 },
    landmarks: ["Muthaiga Country Club", "Village Market"],
  },
  {
    name: "Riverside",
    zone: "West",
    description: "Upmarket area with commercial and residential properties",
    averageRent: 90000,
    popularity: 4,
    coordinates: { lat: -1.2741, lng: 36.8097 },
    landmarks: ["Riverside Drive", "Chiromo Lane"],
  },
  {
    name: "Loresho",
    zone: "West",
    description: "Serene residential area near Westlands",
    averageRent: 110000,
    popularity: 3,
    coordinates: { lat: -1.2585, lng: 36.7696 },
    landmarks: ["Ridgeways Mall"],
  },
  {
    name: "Spring Valley",
    zone: "West",
    description: "Quiet upscale neighborhood",
    averageRent: 95000,
    popularity: 3,
    coordinates: { lat: -1.2678, lng: 36.7892 },
    landmarks: ["Spring Valley Shopping Centre"],
  },
  {
    name: "Hurlingham",
    zone: "West",
    description: "Established residential area near Ngong Road",
    averageRent: 65000,
    popularity: 4,
    coordinates: { lat: -1.2967, lng: 36.7761 },
    landmarks: ["Hurlingham Shopping Centre"],
  },
  {
    name: "Ngong Road",
    zone: "West",
    description: "Corridor area with mixed residential and commercial",
    averageRent: 50000,
    popularity: 4,
    coordinates: { lat: -1.3033, lng: 36.7639 },
    landmarks: ["Adams Arcade", "The Oval"],
  },
  {
    name: "Thika Road",
    zone: "North East",
    description: "Major corridor with many housing developments",
    averageRent: 35000,
    popularity: 5,
    coordinates: { lat: -1.2333, lng: 36.8917 },
    landmarks: ["Garden City Mall", "Thika Road Mall"],
  },
  {
    name: "Mombasa Road",
    zone: "South East",
    description: "Industrial and residential corridor",
    averageRent: 32000,
    popularity: 3,
    coordinates: { lat: -1.3442, lng: 36.8622 },
    landmarks: ["Signature Mall", "Bellevue Cinema"],
  },
  {
    name: "CBD",
    zone: "Central",
    description: "Central Business District with high-rise apartments",
    averageRent: 45000,
    popularity: 4,
    coordinates: { lat: -1.2864, lng: 36.8172 },
    landmarks: ["KICC", "Kenyatta Avenue", "Times Tower"],
  },
  {
    name: "Upper Hill",
    zone: "Central",
    description: "Business district with modern apartments",
    averageRent: 55000,
    popularity: 4,
    coordinates: { lat: -1.2907, lng: 36.8129 },
    landmarks: ["KMA Centre", "View Park Towers"],
  },
  {
    name: "Lower Kabete",
    zone: "West",
    description: "Affordable residential area near Westlands",
    averageRent: 30000,
    popularity: 3,
    coordinates: { lat: -1.2589, lng: 36.7458 },
    landmarks: ["Kabete Barracks"],
  },
  {
    name: "Rongai",
    zone: "South",
    description: "Fast-growing town with affordable housing",
    averageRent: 20000,
    popularity: 4,
    coordinates: { lat: -1.3833, lng: 36.75 },
    landmarks: ["Rongai Town", "Tumaini Centre"],
  },
  {
    name: "Ngong",
    zone: "South West",
    description: "Town near Nairobi with cooler climate",
    averageRent: 25000,
    popularity: 3,
    coordinates: { lat: -1.3525, lng: 36.6492 },
    landmarks: ["Ngong Hills", "Ngong Town"],
  },
  {
    name: "Kitengela",
    zone: "South",
    description: "Satellite town with growing residential developments",
    averageRent: 22000,
    popularity: 4,
    coordinates: { lat: -1.4667, lng: 36.95 },
    landmarks: ["Kitengela Glass", "Kitengela Town"],
  },
  {
    name: "Syokimau",
    zone: "East",
    description: "Modern suburb along Mombasa Road",
    averageRent: 35000,
    popularity: 4,
    coordinates: { lat: -1.3667, lng: 36.9333 },
    landmarks: ["SGR Syokimau Station", "Gateway Mall"],
  },
  {
    name: "Ruiru",
    zone: "North East",
    description: "Major town along Thika Road",
    averageRent: 28000,
    popularity: 4,
    coordinates: { lat: -1.15, lng: 36.9667 },
    landmarks: ["Ruiru Town", "Bypass Mall"],
  },
  {
    name: "Juja",
    zone: "North East",
    description: "University town with student accommodation",
    averageRent: 18000,
    popularity: 3,
    coordinates: { lat: -1.0981, lng: 37.0158 },
    landmarks: ["JKUAT", "Juja Town"],
  },
  {
    name: "Donholm",
    zone: "East",
    description: "Established residential estate",
    averageRent: 35000,
    popularity: 4,
    coordinates: { lat: -1.2892, lng: 36.8903 },
    landmarks: ["Donholm Phase 1-8"],
  },
];

/**
 * Popular Landmarks in Nairobi
 */
export const NAIROBI_LANDMARKS = [
  {
    name: "KICC",
    category: "Business",
    coordinates: { lat: -1.2887, lng: 36.8219 },
  },
  {
    name: "Nairobi National Park",
    category: "Recreation",
    coordinates: { lat: -1.3733, lng: 36.8581 },
  },
  {
    name: "Village Market",
    category: "Shopping",
    coordinates: { lat: -1.2224, lng: 36.8059 },
  },
  {
    name: "Two Rivers Mall",
    category: "Shopping",
    coordinates: { lat: -1.2103, lng: 36.7875 },
  },
  {
    name: "The Hub Karen",
    category: "Shopping",
    coordinates: { lat: -1.3198, lng: 36.7037 },
  },
  {
    name: "Sarit Centre",
    category: "Shopping",
    coordinates: { lat: -1.2639, lng: 36.8047 },
  },
  {
    name: "Kenyatta University",
    category: "Education",
    coordinates: { lat: -1.1703, lng: 36.9303 },
  },
  {
    name: "JKUAT",
    category: "Education",
    coordinates: { lat: -1.0981, lng: 37.0158 },
  },
  {
    name: "Aga Khan Hospital",
    category: "Hospital",
    coordinates: { lat: -1.2639, lng: 36.8247 },
  },
  {
    name: "Nairobi Hospital",
    category: "Hospital",
    coordinates: { lat: -1.2928, lng: 36.8103 },
  },
];

/**
 * Matatu Routes (for proximity reference)
 */
export const MATATU_ROUTES = [
  { route: "45", from: "CBD", to: "Westlands", fare: 50 },
  { route: "111", from: "CBD", to: "Embakasi", fare: 50 },
  { route: "23", from: "CBD", to: "Ngong Road", fare: 30 },
  { route: "34", from: "CBD", to: "South C", fare: 40 },
  { route: "46", from: "CBD", to: "Kasarani", fare: 50 },
  { route: "126", from: "CBD", to: "Kikuyu", fare: 80 },
  { route: "125", from: "CBD", to: "Rongai", fare: 100 },
];

/**
 * Get neighborhood by name
 * @param {string} name - Neighborhood name
 * @returns {Object|null} Neighborhood data
 */
export const getNeighborhoodByName = (name) => {
  return (
    NAIROBI_NEIGHBORHOODS_DATA.find(
      (n) => n.name.toLowerCase() === name.toLowerCase(),
    ) || null
  );
};

/**
 * Get neighborhoods by zone
 * @param {string} zone - Zone name
 * @returns {Array} Array of neighborhoods
 */
export const getNeighborhoodsByZone = (zone) => {
  return NAIROBI_NEIGHBORHOODS_DATA.filter(
    (n) => n.zone.toLowerCase() === zone.toLowerCase(),
  );
};

/**
 * Get city by name
 * @param {string} name - City name
 * @returns {Object|null} City data
 */
export const getCityByName = (name) => {
  return (
    KENYAN_CITIES_DATA.find(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    ) || null
  );
};

export default {
  KENYAN_CITIES_DATA,
  NAIROBI_NEIGHBORHOODS_DATA,
  NAIROBI_LANDMARKS,
  MATATU_ROUTES,
  getNeighborhoodByName,
  getNeighborhoodsByZone,
  getCityByName,
};
