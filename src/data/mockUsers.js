// src/data/mockUsers.js

import { generateId } from "../utils/helpers";

/**
 * Mock User Data - Landlords and Tenants
 */

// Landlords (Property Owners)
export const MOCK_LANDLORDS = [
  {
    id: "1",
    name: "James Mwangi",
    email: "james.mwangi@email.com",
    phone: "+254712345678",
    photo: "/assets/images/hosts/host-1.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2022-03-15T00:00:00Z",
    bio: "Professional property manager with over 10 years experience in Nairobi real estate. I take pride in maintaining high-quality properties and providing excellent tenant experiences.",
    responseRate: 98,
    responseTime: "within_hour",
    totalProperties: 3,
    totalBookings: 45,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Westlands" },
  },
  {
    id: "2",
    name: "Grace Wambui",
    email: "grace.wambui@email.com",
    phone: "+254723456789",
    photo: "/assets/images/hosts/host-2.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2021-08-20T00:00:00Z",
    bio: "Family-oriented landlord committed to providing safe, comfortable homes. I believe in building long-term relationships with my tenants.",
    responseRate: 95,
    responseTime: "few_hours",
    totalProperties: 2,
    totalBookings: 28,
    languages: ["English", "Swahili", "Kikuyu"],
    location: { city: "Nairobi", neighborhood: "Kilimani" },
  },
  {
    id: "3",
    name: "Peter Kamau",
    email: "peter.kamau@email.com",
    phone: "+254734567890",
    photo: "/assets/images/hosts/host-3.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2023-01-10T00:00:00Z",
    bio: "Young entrepreneur offering affordable housing to students and young professionals.",
    responseRate: 92,
    responseTime: "day",
    totalProperties: 5,
    totalBookings: 15,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Kasarani" },
  },
  {
    id: "4",
    name: "Sarah Njeri",
    email: "sarah.njeri@email.com",
    phone: "+254745678901",
    photo: "/assets/images/hosts/host-4.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2020-11-01T00:00:00Z",
    bio: "Luxury property specialist. My properties offer world-class amenities and unmatched comfort for discerning tenants.",
    responseRate: 100,
    responseTime: "within_hour",
    totalProperties: 4,
    totalBookings: 67,
    languages: ["English", "Swahili", "French"],
    location: { city: "Nairobi", neighborhood: "Karen" },
  },
  {
    id: "5",
    name: "David Omondi",
    email: "david.omondi@email.com",
    phone: "+254756789012",
    photo: "/assets/images/hosts/host-5.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2022-05-15T00:00:00Z",
    bio: "Experienced property owner specializing in modern apartments for professionals.",
    responseRate: 94,
    responseTime: "few_hours",
    totalProperties: 3,
    totalBookings: 21,
    languages: ["English", "Swahili", "Luo"],
    location: { city: "Nairobi", neighborhood: "South C" },
  },
  {
    id: "6",
    name: "Mary Wanjiku",
    email: "mary.wanjiku@email.com",
    phone: "+254767890123",
    photo: "/assets/images/hosts/host-6.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2023-03-20T00:00:00Z",
    bio: "Dedicated to providing quality student accommodation near universities.",
    responseRate: 96,
    responseTime: "few_hours",
    totalProperties: 8,
    totalBookings: 34,
    languages: ["English", "Swahili"],
    location: { city: "Juja", neighborhood: "Juja" },
  },
  {
    id: "7",
    name: "Michael Kariuki",
    email: "michael.kariuki@email.com",
    phone: "+254778901234",
    photo: "/assets/images/hosts/host-7.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2021-02-14T00:00:00Z",
    bio: "Premium property developer focused on delivering exceptional living spaces.",
    responseRate: 98,
    responseTime: "within_hour",
    totalProperties: 2,
    totalBookings: 19,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Lavington" },
  },
  {
    id: "8",
    name: "Jane Muthoni",
    email: "jane.muthoni@email.com",
    phone: "+254789012345",
    photo: "/assets/images/hosts/host-8.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2022-09-05T00:00:00Z",
    bio: "Friendly landlord offering family-friendly homes in safe neighborhoods.",
    responseRate: 93,
    responseTime: "day",
    totalProperties: 4,
    totalBookings: 18,
    languages: ["English", "Swahili"],
    location: { city: "Kiambu", neighborhood: "Ruaka" },
  },
  {
    id: "9",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+254790123456",
    photo: "/assets/images/hosts/host-9.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2021-07-10T00:00:00Z",
    bio: "Coastal property specialist offering beautiful beachfront and near-beach properties.",
    responseRate: 97,
    responseTime: "within_hour",
    totalProperties: 3,
    totalBookings: 56,
    languages: ["English", "Swahili", "Arabic"],
    location: { city: "Mombasa", neighborhood: "Nyali" },
  },
  {
    id: "10",
    name: "Lucy Akinyi",
    email: "lucy.akinyi@email.com",
    phone: "+254701234567",
    photo: "/assets/images/hosts/host-10.jpg",
    userType: "landlord",
    verified: true,
    joinedDate: "2020-05-22T00:00:00Z",
    bio: "Elite property manager specializing in high-end residences in premium locations.",
    responseRate: 99,
    responseTime: "within_hour",
    totalProperties: 5,
    totalBookings: 31,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Runda" },
  },
];

// Tenants
export const MOCK_TENANTS = [
  {
    id: "T1",
    name: "Alice Mwende",
    email: "alice.mwende@email.com",
    phone: "+254711111111",
    photo: "/assets/images/users/tenant-1.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-01-15T00:00:00Z",
    bio: "Young professional working in tech industry, looking for modern accommodation.",
    totalBookings: 2,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Westlands" },
  },
  {
    id: "T2",
    name: "Brian Otieno",
    email: "brian.otieno@email.com",
    phone: "+254722222222",
    photo: "/assets/images/users/tenant-2.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-03-20T00:00:00Z",
    bio: "Marketing professional seeking comfortable living spaces.",
    totalBookings: 1,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Kilimani" },
  },
  {
    id: "T3",
    name: "Catherine Wanjiru",
    email: "catherine.wanjiru@email.com",
    phone: "+254733333333",
    photo: "/assets/images/users/tenant-3.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2022-11-10T00:00:00Z",
    bio: "Teacher and mother of two, looking for family-friendly homes.",
    totalBookings: 3,
    languages: ["English", "Swahili", "Kikuyu"],
    location: { city: "Nairobi", neighborhood: "South C" },
  },
  {
    id: "T4",
    name: "Daniel Kiplagat",
    email: "daniel.kiplagat@email.com",
    phone: "+254744444444",
    photo: "/assets/images/users/tenant-4.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-06-05T00:00:00Z",
    bio: "Student at JKUAT pursuing engineering.",
    totalBookings: 1,
    languages: ["English", "Swahili"],
    location: { city: "Juja", neighborhood: "Juja" },
  },
  {
    id: "T5",
    name: "Eva Njoki",
    email: "eva.njoki@email.com",
    phone: "+254755555555",
    photo: "/assets/images/users/tenant-5.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-02-28T00:00:00Z",
    bio: "Accountant working in Upper Hill area.",
    totalBookings: 2,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Kilimani" },
  },
  {
    id: "T6",
    name: "Felix Odhiambo",
    email: "felix.odhiambo@email.com",
    phone: "+254766666666",
    photo: "/assets/images/users/tenant-6.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-07-12T00:00:00Z",
    bio: "Banker looking for convenient accommodation near work.",
    totalBookings: 1,
    languages: ["English", "Swahili", "Luo"],
    location: { city: "Nairobi", neighborhood: "Westlands" },
  },
  {
    id: "T7",
    name: "Grace Chebet",
    email: "grace.chebet@email.com",
    phone: "+254777777777",
    photo: "/assets/images/users/tenant-7.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2022-09-18T00:00:00Z",
    bio: "Entrepreneur running online businesses, needs reliable internet.",
    totalBookings: 4,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Karen" },
  },
  {
    id: "T8",
    name: "Henry Mutiso",
    email: "henry.mutiso@email.com",
    phone: "+254788888888",
    photo: "/assets/images/users/tenant-8.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-04-22T00:00:00Z",
    bio: "Software developer preferring quiet neighborhoods.",
    totalBookings: 1,
    languages: ["English", "Swahili", "Kamba"],
    location: { city: "Nairobi", neighborhood: "Ruaka" },
  },
  {
    id: "T9",
    name: "Irene Wangui",
    email: "irene.wangui@email.com",
    phone: "+254799999999",
    photo: "/assets/images/users/tenant-9.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2023-05-30T00:00:00Z",
    bio: "Nurse working rotating shifts, needs flexible housing.",
    totalBookings: 2,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Parklands" },
  },
  {
    id: "T10",
    name: "James Kimani",
    email: "james.kimani@email.com",
    phone: "+254700000000",
    photo: "/assets/images/users/tenant-10.jpg",
    userType: "tenant",
    verified: true,
    joinedDate: "2022-12-08T00:00:00Z",
    bio: "Sales representative traveling frequently, needs secure housing.",
    totalBookings: 3,
    languages: ["English", "Swahili"],
    location: { city: "Nairobi", neighborhood: "Kasarani" },
  },
];

// Combined users array
export const MOCK_USERS = [...MOCK_LANDLORDS, ...MOCK_TENANTS];

/**
 * Helper functions
 */

// Get user by ID
export const getUserById = (id) => {
  return MOCK_USERS.find((user) => user.id === id) || null;
};

// Get user by email
export const getUserByEmail = (email) => {
  return (
    MOCK_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    ) || null
  );
};

// Get landlords only
export const getLandlords = () => {
  return MOCK_LANDLORDS;
};

// Get tenants only
export const getTenants = () => {
  return MOCK_TENANTS;
};

// Get landlord by ID
export const getLandlordById = (id) => {
  return MOCK_LANDLORDS.find((landlord) => landlord.id === id) || null;
};

// Get tenant by ID
export const getTenantById = (id) => {
  return MOCK_TENANTS.find((tenant) => tenant.id === id) || null;
};

// Get verified users
export const getVerifiedUsers = () => {
  return MOCK_USERS.filter((user) => user.verified);
};

// Get users by location
export const getUsersByLocation = (city) => {
  return MOCK_USERS.filter(
    (user) => user.location.city.toLowerCase() === city.toLowerCase(),
  );
};

export default {
  MOCK_LANDLORDS,
  MOCK_TENANTS,
  MOCK_USERS,
  getUserById,
  getUserByEmail,
  getLandlords,
  getTenants,
  getLandlordById,
  getTenantById,
  getVerifiedUsers,
  getUsersByLocation,
};
