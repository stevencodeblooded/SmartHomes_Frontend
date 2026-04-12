// src/components/common/Card.jsx

import React from "react";
import PropTypes from "prop-types";

const Card = ({
  children,
  className = "",
  padding = "default",
  shadow = "default",
  hover = false,
  bordered = false,
  onClick,
  as = "div",
}) => {
  const baseClasses = "bg-white rounded-xl transition-all duration-200";

  const paddingClasses = {
    none: "",
    sm: "p-3",
    default: "p-4 md:p-6",
    lg: "p-6 md:p-8",
    xl: "p-8 md:p-10",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const hoverClasses = hover
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : "";

  const borderClasses = bordered ? "border border-gray-200" : "";

  const clickableClasses = onClick ? "cursor-pointer" : "";

  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClasses} ${borderClasses} ${clickableClasses} ${className}`;

  const Component = as;

  return (
    <Component
      className={cardClasses}
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
      {children}
    </Component>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(["none", "sm", "default", "lg", "xl"]),
  shadow: PropTypes.oneOf(["none", "sm", "default", "lg", "xl"]),
  hover: PropTypes.bool,
  bordered: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.string,
};

// Card Header Component
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Title Component
export const CardTitle = ({ children, className = "", as = "h3" }) => {
  const Component = as;
  return (
    <Component className={`text-xl font-bold text-gray-900 ${className}`}>
      {children}
    </Component>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
};

// Card Body Component
export const CardBody = ({ children, className = "" }) => {
  return <div className={`text-gray-600 ${className}`}>{children}</div>;
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card Footer Component
export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
