// src/components/property-detail/PropertyDetails.jsx

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PropertyDetails = ({ details, relatedLink }) => {
  const [showMore, setShowMore] = useState(false);

  const mainDetails = [
    { label: "Property type", value: details.propertyType },
    { label: "Room", value: details.rooms },
    { label: "Area", value: `${details.area} m²` },
  ];

  const additionalDetails = [
    { label: "Price", value: `Ksh. ${details.price}` },
    { label: "Lease period", value: details.leasePeriod },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Details</h3>
        {relatedLink && (
          <Link
            to={relatedLink.url}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            {relatedLink.text}
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {/* Always-visible rows */}
        {mainDetails.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1 border-b border-gray-200 last:border-0"
          >
            <span className="text-gray-600 text-sm">{detail.label}</span>
            <span className="font-semibold text-gray-900">{detail.value}</span>
          </div>
        ))}

        {/* Animated extra rows */}
        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              key="extra"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-4 pt-0">
                {additionalDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-600 text-sm">
                      {detail.label}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full mt-6 flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        <span>{showMore ? "Show less" : "Show more"}</span>
        <motion.div
          animate={{ rotate: showMore ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
    </div>
  );
};

export default PropertyDetails;
