// src/utils/constants.js

export const APP_NAME = "NYUMBANI";
export const TAGLINE = "Find Your Perfect Home in Kenya - No Agent Fees";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const SUPPORT_EMAIL =
  import.meta.env.VITE_SUPPORT_EMAIL || "support@nyumbani.co.ke";
export const SUPPORT_PHONE =
  import.meta.env.VITE_SUPPORT_PHONE || "+254700000000";
export const SERVICE_FEE_PERCENTAGE =
  parseInt(import.meta.env.VITE_SERVICE_FEE_PERCENTAGE) || 3;

// Kenyan Cities
export const KENYAN_CITIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Kakamega",
  "Nyeri",
  "Machakos",
  "Meru",
  "Kericho",
  "Naivasha",
];

// Nairobi Neighborhoods
export const NAIROBI_NEIGHBORHOODS = [
  "Westlands",
  "Kilimani",
  "Lavington",
  "Karen",
  "Kileleshwa",
  "Parklands",
  "South B",
  "South C",
  "Embakasi",
  "Kasarani",
  "Ruaka",
  "Runda",
  "Muthaiga",
  "Riverside",
  "Loresho",
  "Spring Valley",
  "Hurlingham",
  "Ngong Road",
  "Thika Road",
  "Mombasa Road",
  "CBD",
  "Upper Hill",
  "Lower Kabete",
  "Rongai",
  "Ngong",
  "Kitengela",
  "Syokimau",
  "Ruiru",
  "Juja",
  "Donholm",
];

// Property Types
export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "studio", label: "Studio" },
  { value: "maisonette", label: "Maisonette" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "bungalow", label: "Bungalow" },
  { value: "penthouse", label: "Penthouse" },
  { value: "duplex", label: "Duplex" },
];

// Rental Types
export const RENTAL_TYPES = [
  { value: "short-term", label: "Short-term (Daily/Weekly)" },
  { value: "long-term", label: "Long-term (Monthly/Yearly)" },
  { value: "both", label: "Both" },
];

// Amenities by Category
export const AMENITIES = {
  basic: [
    { value: "wifi", label: "Wi-Fi", icon: "FiWifi" },
    { value: "kitchen", label: "Kitchen", icon: "FiHome" },
    { value: "tv", label: "TV", icon: "FiMonitor" },
    { value: "washer", label: "Washing Machine", icon: "FiDroplet" },
    { value: "ac", label: "Air Conditioning", icon: "FiWind" },
    { value: "heating", label: "Heating", icon: "FiSun" },
    { value: "hot_water", label: "Hot Water", icon: "FiDroplet" },
  ],
  facilities: [
    { value: "parking", label: "Parking", icon: "FiTruck" },
    { value: "gym", label: "Gym", icon: "FiActivity" },
    { value: "pool", label: "Swimming Pool", icon: "FiDroplet" },
    { value: "balcony", label: "Balcony", icon: "FiHome" },
    { value: "garden", label: "Garden", icon: "FiSun" },
    { value: "elevator", label: "Elevator", icon: "FiArrowUp" },
    { value: "laundry", label: "Laundry Room", icon: "FiDroplet" },
  ],
  kenyan_specific: [
    { value: "generator", label: "Generator/Backup Power", icon: "FiZap" },
    { value: "borehole", label: "Borehole/Water Tank", icon: "FiDroplet" },
    { value: "security_guard", label: "Security Guard", icon: "FiShield" },
    { value: "electric_fence", label: "Electric Fence", icon: "FiShield" },
    { value: "cctv", label: "CCTV Cameras", icon: "FiVideo" },
    { value: "perimeter_wall", label: "Perimeter Wall", icon: "FiShield" },
    { value: "gated_community", label: "Gated Community", icon: "FiLock" },
    { value: "backup_water", label: "Backup Water Supply", icon: "FiDroplet" },
    { value: "solar_water_heater", label: "Solar Water Heater", icon: "FiSun" },
    { value: "dsq", label: "DSQ (Staff Quarters)", icon: "FiHome" },
    {
      value: "garbage_collection",
      label: "Garbage Collection",
      icon: "FiTrash",
    },
    { value: "caretaker", label: "Caretaker on Site", icon: "FiUser" },
  ],
  safety: [
    { value: "smoke_detector", label: "Smoke Detector", icon: "FiAlertCircle" },
    {
      value: "fire_extinguisher",
      label: "Fire Extinguisher",
      icon: "FiAlertTriangle",
    },
    { value: "first_aid", label: "First Aid Kit", icon: "FiHeart" },
    {
      value: "carbon_monoxide",
      label: "Carbon Monoxide Detector",
      icon: "FiAlertCircle",
    },
  ],
  other: [
    { value: "pet_friendly", label: "Pet Friendly", icon: "FiHeart" },
    { value: "furnished", label: "Furnished", icon: "FiHome" },
    {
      value: "wheelchair_accessible",
      label: "Wheelchair Accessible",
      icon: "FiUsers",
    },
    { value: "workspace", label: "Dedicated Workspace", icon: "FiBriefcase" },
  ],
};

// All Amenities Flat List
export const ALL_AMENITIES = [
  ...AMENITIES.basic,
  ...AMENITIES.facilities,
  ...AMENITIES.kenyan_specific,
  ...AMENITIES.safety,
  ...AMENITIES.other,
];

// Bedroom Options
export const BEDROOM_OPTIONS = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1 Bedroom" },
  { value: 2, label: "2 Bedrooms" },
  { value: 3, label: "3 Bedrooms" },
  { value: 4, label: "4 Bedrooms" },
  { value: 5, label: "5+ Bedrooms" },
];

// Bathroom Options
export const BATHROOM_OPTIONS = [
  { value: 1, label: "1 Bathroom" },
  { value: 2, label: "2 Bathrooms" },
  { value: 3, label: "3 Bathrooms" },
  { value: 4, label: "4+ Bathrooms" },
];

// Cancellation Policies
export const CANCELLATION_POLICIES = {
  flexible: {
    name: "Flexible",
    description:
      "Full refund up to 24 hours before check-in. After that, the first night is non-refundable.",
    refundRules: [
      { days: 1, refundPercentage: 100 },
      { days: 0, refundPercentage: 0 },
    ],
  },
  moderate: {
    name: "Moderate",
    description:
      "Full refund up to 5 days before check-in. 50% refund up to 24 hours before check-in.",
    refundRules: [
      { days: 5, refundPercentage: 100 },
      { days: 1, refundPercentage: 50 },
      { days: 0, refundPercentage: 0 },
    ],
  },
  strict: {
    name: "Strict",
    description:
      "Full refund up to 7 days before check-in. 50% refund up to 14 days before check-in.",
    refundRules: [
      { days: 14, refundPercentage: 50 },
      { days: 7, refundPercentage: 100 },
      { days: 0, refundPercentage: 0 },
    ],
  },
};

// Payment Methods
export const PAYMENT_METHODS = [
  {
    value: "mpesa",
    label: "M-Pesa",
    icon: "FiSmartphone",
    description: "Pay instantly with M-Pesa",
    enabled: true,
  },
];

// User Types
export const USER_TYPES = {
  TENANT: "tenant",
  LANDLORD: "landlord",
  ADMIN: "admin",
};

// Booking Statuses
export const BOOKING_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

// Property Statuses
export const PROPERTY_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  REJECTED: "rejected",
};

// Sort Options
export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Listings" },
  { value: "rating_high", label: "Highest Rated" },
  { value: "reviews_most", label: "Most Reviewed" },
];

// Price Ranges (in KES)
export const PRICE_RANGES = [
  { min: 0, max: 10000, label: "Under KES 10,000" },
  { min: 10000, max: 20000, label: "KES 10,000 - 20,000" },
  { min: 20000, max: 50000, label: "KES 20,000 - 50,000" },
  { min: 50000, max: 100000, label: "KES 50,000 - 100,000" },
  { min: 100000, max: 200000, label: "KES 100,000 - 200,000" },
  { min: 200000, max: null, label: "Above KES 200,000" },
];

// Rating Categories
export const RATING_CATEGORIES = [
  { value: "cleanliness", label: "Cleanliness" },
  { value: "accuracy", label: "Accuracy" },
  { value: "communication", label: "Communication" },
  { value: "location", label: "Location" },
  { value: "value", label: "Value for Money" },
  { value: "checkin", label: "Check-in Experience" },
];

// Social Media Links
export const SOCIAL_MEDIA_LINKS = {
  facebook: "https://facebook.com/nyumbani",
  twitter: "https://twitter.com/nyumbani",
  instagram: "https://instagram.com/nyumbani",
  linkedin: "https://linkedin.com/company/nyumbani",
};

// Navigation Links
export const NAV_LINKS = {
  main: [
    { path: "/", label: "Home" },
    { path: "/search", label: "Find Properties" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/about", label: "About Us" },
  ],
  footer: {
    company: [
      { path: "/about", label: "About Us" },
      { path: "/how-it-works", label: "How It Works" },
      { path: "/contact", label: "Contact Us" },
      { path: "/help", label: "Help Center" },
    ],
    hosting: [
      { path: "/landlord/dashboard", label: "List Your Property" },
      { path: "/help/hosting", label: "Hosting Resources" },
      { path: "/help/safety", label: "Safety Guidelines" },
    ],
    legal: [
      { path: "/terms", label: "Terms of Service" },
      { path: "/privacy", label: "Privacy Policy" },
      { path: "/cancellation", label: "Cancellation Policy" },
    ],
  },
};

// Popular Destinations
export const POPULAR_DESTINATIONS = [
  {
    name: "Westlands",
    city: "Nairobi",
    image: "/assets/images/destinations/westlands.jpg",
    properties: 245,
  },
  {
    name: "Kilimani",
    city: "Nairobi",
    image: "/assets/images/destinations/kilimani.jpg",
    properties: 189,
  },
  {
    name: "Lavington",
    city: "Nairobi",
    image: "/assets/images/destinations/lavington.jpg",
    properties: 156,
  },
  {
    name: "Karen",
    city: "Nairobi",
    image: "/assets/images/destinations/karen.jpg",
    properties: 134,
  },
  {
    name: "Kileleshwa",
    city: "Nairobi",
    image: "/assets/images/destinations/kileleshwa.jpg",
    properties: 178,
  },
  {
    name: "Mombasa",
    city: "Mombasa",
    image: "/assets/images/destinations/mombasa.jpg",
    properties: 298,
  },
  {
    name: "Kisumu",
    city: "Kisumu",
    image: "/assets/images/destinations/kisumu.jpg",
    properties: 167,
  },
  {
    name: "Nakuru",
    city: "Nakuru",
    image: "/assets/images/destinations/nakuru.jpg",
    properties: 145,
  },
];

// Featured Categories
export const FEATURED_CATEGORIES = [
  {
    title: "Short-term Vacation Rentals",
    description: "Perfect for holidays and getaways",
    icon: "FiCalendar",
    link: "/search?type=short-term",
  },
  {
    title: "Long-term Apartments",
    description: "Find your next home",
    icon: "FiHome",
    link: "/search?type=long-term",
  },
  {
    title: "Bedsitters & Studios",
    description: "Affordable single-room living",
    icon: "FiKey",
    link: "/search?propertyType=bedsitter,studio",
  },
  {
    title: "Family Homes",
    description: "Spacious homes for families",
    icon: "FiUsers",
    link: "/search?bedrooms=3,4,5",
  },
  {
    title: "Shared Accommodation",
    description: "Share costs, make friends",
    icon: "FiUserPlus",
    link: "/search?type=shared",
  },
  {
    title: "Luxury Properties",
    description: "Premium living spaces",
    icon: "FiStar",
    link: "/search?priceMin=100000",
  },
];

// Response Time Options
export const RESPONSE_TIMES = {
  within_hour: "Within an hour",
  few_hours: "Within a few hours",
  day: "Within a day",
};

// Verification Types
export const VERIFICATION_TYPES = {
  EMAIL: "email",
  PHONE: "phone",
  ID: "id",
  PAYMENT: "payment",
};

// Message Templates
export const MESSAGE_TEMPLATES = {
  booking_inquiry:
    "Hi, I'm interested in booking your property. Is it available for the dates I selected?",
  general_inquiry:
    "Hi, I have some questions about your property. Can you provide more details?",
  viewing_request:
    "Hi, I would like to schedule a viewing of your property. When would be convenient?",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING_REQUEST: "booking_request",
  BOOKING_CONFIRMED: "booking_confirmed",
  BOOKING_CANCELLED: "booking_cancelled",
  MESSAGE_RECEIVED: "message_received",
  REVIEW_RECEIVED: "review_received",
  PAYMENT_RECEIVED: "payment_received",
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "dd MMM yyyy",
  DISPLAY_LONG: "EEEE, dd MMMM yyyy",
  INPUT: "yyyy-MM-dd",
  TIME: "HH:mm",
  DATETIME: "dd MMM yyyy HH:mm",
};

// Pagination
export const ITEMS_PER_PAGE = 12;
export const MAX_PAGINATION_BUTTONS = 5;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_PROPERTY_IMAGES = 10;

// Search Defaults
export const DEFAULT_SEARCH_RADIUS = 5; // kilometers
export const MIN_SEARCH_QUERY_LENGTH = 2;
export const SEARCH_DEBOUNCE_MS = 300;

export default {
  APP_NAME,
  TAGLINE,
  API_BASE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SERVICE_FEE_PERCENTAGE,
  KENYAN_CITIES,
  NAIROBI_NEIGHBORHOODS,
  PROPERTY_TYPES,
  RENTAL_TYPES,
  AMENITIES,
  ALL_AMENITIES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  CANCELLATION_POLICIES,
  PAYMENT_METHODS,
  USER_TYPES,
  BOOKING_STATUSES,
  PROPERTY_STATUSES,
  SORT_OPTIONS,
  PRICE_RANGES,
  RATING_CATEGORIES,
  SOCIAL_MEDIA_LINKS,
  NAV_LINKS,
  POPULAR_DESTINATIONS,
  FEATURED_CATEGORIES,
  RESPONSE_TIMES,
  VERIFICATION_TYPES,
  MESSAGE_TEMPLATES,
  NOTIFICATION_TYPES,
  DATE_FORMATS,
  ITEMS_PER_PAGE,
  MAX_PAGINATION_BUTTONS,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  MAX_PROPERTY_IMAGES,
  DEFAULT_SEARCH_RADIUS,
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_DEBOUNCE_MS,
};
