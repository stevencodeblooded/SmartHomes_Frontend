// src/components/common/Button.jsx

import React from "react";
import PropTypes from "prop-types";
import { FiLoader } from "react-icons/fi";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  className = "",
  ...rest
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg focus:ring-primary-500",
    secondary:
      "bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500 focus:ring-primary-500",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    success:
      "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg focus:ring-green-500",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg focus:ring-yellow-500",
    dark: "bg-gray-800 hover:bg-gray-900 text-white shadow-md hover:shadow-lg focus:ring-gray-700",
  };

  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <FiLoader className="animate-spin" size={18} />
          <span>Loading...</span>
        </>
      );
    }

    if (icon && iconPosition === "left") {
      return (
        <>
          <span className="flex items-center">{icon}</span>
          {children}
        </>
      );
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          {children}
          <span className="flex items-center">{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "danger",
    "ghost",
    "success",
    "warning",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
};

export default Button;
