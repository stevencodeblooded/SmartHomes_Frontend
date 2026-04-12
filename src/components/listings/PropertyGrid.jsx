// src/components/listings/PropertyGrid.jsx

import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <PropertyCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default PropertyGrid;
