// src/components/common/Breadcrumb.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumb = ({
  items,
  showHome = true,
  separator = <FiChevronRight size={16} />,
  className = "",
}) => {
  if (!items || items.length === 0) return null;

  const allItems = showHome
    ? [{ label: "Home", path: "/", icon: <FiHome size={16} /> }, ...items]
    : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-2 text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isLast ? (
                <span
                  className="text-gray-900 font-medium flex items-center gap-2"
                  aria-current="page"
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
                >
                  {item.icon && isFirst && <span>{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      icon: PropTypes.node,
    }),
  ).isRequired,
  showHome: PropTypes.bool,
  separator: PropTypes.node,
  className: PropTypes.string,
};

// Breadcrumb with background
export const BreadcrumbWithBg = ({
  items,
  showHome = true,
  className = "",
}) => {
  return (
    <div className={`bg-gray-50 border-b border-gray-200 py-4 ${className}`}>
      <div className="container mx-auto px-4">
        <Breadcrumb items={items} showHome={showHome} />
      </div>
    </div>
  );
};

BreadcrumbWithBg.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      icon: PropTypes.node,
    }),
  ).isRequired,
  showHome: PropTypes.bool,
  className: PropTypes.string,
};

export default Breadcrumb;
