// src/components/common/Badge.jsx

import React from "react";
import PropTypes from "prop-types";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = true,
  icon = null,
  iconPosition = "left",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center gap-1.5 font-medium transition-colors";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    dark: "bg-gray-800 text-white",
    outline: "border border-gray-300 text-gray-700 bg-white",
    outlinePrimary: "border border-primary-500 text-primary-700 bg-white",
  };

  const sizeClasses = {
    xs: "text-xs px-2 py-0.5",
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
    xl: "text-lg px-5 py-2",
  };

  const roundedClasses = rounded ? "rounded-full" : "rounded";

  const clickableClasses = onClick ? "cursor-pointer hover:opacity-80" : "";

  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${clickableClasses} ${className}`;

  return (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClick(e);
              }
            }
          : undefined
      }
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="flex items-center">{icon}</span>
      )}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "dark",
    "outline",
    "outlinePrimary",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  rounded: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Status Badge Component with predefined statuses
export const StatusBadge = ({ status, size = "md", className = "" }) => {
  const statusConfig = {
    active: { variant: "success", label: "Active" },
    inactive: { variant: "default", label: "Inactive" },
    pending: { variant: "warning", label: "Pending" },
    confirmed: { variant: "success", label: "Confirmed" },
    cancelled: { variant: "danger", label: "Cancelled" },
    completed: { variant: "success", label: "Completed" },
    rejected: { variant: "danger", label: "Rejected" },
    paid: { variant: "success", label: "Paid" },
    unpaid: { variant: "danger", label: "Unpaid" },
    partial: { variant: "warning", label: "Partial" },
    verified: { variant: "success", label: "Verified" },
    unverified: { variant: "default", label: "Unverified" },
  };

  const config = statusConfig[status.toLowerCase()] || {
    variant: "default",
    label: status,
  };

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {config.label}
    </Badge>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

// Notification Badge (small dot indicator)
export const NotificationBadge = ({
  count,
  max = 99,
  showZero = false,
  className = "",
}) => {
  if (count === 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={`absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ${className}`}
    >
      {displayCount}
    </span>
  );
};

NotificationBadge.propTypes = {
  count: PropTypes.number.isRequired,
  max: PropTypes.number,
  showZero: PropTypes.bool,
  className: PropTypes.string,
};

// Verified Badge
export const VerifiedBadge = ({ size = "md", className = "" }) => {
  return (
    <Badge variant="success" size={size} className={className}>
      ✓ Verified
    </Badge>
  );
};

VerifiedBadge.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

// Featured Badge
export const FeaturedBadge = ({ size = "md", className = "" }) => {
  return (
    <Badge variant="warning" size={size} className={className}>
      ⭐ Featured
    </Badge>
  );
};

FeaturedBadge.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

// New Badge
export const NewBadge = ({ size = "sm", className = "" }) => {
  return (
    <Badge variant="primary" size={size} className={className}>
      New
    </Badge>
  );
};

NewBadge.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

export default Badge;
