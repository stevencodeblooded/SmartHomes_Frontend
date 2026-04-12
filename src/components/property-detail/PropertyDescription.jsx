// src/components/property-detail/PropertyDescription.jsx

import React from "react";

const PropertyDescription = ({ address, description }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{address}</h2>
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

export default PropertyDescription;
