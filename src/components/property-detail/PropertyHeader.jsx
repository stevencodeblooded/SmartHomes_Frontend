// src/components/property-detail/PropertyHeader.jsx

import { Heart } from "lucide-react";

const PropertyHeader = ({ title, address, isFavorite, onToggleFavorite }) => {
  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500 text-sm">{address}</p>
        </div>

        <button
          onClick={onToggleFavorite}
          className="ml-4 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
          <span className="text-sm font-medium text-gray-700">
            Add to favorites
          </span>
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;
