// src/pages/PropertyDetailPage.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/property-detail/ImageGallery";
import PropertyBreadcrumb from "../components/property-detail/PropertyBreadcrumb";
import PropertyHeader from "../components/property-detail/PropertyHeader";
import PropertyDescription from "../components/property-detail/PropertyDescription";
import PropertyDetails from "../components/property-detail/PropertyDetails";
import PropertyMap from "../components/property-detail/PropertyMap";
import PriceCard from "../components/property-detail/PriceCard";
import ContactModal from "../components/property-detail/ContactModal";
import PropertyReviews from "../components/property-detail/PropertyReviews";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample property data - replace with API call
  const property = {
    id: 1,
    title: "3 bedroom apartment of 111m² in Woodlands",
    address: "580 Woodlands Drive 16, Singapore 730580, Singapore",
    fullAddress: "580 Woodlands Drive 16, Singapore 730580",
    price: 1750,
    affordability: "below", // 'below', 'average', 'above'
    leasePeriod: "Unlimited",
    availableDates: "As soon as possible",
    description: `Whole unit Rental At Woodland Blk 580 Furnished Aircon near admiralty mrt Immediate Call David PNG Singapore for rent, Woodlands HDB flat for rent in Singapore! Located at 580 Woodlands, 3 Bedrooms 2 Sanitary, Complete For Rent! With air conditioning. Near the Admiralty subway station. Contact David. Whole unit Rental At Woodland Blk 580 Furnished Aircon near admiralty mrt Immediate Call David PNG Singapore for rent, Woodlands HDB flat for rent in Singapore! Located at 580 Woodlands, 3 Bedrooms 2 Sanitary, Complete For Rent! With air conditioning. Near the Admiralty subway station. Contact David.`,
    details: {
      propertyType: "Apartments",
      rooms: 3,
      area: 111,
      price: 1750,
      leasePeriod: "Unlimited",
    },
    location: {
      address: "Yes Horticulture, CP, Singapore 530684",
      lat: 1.3521,
      lng: 103.8198,
    },
    relatedLink: {
      text: "View all apartments in Nairobi",
      url: "/search?location=Nairobi&type=apartments",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      {/* Image Gallery */}
      <ImageGallery images={property.images} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-6">
            <PropertyBreadcrumb />

            <PropertyHeader
              title={property.title}
              address={property.address}
              isFavorite={isFavorite}
              onToggleFavorite={() => setIsFavorite(!isFavorite)}
            />

            <PropertyDescription
              address={property.fullAddress}
              description={property.description}
            />

            <PropertyDetails
              details={property.details}
              relatedLink={property.relatedLink}
            />

            <PropertyMap location={property.location} />

            <PropertyReviews />
          </div>

          {/* Right Sidebar - Sticky Price Card */}
          <div className="lg:col-span-1">
            <PriceCard
              price={property.price}
              affordability={property.affordability}
              leasePeriod={property.leasePeriod}
              availableDates={property.availableDates}
              onContactLandlord={() => setShowContactModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
};

export default PropertyDetailPage;
