// src/components/common/Loader.jsx

import React from "react";
import PropTypes from "prop-types";
import { FiLoader } from "react-icons/fi";

const Loader = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  fullScreen = false,
  text = null,
  className = "",
}) => {
  const sizeClasses = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const colorClasses = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    white: "text-white",
    gray: "text-gray-500",
  };

  const iconSize = sizeClasses[size];
  const colorClass = colorClasses[color];

  const renderSpinner = () => (
    <FiLoader size={iconSize} className={`animate-spin ${colorClass}`} />
  );

  const renderDots = () => (
    <div className="flex gap-2">
      <div
        className={`w-3 h-3 rounded-full ${colorClass.replace("text-", "bg-")} animate-bounce`}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={`w-3 h-3 rounded-full ${colorClass.replace("text-", "bg-")} animate-bounce`}
        style={{ animationDelay: "150ms" }}
      />
      <div
        className={`w-3 h-3 rounded-full ${colorClass.replace("text-", "bg-")} animate-bounce`}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );

  const renderPulse = () => (
    <div
      className={`w-12 h-12 rounded-full ${colorClass.replace("text-", "bg-")} animate-pulse`}
    />
  );

  const renderBars = () => (
    <div className="flex gap-1 items-end h-8">
      <div
        className={`w-2 ${colorClass.replace("text-", "bg-")} animate-pulse`}
        style={{ height: "100%", animationDelay: "0ms" }}
      />
      <div
        className={`w-2 ${colorClass.replace("text-", "bg-")} animate-pulse`}
        style={{ height: "80%", animationDelay: "150ms" }}
      />
      <div
        className={`w-2 ${colorClass.replace("text-", "bg-")} animate-pulse`}
        style={{ height: "60%", animationDelay: "300ms" }}
      />
      <div
        className={`w-2 ${colorClass.replace("text-", "bg-")} animate-pulse`}
        style={{ height: "80%", animationDelay: "450ms" }}
      />
      <div
        className={`w-2 ${colorClass.replace("text-", "bg-")} animate-pulse`}
        style={{ height: "100%", animationDelay: "600ms" }}
      />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bars":
        return renderBars();
      case "spinner":
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      {renderLoader()}
      {text && <p className={`text-sm font-medium ${colorClass}`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {content}
      </div>
    );
  }

  return content;
};

Loader.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  variant: PropTypes.oneOf(["spinner", "dots", "pulse", "bars"]),
  color: PropTypes.oneOf(["primary", "secondary", "white", "gray"]),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
};

// Skeleton Loader Component
export const Skeleton = ({
  width = "100%",
  height = "20px",
  circle = false,
  count = 1,
  className = "",
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`bg-gray-200 animate-pulse ${circle ? "rounded-full" : "rounded"} ${className}`}
      style={{ width, height }}
    />
  ));

  return count > 1 ? (
    <div className="flex flex-col gap-2">{skeletons}</div>
  ) : (
    skeletons[0]
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  circle: PropTypes.bool,
  count: PropTypes.number,
  className: PropTypes.string,
};

// Property Card Skeleton
export const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton height="200px" className="rounded-none" />
      <div className="p-4">
        <Skeleton height="24px" width="80%" className="mb-2" />
        <Skeleton height="16px" width="60%" className="mb-3" />
        <div className="flex gap-4 mb-3">
          <Skeleton height="16px" width="30%" />
          <Skeleton height="16px" width="30%" />
        </div>
        <Skeleton height="20px" width="40%" />
      </div>
    </div>
  );
};

// List Skeleton
export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton width="48px" height="48px" circle />
          <div className="flex-1">
            <Skeleton height="16px" width="70%" className="mb-2" />
            <Skeleton height="14px" width="50%" />
          </div>
        </div>
      ))}
    </div>
  );
};

ListSkeleton.propTypes = {
  count: PropTypes.number,
};

export default Loader;
