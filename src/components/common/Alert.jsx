// src/components/common/Alert.jsx

import React from "react";
import PropTypes from "prop-types";
import {
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";

const Alert = ({
  type = "info",
  title,
  message,
  onClose,
  closable = false,
  icon = true,
  className = "",
}) => {
  const typeConfig = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-500",
      icon: <FiCheckCircle size={20} />,
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-500",
      icon: <FiAlertCircle size={20} />,
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-500",
      icon: <FiAlertTriangle size={20} />,
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-500",
      icon: <FiInfo size={20} />,
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            {config.icon}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold ${config.textColor} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${config.textColor}`}>{message}</p>
          )}
        </div>

        {closable && onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${config.textColor} hover:opacity-75 transition-opacity`}
            aria-label="Close alert"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  icon: PropTypes.bool,
  className: PropTypes.string,
};

// Inline Alert (smaller, no border)
export const InlineAlert = ({ type = "info", message, className = "" }) => {
  const typeConfig = {
    success: "text-green-700 bg-green-50",
    error: "text-red-700 bg-red-50",
    warning: "text-yellow-700 bg-yellow-50",
    info: "text-blue-700 bg-blue-50",
  };

  return (
    <div
      className={`${typeConfig[type]} px-3 py-2 rounded text-sm ${className}`}
    >
      {message}
    </div>
  );
};

InlineAlert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Alert;
