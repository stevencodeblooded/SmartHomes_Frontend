// src/components/property-detail/PropertyBreadcrumb.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PropertyBreadcrumb = ({ items = [] }) => {
  const defaultItems = [
    { label: "Home", path: "/" },
    { label: "Apartments", path: "/search?type=apartments" },
    { label: "Woodland", path: "/search?location=woodland" },
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            to={item.path}
            className="hover:text-primary-600 transition-colors"
          >
            {item.label}
          </Link>
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default PropertyBreadcrumb;
