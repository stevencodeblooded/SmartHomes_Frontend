// src/components/common/EmptyState.jsx

import React from "react";
import PropTypes from "prop-types";
import { FiInbox, FiSearch, FiHome, FiFolder, FiFile } from "react-icons/fi";
import Button from "./Button";

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionText,
  onAction,
  type = "default",
  className = "",
}) => {
  const typeConfig = {
    default: {
      icon: <FiInbox size={64} />,
      title: "No items found",
      description: "There are no items to display at the moment.",
    },
    search: {
      icon: <FiSearch size={64} />,
      title: "No results found",
      description:
        "Try adjusting your search or filters to find what you're looking for.",
    },
    properties: {
      icon: <FiHome size={64} />,
      title: "No properties found",
      description:
        "There are no properties matching your criteria. Try adjusting your filters.",
    },
    bookings: {
      icon: <FiFolder size={64} />,
      title: "No bookings yet",
      description: "You don't have any bookings at the moment.",
    },
    listings: {
      icon: <FiHome size={64} />,
      title: "No listings yet",
      description: "You haven't created any property listings yet.",
    },
    messages: {
      icon: <FiFile size={64} />,
      title: "No messages",
      description: "You don't have any messages yet.",
    },
  };

  const config = typeConfig[type];
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="text-gray-300 mb-4">{displayIcon}</div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {displayTitle}
      </h3>

      <p className="text-gray-600 mb-6 max-w-md">{displayDescription}</p>

      {(action || onAction) && (
        <div>
          {action || (
            <Button onClick={onAction} variant="primary">
              {actionText || "Get Started"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  type: PropTypes.oneOf([
    "default",
    "search",
    "properties",
    "bookings",
    "listings",
    "messages",
  ]),
  className: PropTypes.string,
};

// Small Empty State (for smaller containers)
export const SmallEmptyState = ({ title, description, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}
    >
      <div className="text-gray-300 mb-2">
        <FiInbox size={40} />
      </div>

      <h4 className="text-base font-medium text-gray-900 mb-1">{title}</h4>

      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

SmallEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
};

export default EmptyState;
