// src/components/common/Dropdown.jsx

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";

const Dropdown = ({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  searchable = false,
  multiple = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  const handleSelect = (option) => {
    if (multiple) {
      const newValue = value?.includes(option.value)
        ? value.filter((v) => v !== option.value)
        : [...(value || []), option.value];
      onChange({ target: { name, value: newValue } });
    } else {
      onChange({ target: { name, value: option.value } });
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const isSelected = (option) => {
    if (multiple) {
      return value?.includes(option.value);
    }
    return value === option.value;
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;
      const selectedOptions = options.filter((opt) =>
        value.includes(opt.value),
      );
      return selectedOptions.map((opt) => opt.label).join(", ");
    }
    const selectedOption = options.find((opt) => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const baseClasses =
    "border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`relative ${widthClass} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${widthClass} flex items-center justify-between text-left`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {getDisplayValue()}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto max-h-48" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    isSelected(option)
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-900"
                  }`}
                  role="option"
                  aria-selected={isSelected(option)}
                >
                  <span>{option.label}</span>
                  {isSelected(option) && (
                    <FiCheck className="text-primary-500" size={18} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  className: PropTypes.string,
};

export default Dropdown;
