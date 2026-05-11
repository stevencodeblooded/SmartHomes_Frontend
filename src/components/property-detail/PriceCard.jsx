// src/components/property-detail/PriceCard.jsx

import React from "react";
import { AlertCircle } from "lucide-react";

const PriceCard = ({
  price,
  affordability,
  leasePeriod,
  availableDates,
  onContactLandlord,
}) => {
  const getAffordabilityColor = () => {
    switch (affordability) {
      case "below":
        return "bg-red-100 text-red-800";
      case "average":
        return "bg-yellow-100 text-yellow-800";
      case "above":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAffordabilityText = () => {
    switch (affordability) {
      case "below":
        return "Prices are below";
      case "average":
        return "Prices are at";
      case "above":
        return "Prices are above";
      default:
        return "Price is";
    }
  };

  return (
    <div className="sticky top-28">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
        {/* Price */}
        <div className="mb-6">
          <p className="text-xs text-gray-600 mb-1">Monthly Rental Price</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-sm text-gray-600">Ksh.</span>
            <span className="text-3xl font-semibold text-gray-900">
              {price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Affordability Indicator */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700">
              Affordable:
            </span>
            <span
              className={`text-sm font-semibold ${affordability === "below" ? "text-red-600" : "text-gray-600"}`}
            >
              {getAffordabilityText()}
            </span>
            <span className="text-sm font-semibold text-gray-900">average</span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-full">
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow"
              style={{
                left:
                  affordability === "below"
                    ? "25%"
                    : affordability === "average"
                      ? "50%"
                      : "75%",
              }}
            />
          </div>

          <p className="text-xs text-gray-600 mt-3 leading-relaxed">
            The listing is priced well below the market average, making it a
            great value option for your budget.
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Lease period</span>
            <span className="text-sm font-semibold text-red-600">
              {leasePeriod}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Available dates</span>
            <span className="text-sm font-semibold text-red-600">
              {availableDates}
            </span>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={onContactLandlord}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-3xl transition-colors shadow-sm"
        >
          Contact the landlord
        </button>

        {/* Report Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700 mb-1">
                Have questions about this listing?
              </p>
              <button className="text-sm font-medium text-red-600 hover:text-red-700">
                Report
              </button>
              <span className="text-sm text-gray-600">
                {" "}
                Submit to our team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
