// src/components/common/Input.jsx

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = false,
      icon = null,
      iconPosition = "left",
      className = "",
      inputClassName = "",
      rows = 4,
      ...rest
    },
    ref,
  ) => {
    const baseInputClasses =
      "border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

    const errorClasses = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-primary-500";

    const widthClass = fullWidth ? "w-full" : "";

    const iconPaddingClasses = icon
      ? iconPosition === "left"
        ? "pl-12"
        : "pr-12"
      : "";

    const inputClasses = `${baseInputClasses} ${errorClasses} ${widthClass} ${iconPaddingClasses} ${inputClassName}`;

    const renderInput = () => {
      if (type === "textarea") {
        return (
          <textarea
            ref={ref}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            rows={rows}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${name}-error`
                : helperText
                  ? `${name}-helper`
                  : undefined
            }
            {...rest}
          />
        );
      }

      return (
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${name}-error` : helperText ? `${name}-helper` : undefined
          }
          {...rest}
        />
      );
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {renderInput()}

          {icon && iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${name}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${name}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "textarea",
  ]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  rows: PropTypes.number,
};

export default Input;
