// src/data/mockReviews.js

import { generateId } from "../utils/helpers";

/**
 * Mock Review Data
 * Reviews from tenants for properties they've stayed in
 */
export const MOCK_REVIEWS = [
  {
    id: generateId(),
    propertyId: null, // Will be linked to actual property
    propertyTitle: "Modern 2BR Apartment in Westlands with Amazing City Views",
    bookingId: null,
    tenantId: "T1",
    tenantName: "Alice Mwende",
    tenantPhoto: "/assets/images/users/tenant-1.jpg",
    landlordId: "1",
    landlordName: "James Mwangi",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 4,
      checkin: 5,
    },
    reviewText:
      "Absolutely loved staying at James's apartment! The views of Nairobi are breathtaking, especially at sunset. The apartment was spotlessly clean and exactly as described in the listing. James was very responsive and helpful throughout our stay. The location in Westlands is perfect - walking distance to Sarit Centre and plenty of restaurants. The backup power and water were a lifesaver during the occasional outages. Highly recommend for anyone visiting Nairobi!",
    reviewDate: "2024-03-07T14:30:00Z",
    stayDate: "2024-03-01",
    landlordResponse: {
      text: "Thank you so much Alice! It was a pleasure hosting you and your family. You were wonderful guests and took great care of the apartment. You're welcome back anytime!",
      responseDate: "2024-03-08T09:00:00Z",
    },
    helpful: 12,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Spacious 3BR House in Kilimani - Family Perfect",
    bookingId: null,
    tenantId: "T3",
    tenantName: "Catherine Wanjiru",
    tenantPhoto: "/assets/images/users/tenant-3.jpg",
    landlordId: "2",
    landlordName: "Grace Wambui",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "We've been living in Grace's house for three months now and couldn't be happier! The house is spacious, perfect for our family of four. The garden is lovely and our kids love playing there. The neighborhood is safe and quiet. Grace is an exceptional landlord - very professional and always quick to address any maintenance issues. The DSQ is great for our house help. Yaya Centre and The Junction are so close, making shopping very convenient. The rent is very reasonable for such a quality property in Kilimani. Highly recommended for families!",
    reviewDate: "2024-04-05T16:20:00Z",
    stayDate: "2024-01-01",
    landlordResponse: {
      text: "Thank you Catherine! I'm so glad you and your family are comfortable in the house. It's wonderful to have such responsible tenants. Looking forward to continuing our landlord-tenant relationship.",
      responseDate: "2024-04-06T10:15:00Z",
    },
    helpful: 18,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Luxury 4BR Villa in Karen with Swimming Pool",
    bookingId: null,
    tenantId: "T7",
    tenantName: "Grace Chebet",
    tenantPhoto: "/assets/images/users/tenant-7.jpg",
    landlordId: "4",
    landlordName: "Sarah Njeri",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "This villa exceeded all our expectations! We booked it for a week-long Valentine's celebration and it was absolutely perfect. The property is stunning - beautifully furnished, immaculately maintained, and the pool area is like a private resort. The staff quarters were convenient as we brought our house help. The security in the compound is top-notch. Sarah was fantastic to work with, very accommodating and professional. The location in Karen is serene yet close to everything. Worth every shilling!",
    reviewDate: "2024-02-23T11:45:00Z",
    stayDate: "2024-02-14",
    landlordResponse: {
      text: "Thank you Grace! I'm thrilled you enjoyed your stay. The villa is meant for creating special memories and I'm glad it served that purpose for your celebration. You were wonderful guests!",
      responseDate: "2024-02-23T15:30:00Z",
    },
    helpful: 25,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Student-Friendly Studio near JKUAT - Fully Furnished",
    bookingId: null,
    tenantId: "T4",
    tenantName: "Daniel Kiplagat",
    tenantPhoto: "/assets/images/users/tenant-4.jpg",
    landlordId: "6",
    landlordName: "Mary Wanjiku",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Perfect student accommodation! The studio is clean, well-furnished, and has everything a student needs. The WiFi is reliable which is crucial for my online classes. Mary is very understanding and flexible with rent payment dates, especially during exam periods. The location is ideal - just 5 minutes walk to JKUAT main gate. There are plenty of food kiosks and shops nearby. Security is good and the neighbors are fellow students so it's a great community. Great value for money!",
    reviewDate: "2024-01-20T13:00:00Z",
    stayDate: "2023-09-01",
    landlordResponse: {
      text: "Thanks Daniel! Glad the studio is working well for your studies. You're a responsible tenant and it's been great having you. Best wishes for your exams!",
      responseDate: "2024-01-21T09:30:00Z",
    },
    helpful: 31,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Affordable Bedsitter in Kasarani - Near Thika Road",
    bookingId: null,
    tenantId: "T10",
    tenantName: "James Kimani",
    tenantPhoto: "/assets/images/users/tenant-10.jpg",
    landlordId: "3",
    landlordName: "Peter Kamau",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 4,
      location: 5,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Good value bedsitter in Kasarani. The unit is basic but clean and functional. Perfect for someone on a budget. The location is excellent with matatus to CBD easily available. Peter is a decent landlord though sometimes takes a bit long to respond to messages. Water supply has been consistent and security is okay. The estate has a good community feel. For the price, it's a solid option.",
    reviewDate: "2024-01-15T10:30:00Z",
    stayDate: "2024-01-01",
    landlordResponse: {
      text: "Thank you James for the honest feedback. I appreciate you as a tenant and will work on being more responsive. Glad the location and price work for you.",
      responseDate: "2024-01-16T14:00:00Z",
    },
    helpful: 8,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Modern 2BR Apartment in Westlands with Amazing City Views",
    bookingId: null,
    tenantId: "T6",
    tenantName: "Felix Odhiambo",
    tenantPhoto: "/assets/images/users/tenant-6.jpg",
    landlordId: "1",
    landlordName: "James Mwangi",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Stayed here for a business trip and it was perfect. The apartment is modern, clean, and has fast WiFi which I needed for video calls. James provided clear check-in instructions and was available when I had questions. The workspace setup was great for working remotely. Westlands location meant I could walk to most of my meetings. The backup power ensured I never lost connection during calls. Will definitely book again on my next Nairobi visit!",
    reviewDate: "2023-11-17T09:15:00Z",
    stayDate: "2023-11-10",
    landlordResponse: {
      text: "Thanks Felix! Glad the apartment suited your business needs. Professional guests like you are always welcome. Hope to host you again soon!",
      responseDate: "2023-11-17T11:00:00Z",
    },
    helpful: 14,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Beachfront 3BR Cottage in Mombasa - Paradise Living",
    bookingId: null,
    tenantId: "T1",
    tenantName: "Alice Mwende",
    tenantPhoto: "/assets/images/users/tenant-1.jpg",
    landlordId: "9",
    landlordName: "Ahmed Hassan",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "This cottage is a slice of paradise! Waking up to the sound of waves and the ocean view from the bedroom was magical. The cottage is beautifully maintained and has everything you need. Ahmed was an excellent host - arranged airport pickup and gave us great recommendations for local restaurants. Direct beach access was amazing and the kids loved it. The area felt safe and peaceful. Perfect for a family beach vacation. Cannot wait to come back!",
    reviewDate: "2024-04-19T15:30:00Z",
    stayDate: "2024-04-10",
    landlordResponse: null,
    helpful: 22,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Affordable 2BR in Rongai - Perfect Starter Home",
    bookingId: null,
    tenantId: "T3",
    tenantName: "Catherine Wanjiru",
    tenantPhoto: "/assets/images/users/tenant-3.jpg",
    landlordId: "11",
    landlordName: "John Kipchoge",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 3,
      location: 4,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Good first rental experience. The apartment is clean and affordable, perfect for our budget. Rongai is peaceful and has good matatu connections to town. The estate security is decent and there's a playground for kids. John could be more responsive to maintenance requests - it took 2 weeks to fix the kitchen sink. But overall, for the price, it's a fair deal. Would recommend for young families starting out.",
    reviewDate: "2023-12-15T12:00:00Z",
    stayDate: "2023-06-01",
    landlordResponse: {
      text: "Thank you Catherine. I apologize for the delay on the sink repair - we had challenges getting the right plumber. I've noted your feedback and will improve on response times. Glad you found the place suitable for your family.",
      responseDate: "2023-12-16T10:30:00Z",
    },
    helpful: 11,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Cozy 1BR in South C - Great for Young Professionals",
    bookingId: null,
    tenantId: "T2",
    tenantName: "Brian Otieno",
    tenantPhoto: "/assets/images/users/tenant-2.jpg",
    landlordId: "5",
    landlordName: "David Omondi",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Excellent apartment for young professionals! The location in South C is perfect - close to town and Mombasa Road where my office is. The gym in the building is well-equipped and I use it daily. David is a great landlord, very professional and quick to sort any issues. The apartment is exactly as advertised. Neighbors are quiet and respectful. Reliable water and power supply. Very happy with my choice and planning to renew my lease.",
    reviewDate: "2024-06-10T14:20:00Z",
    stayDate: "2024-02-01",
    landlordResponse: {
      text: "Thank you Brian! You've been an exemplary tenant and it's a pleasure having you. Looking forward to renewing your lease. Keep enjoying the facilities!",
      responseDate: "2024-06-11T09:00:00Z",
    },
    helpful: 16,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Elegant 3BR Maisonette in Lavington - Serene Environment",
    bookingId: null,
    tenantId: "T5",
    tenantName: "Eva Njoki",
    tenantPhoto: "/assets/images/users/tenant-5.jpg",
    landlordId: "7",
    landlordName: "Michael Kariuki",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 4,
      checkin: 5,
    },
    reviewText:
      "Beautiful maisonette in a prime Lavington location! The house is spacious, elegantly finished, and perfect for our family. Love the two-level layout - gives everyone their privacy. The gated community is very secure and quiet. Michael is professional and maintains the property excellently. The gardener comes weekly and keeps everything looking pristine. Close to good schools and Lavington Mall. Slightly pricey but worth it for the quality and location.",
    reviewDate: "2024-05-15T11:00:00Z",
    stayDate: "2024-03-01",
    landlordResponse: {
      text: "Thank you Eva! I'm delighted you're enjoying the maisonette. Quality and tenant satisfaction are my priorities. You're wonderful tenants and it's been great working with you.",
      responseDate: "2024-05-15T16:30:00Z",
    },
    helpful: 19,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Executive 4BR Townhouse in Runda - Premium Living",
    bookingId: null,
    tenantId: "T6",
    tenantName: "Felix Odhiambo",
    tenantPhoto: "/assets/images/users/tenant-6.jpg",
    landlordId: "10",
    landlordName: "Lucy Akinyi",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Outstanding property! As an expatriate family, we needed something special and this townhouse delivered beyond expectations. Three-level layout gives everyone space. Finishes are premium throughout. The estate amenities (clubhouse, pool, tennis courts) are world-class. Lucy has been exceptional - helped us settle in, introduced us to neighbors, always available for questions. Runda is safe, green, and peaceful. Kids love the estate and have made friends. Best housing decision we made!",
    reviewDate: "2024-03-20T13:45:00Z",
    stayDate: "2024-01-15",
    landlordResponse: {
      text: "Thank you Felix! It's been wonderful having your family in the estate. Your appreciation means a lot. Enjoy your time in Kenya and the townhouse is your home!",
      responseDate: "2024-03-21T10:00:00Z",
    },
    helpful: 27,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Modern 2BR in Ruaka - Great Value",
    bookingId: null,
    tenantId: "T8",
    tenantName: "Henry Mutiso",
    tenantPhoto: "/assets/images/users/tenant-8.jpg",
    landlordId: "8",
    landlordName: "Jane Muthoni",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 4,
      location: 5,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Good apartment in Ruaka, great for remote work. The WiFi is fast and reliable which is crucial for my job. Ruaka has grown a lot with plenty of shopping options. The apartment is modern and functional. Jane is a friendly landlord. Only downside is traffic during peak hours if you need to go to town, but the location is otherwise convenient. The price is very reasonable for what you get. Recommended for young professionals working in the area or remotely.",
    reviewDate: "2024-04-25T16:10:00Z",
    stayDate: "2024-02-15",
    landlordResponse: {
      text: "Thank you Henry for the review! Glad the apartment works well for your remote work needs. You're a great tenant. Yes, traffic can be challenging at times but the area has so much to offer. Happy to have you!",
      responseDate: "2024-04-26T09:30:00Z",
    },
    helpful: 13,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Executive 2BR Serviced Apartment in Riverside",
    bookingId: null,
    tenantId: "T9",
    tenantName: "Irene Wangui",
    tenantPhoto: "/assets/images/users/tenant-9.jpg",
    landlordId: "18",
    landlordName: "Patricia Atieno",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 4,
      checkin: 5,
    },
    reviewText:
      "Perfect serviced apartment for my 3-month medical assignment in Nairobi. The daily housekeeping is excellent and laundry service is so convenient. The location in Riverside is central to everything. Patricia and her team are very professional. The apartment has everything needed including workspace for my reports. The gym and pool are great for unwinding after long shifts. It's pricey but the convenience and service level justify the cost. Highly recommended for professionals on short-term assignments.",
    reviewDate: "2024-03-10T12:30:00Z",
    stayDate: "2024-02-01",
    landlordResponse: {
      text: "Thank you Irene! We're honored to have hosted you during your important medical work. Our team has enjoyed serving you. We appreciate medical professionals like you and wish you all the best in your assignment!",
      responseDate: "2024-03-10T15:00:00Z",
    },
    helpful: 21,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Spacious 4BR in Parklands - Diplomatic Area",
    bookingId: null,
    tenantId: "T9",
    tenantName: "Irene Wangui",
    tenantPhoto: "/assets/images/users/tenant-9.jpg",
    landlordId: "16",
    landlordName: "Hassan Ali",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Wonderful family apartment in Parklands! The space is generous with large rooms throughout. The location is fantastic - walking distance to Aga Khan Hospital (where I work), mosque, and shopping areas. Hassan is an excellent landlord, very respectful and responsive. The diplomatic neighborhood is safe and well-maintained. International schools nearby are great for families. The two balconies offer nice views. Good value for the size and location. Our family is very happy here!",
    reviewDate: "2024-02-28T11:15:00Z",
    stayDate: "2024-01-01",
    landlordResponse: {
      text: "Thank you so much! It's a joy to have your family as tenants. You take great care of the apartment. May you continue enjoying your home in Parklands!",
      responseDate: "2024-02-29T09:00:00Z",
    },
    helpful: 17,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Garden Estate 3BR House - Thika Road Bypass",
    bookingId: null,
    tenantId: "T3",
    tenantName: "Catherine Wanjiru",
    tenantPhoto: "/assets/images/users/tenant-3.jpg",
    landlordId: "17",
    landlordName: "Catherine Waithera",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 4,
      location: 5,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Great family house in a peaceful estate off Thika Road. The garden is perfect for our kids and dog. The neighborhood is quiet and safe with good schools nearby. Catherine (landlord) is friendly and easy to work with. Garden City Mall is very close which is convenient. The house is well-maintained though could use some minor repairs here and there. For families looking for suburban living with easy highway access, this is a solid choice. Good value for money.",
    reviewDate: "2024-01-28T14:40:00Z",
    stayDate: "2023-12-03",
    landlordResponse: {
      text: "Thank you for the feedback! I'm glad your family and dog are enjoying the house and garden. I'll schedule the minor repairs you mentioned. Thanks for being good tenants!",
      responseDate: "2024-01-29T10:00:00Z",
    },
    helpful: 15,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Budget-Friendly 1BR in Donholm Phase 8",
    bookingId: null,
    tenantId: "T10",
    tenantName: "James Kimani",
    tenantPhoto: "/assets/images/users/tenant-10.jpg",
    landlordId: "19",
    landlordName: "Francis Otieno",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 3,
      location: 4,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Decent budget apartment in Donholm. Clean and functional for the price. Good transport links to town and Industrial Area. The estate is okay with decent security. Francis is an okay landlord though he can be hard to reach sometimes. Water supply is mostly reliable. The playground is good for families. Nothing fancy but good value if you're on a tight budget. Does the job for basic accommodation needs.",
    reviewDate: "2024-03-05T10:20:00Z",
    stayDate: "2024-02-01",
    landlordResponse: {
      text: "Thanks James. I apologize for being difficult to reach - I'll work on my responsiveness. I appreciate you as a tenant and value your honest feedback.",
      responseDate: "2024-03-06T14:15:00Z",
    },
    helpful: 7,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Elegant 3BR Duplex in Kileleshwa - Modern Living",
    bookingId: null,
    tenantId: "T5",
    tenantName: "Eva Njoki",
    tenantPhoto: "/assets/images/users/tenant-5.jpg",
    landlordId: "20",
    landlordName: "Martin Kiptoo",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Stunning duplex in Kileleshwa! The two-level design is brilliant - very modern and spacious. High ceilings and large windows make it feel even bigger. The finishes are high quality throughout. Martin is an excellent landlord - professional, responsive, and maintains the property perfectly. The complex amenities (gym, pool, playground) are well-maintained. Kileleshwa is quiet yet close to everything - Westlands, Yaya, Junction all nearby. Excellent choice for families who appreciate quality. Worth every shilling!",
    reviewDate: "2024-01-15T15:50:00Z",
    stayDate: "2023-06-30",
    landlordResponse: {
      text: "Thank you Eva for the wonderful review! You and your family are ideal tenants. It's great to know you're enjoying the duplex and the area. Looking forward to a long tenancy!",
      responseDate: "2024-01-16T10:30:00Z",
    },
    helpful: 24,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Penthouse with Panoramic Views in Upper Hill",
    bookingId: null,
    tenantId: "T7",
    tenantName: "Grace Chebet",
    tenantPhoto: "/assets/images/users/tenant-7.jpg",
    landlordId: "12",
    landlordName: "Diana Chemutai",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "This penthouse is absolutely incredible! The 360-degree views of Nairobi are unmatched - you can see everything from Ngong Hills to the city skyline. Perfect for hosting business dinners on the terrace. The interior is luxuriously finished with top-quality everything. Diana is the perfect host - discreet, professional, and ensures everything is perfect. The building's rooftop pool and gym are excellent. Upper Hill location is central to everything. If you want the best, this is it. Exceeded all expectations!",
    reviewDate: "2024-03-27T13:00:00Z",
    stayDate: "2024-03-20",
    landlordResponse: {
      text: "Thank you Grace! The penthouse is designed for discerning guests like you. I'm thrilled it served your needs perfectly. You're always welcome back!",
      responseDate: "2024-03-27T16:45:00Z",
    },
    helpful: 33,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Family Home in Syokimau with SGR Access",
    bookingId: null,
    tenantId: "T8",
    tenantName: "Henry Mutiso",
    tenantPhoto: "/assets/images/users/tenant-8.jpg",
    landlordId: "13",
    landlordName: "Robert Mutua",
    rating: 4,
    categoryRatings: {
      cleanliness: 4,
      accuracy: 4,
      communication: 4,
      location: 5,
      value: 5,
      checkin: 4,
    },
    reviewText:
      "Good family house in Syokimau. The proximity to SGR station is the biggest advantage - makes commuting to town affordable and quick. The house is spacious with a nice garden. The neighborhood is peaceful and family-friendly. Robert is a decent landlord though maintenance can take time. The area has grown with good shopping and schools. It's a solid choice if you work in town but want suburban living. The price is very fair for what you get. Good for families on a budget.",
    reviewDate: "2023-12-20T11:30:00Z",
    stayDate: "2023-07-05",
    landlordResponse: {
      text: "Thank you Henry for your honest review. I apologize for any maintenance delays and will work to improve. Glad you're enjoying Syokimau and the convenient SGR access. Thanks for being a good tenant!",
      responseDate: "2023-12-21T09:00:00Z",
    },
    helpful: 10,
    reported: false,
  },
  {
    id: generateId(),
    propertyId: null,
    propertyTitle: "Modern 2BR in Kilimani near Yaya Centre",
    bookingId: null,
    tenantId: "T6",
    tenantName: "Felix Odhiambo",
    tenantPhoto: "/assets/images/users/tenant-6.jpg",
    landlordId: "15",
    landlordName: "Samuel Njoroge",
    rating: 5,
    categoryRatings: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      value: 5,
      checkin: 5,
    },
    reviewText:
      "Excellent apartment in prime Kilimani location! Walking distance to Yaya and Junction makes life so convenient. The apartment is modern, clean, and well-designed. Samuel is a fantastic landlord - very professional and responsive. The gym in the building is a great bonus. Love the balcony for morning coffee. The neighborhood has everything - restaurants, supermarkets, banks. Easy to get matatus or Ubers anywhere. Perfect for professionals who want to be in the heart of things. Highly recommended!",
    reviewDate: "2024-01-18T14:00:00Z",
    stayDate: "2023-09-22",
    landlordResponse: {
      text: "Thank you Felix! You've been an exemplary tenant. It's great landlords and tenants who work well together like we do. Enjoy the apartment and the vibrant Kilimani neighborhood!",
      responseDate: "2024-01-19T10:00:00Z",
    },
    helpful: 20,
    reported: false,
  },
];

/**
 * Helper functions for working with reviews
 */

// Get review by ID
export const getReviewById = (id) => {
  return MOCK_REVIEWS.find((review) => review.id === id) || null;
};

// Get reviews by property ID
export const getReviewsByProperty = (propertyId) => {
  return MOCK_REVIEWS.filter((review) => review.propertyId === propertyId);
};

// Get reviews by tenant ID
export const getReviewsByTenant = (tenantId) => {
  return MOCK_REVIEWS.filter((review) => review.tenantId === tenantId);
};

// Get reviews by landlord ID
export const getReviewsByLandlord = (landlordId) => {
  return MOCK_REVIEWS.filter((review) => review.landlordId === landlordId);
};

// Calculate average rating for a property
export const calculatePropertyAverageRating = (propertyId) => {
  const propertyReviews = getReviewsByProperty(propertyId);
  if (propertyReviews.length === 0) return 0;

  const sum = propertyReviews.reduce(
    (total, review) => total + review.rating,
    0,
  );
  return sum / propertyReviews.length;
};

// Calculate category averages for a property
export const calculatePropertyCategoryRatings = (propertyId) => {
  const propertyReviews = getReviewsByProperty(propertyId);
  if (propertyReviews.length === 0) {
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
    const sum = propertyReviews.reduce(
      (total, review) => total + (review.categoryRatings[category] || 0),
      0,
    );
    averages[category] = sum / propertyReviews.length;
  });

  return averages;
};

// Get reviews with landlord responses
export const getReviewsWithResponses = () => {
  return MOCK_REVIEWS.filter((review) => review.landlordResponse !== null);
};

// Get reviews without landlord responses
export const getReviewsWithoutResponses = () => {
  return MOCK_REVIEWS.filter((review) => review.landlordResponse === null);
};

// Get reviews by rating
export const getReviewsByRating = (rating) => {
  return MOCK_REVIEWS.filter((review) => review.rating === rating);
};

// Get recent reviews (last 30 days)
export const getRecentReviews = (days = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return MOCK_REVIEWS.filter((review) => {
    const reviewDate = new Date(review.reviewDate);
    return reviewDate >= cutoffDate;
  });
};

// Get helpful reviews (sorted by helpful count)
export const getHelpfulReviews = (limit = 10) => {
  return [...MOCK_REVIEWS]
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit);
};

// Get total reviews count
export const getTotalReviewsCount = () => {
  return MOCK_REVIEWS.length;
};

export default {
  MOCK_REVIEWS,
  getReviewById,
  getReviewsByProperty,
  getReviewsByTenant,
  getReviewsByLandlord,
  calculatePropertyAverageRating,
  calculatePropertyCategoryRatings,
  getReviewsWithResponses,
  getReviewsWithoutResponses,
  getReviewsByRating,
  getRecentReviews,
  getHelpfulReviews,
  getTotalReviewsCount,
};
