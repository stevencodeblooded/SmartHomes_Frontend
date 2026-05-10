// src/components/property-detail/PropertyHeader.jsx

import { Heart } from "lucide-react";

const PropertyHeader = ({ title, address, isFavorite, onToggleFavorite }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1.5 leading-snug">
            {title}
          </h1>
          <p className="text-gray-500 text-sm">{address}</p>
        </div>

        <button
          onClick={onToggleFavorite}
          className="self-start sm:ml-4 flex items-center gap-2 px-3 py-2 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {isFavorite ? "Saved" : "Save"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;
