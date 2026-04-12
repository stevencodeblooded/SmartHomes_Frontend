// src/components/common/AuthViews.jsx
// Shared auth UI used by both ContactModal and Header

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { ApartmentLogoNested } from "./ApartmentLogo";

// ── Icons ─────────────────────────────────────────────────────────────────────
export const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e53e3e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e53e3e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const HeartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e53e3e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ── Shared styles ─────────────────────────────────────────────────────────────
export const inputStyle = (hasError) => ({
  width: "100%",
  padding: "12px 16px",
  border: `1px solid ${hasError ? "#e53e3e" : "#e5e7eb"}`,
  borderRadius: 30,
  fontSize: 15,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
  color: "#1a2e44",
  outline: "none",
  boxSizing: "border-box",
});

export const inputWithIconStyle = (hasError) => ({
  ...inputStyle(hasError),
  paddingLeft: 40,
});

export const labelStyle = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "#1a2e44",
  marginBottom: 6,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
};

export const errorText = {
  color: "#e53e3e",
  fontSize: 13,
  marginTop: 4,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
};

export const primaryBtn = {
  width: "100%",
  padding: "13px 16px",
  background: "#e53e3e",
  color: "#fff",
  border: "none",
  borderRadius: 30,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
  cursor: "pointer",
  transition: "background 0.2s",
};

export const outlineBtn = {
  width: "100%",
  padding: "13px 16px",
  background: "#fff",
  color: "#e53e3e",
  border: "2px solid #e53e3e",
  borderRadius: 30,
  fontSize: 16,
  fontWeight: 700,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
  cursor: "pointer",
};

export const outlineBtnDark = {
  width: "100%",
  padding: "13px 16px",
  background: "#fff",
  color: "#1a2e44",
  border: "2px solid #e5e7eb",
  borderRadius: 30,
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

// ── Step indicator ────────────────────────────────────────────────────────────
export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "Sign up" },
    { num: 2, label: "Contact" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 32,
        gap: 0,
      }}
    >
      {steps.map((s, i) => (
        <React.Fragment key={s.num}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 72,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 15,
                border:
                  currentStep >= s.num
                    ? "2px solid #1a2e44"
                    : "2px solid #d1d5db",
                color: currentStep >= s.num ? "#1a2e44" : "#9ca3af",
                background: "#fff",
                marginBottom: 4,
              }}
            >
              {s.num}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: currentStep === s.num ? 700 : 400,
                color: currentStep === s.num ? "#1a2e44" : "#9ca3af",
                fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
              }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 1,
                background: "#d1d5db",
                marginTop: 18,
                minWidth: 60,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Tenant Dropdown ───────────────────────────────────────────────────────────
export const TenantDropdown = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const options = ["Single", "Student", "Couple", "Family"];
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "12px 40px 12px 16px",
          border: `1px solid ${error ? "#e53e3e" : open ? "#9ca3af" : "#e5e7eb"}`,
          borderRadius: 30,
          background: "#fff",
          textAlign: "left",
          fontSize: 15,
          color: value ? "#1a2e44" : "#9ca3af",
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
        }}
      >
        <span>{value || "Tenant Type"}</span>
        <ChevronDown
          size={18}
          color="#9ca3af"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            transition: "transform 0.2s",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            zIndex: 200,
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            overflow: "hidden",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                textAlign: "left",
                background: value === opt ? "#fef2f2" : "#fff",
                color: "#1a2e44",
                fontSize: 15,
                fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
                border: "none",
                cursor: "pointer",
                display: "block",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#fef2f2")}
              onMouseLeave={(e) =>
                (e.target.style.background = value === opt ? "#fef2f2" : "#fff")
              }
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── VIEW: Sign Up (contact flow) ──────────────────────────────────────────────
export const SignUpView = ({ onLoginClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    tenantType: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.firstName || formData.firstName.length < 2)
      e.firstName = "The name is too short.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) e.email = "Email is required.";
    else if (!emailRe.test(formData.email))
      e.email = "Incorrect email address.";
    if (!formData.tenantType) e.tenantType = "Tenant type is required.";
    if (!formData.acceptTerms)
      e.acceptTerms = "You must accept the terms and conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (key, val) => {
    setFormData((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  return (
    <>
      <StepIndicator currentStep={1} />
      <h2
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: "#1a2e44",
          textAlign: "center",
          marginBottom: 3,
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
        }}
      >
        Sign up to contact landlords
      </h2>
      <p
        style={{
          fontSize: 13,
          color: "#6b7280",
          textAlign: "center",
          marginBottom: 10,
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
        }}
      >
        And get instant access to benefits
      </p>
      {/* Benefits box */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 12,
          background: "#fff",
        }}
      >
        {[
          {
            Icon: ClockIcon,
            title: "Early Access",
            desc: "Get notified immediately when new listings are added",
          },
          {
            Icon: SearchIcon,
            title: "Personalized Search",
            desc: "Create search agents with your preferences",
          },
          {
            Icon: HeartIcon,
            title: "Save Listings",
            desc: "Save your favorite listings to your profile",
          },
        ].map(({ Icon, title, desc }, i) => (
          <div
            key={title}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              paddingBottom: i < 2 ? 12 : 0,
              marginBottom: i < 2 ? 12 : 0,
              borderBottom: i < 2 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <div style={{ marginTop: 2, flexShrink: 0 }}>
              <Icon />
            </div>
            <div>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#1a2e44",
                  margin: 0,
                  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  margin: 0,
                  fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) onSuccess();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              style={inputWithIconStyle(!!errors.firstName)}
            />
          </div>
          {errors.firstName && <p style={errorText}>{errors.firstName}</p>}
        </div>
        <div>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <MailIcon />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => set("email", e.target.value)}
              style={inputWithIconStyle(!!errors.email)}
            />
          </div>
          {errors.email && <p style={errorText}>{errors.email}</p>}
        </div>
        <div>
          <TenantDropdown
            value={formData.tenantType}
            onChange={(v) => set("tenantType", v)}
            error={errors.tenantType}
          />
          {errors.tenantType && <p style={errorText}>{errors.tenantType}</p>}
        </div>
        <button type="submit" style={primaryBtn}>
          Sign Up
        </button>
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => set("acceptTerms", e.target.checked)}
              style={{
                marginTop: 3,
                accentColor: "#e53e3e",
                width: 15,
                height: 15,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "#6b7280",
                fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
              }}
            >
              I agree to the{" "}
              <a
                href="#"
                style={{ color: "#e53e3e", textDecoration: "underline" }}
              >
                terms &amp; conditions
              </a>{" "}
              and to receive the newest listings and updates by email
            </span>
          </label>
          {errors.acceptTerms && <p style={errorText}>{errors.acceptTerms}</p>}
        </div>
      </form>
      <div style={{ display: "flex", alignItems: "center", margin: "18px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <span
          style={{
            padding: "0 12px",
            fontSize: 14,
            color: "#6b7280",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          Or
        </span>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#374151",
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          margin: 0,
        }}
      >
        Already a member?{" "}
        <button
          onClick={onLoginClick}
          style={{
            background: "none",
            border: "none",
            color: "#1a2e44",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "underline",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
            padding: 0,
          }}
        >
          Login here
        </button>
      </p>
    </>
  );
};

// ── VIEW: Login ───────────────────────────────────────────────────────────────
export const LoginView = ({ onSignUpClick, onForgotClick, onSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRe.test(form.email)) e.email = "Incorrect email.";
    if (!form.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  return (
    <>
      <button type="button" style={{ ...outlineBtnDark, marginBottom: 18 }}>
        <GoogleIcon />
        Sign In with Google
      </button>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <span
          style={{
            padding: "0 12px",
            fontSize: 13,
            color: "#9ca3af",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          or continue with email
        </span>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate() && onSuccess) onSuccess();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            style={inputStyle(!!errors.email)}
          />
          {errors.email && <p style={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            style={inputStyle(!!errors.password)}
          />
          {errors.password && <p style={errorText}>{errors.password}</p>}
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 14,
            color: "#374151",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => set("remember", e.target.checked)}
            style={{ accentColor: "#e53e3e", width: 15, height: 15 }}
          />
          Remember me
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={onSignUpClick}
            style={{ ...outlineBtnDark, flex: 1, fontWeight: 700 }}
          >
            Sign Up
          </button>
          <button type="submit" style={{ ...primaryBtn, flex: 1 }}>
            Sign In
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          onClick={onForgotClick}
          style={{
            background: "none",
            border: "none",
            color: "#1a2e44",
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "underline",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          Forgot password?
        </button>
      </div>
    </>
  );
};

// ── VIEW: Sign Up Full ────────────────────────────────────────────────────────
export const SignUpFullView = ({ onBackToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 2) e.name = "Name is too short.";
    if (!form.surname || form.surname.length < 2)
      e.surname = "Surname is too short.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRe.test(form.email))
      e.email = "Incorrect email address.";
    if (!form.password || form.password.length < 8)
      e.password = "At least 8 characters, 1 capital letter and 1 number.";
    if (!form.acceptTerms) e.acceptTerms = "You must accept the terms.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  return (
    <>
      <button type="button" style={{ ...outlineBtnDark, marginBottom: 18 }}>
        <GoogleIcon />
        Sign Up with Google
      </button>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <span
          style={{
            padding: "0 12px",
            fontSize: 13,
            color: "#9ca3af",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          or continue with email
        </span>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validate();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Name*</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              style={inputStyle(!!errors.name)}
            />
            {errors.name && <p style={errorText}>{errors.name}</p>}
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Surname*</label>
            <input
              type="text"
              value={form.surname}
              onChange={(e) => set("surname", e.target.value)}
              style={inputStyle(!!errors.surname)}
            />
            {errors.surname && <p style={errorText}>{errors.surname}</p>}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Email*</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            style={inputStyle(!!errors.email)}
          />
          {errors.email && <p style={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label style={labelStyle}>Password*</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            style={inputStyle(!!errors.password)}
          />
          <p
            style={{
              fontSize: 12,
              color: "#9ca3af",
              marginTop: 4,
              fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
            }}
          >
            At least 8 characters, 1 capital letter and 1 number
          </p>
          {errors.password && <p style={errorText}>{errors.password}</p>}
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 13,
            color: "#374151",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          }}
        >
          <input
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => set("acceptTerms", e.target.checked)}
            style={{ accentColor: "#e53e3e", width: 15, height: 15 }}
          />
          I agree{" "}
          <a href="#" style={{ color: "#e53e3e", textDecoration: "underline" }}>
            Terms and Conditions
          </a>{" "}
          *
        </label>
        {errors.acceptTerms && <p style={errorText}>{errors.acceptTerms}</p>}
        <button type="submit" style={primaryBtn}>
          Sign Up
        </button>
        <button type="button" onClick={onBackToLogin} style={outlineBtnDark}>
          Already have an account?
        </button>
      </form>
    </>
  );
};

// ── VIEW: Forgot Password ─────────────────────────────────────────────────────
export const ForgotPasswordView = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      setError("Incorrect email address.");
      return;
    }
    setSent(true);
  };

  if (sent)
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
        <h3
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "#1a2e44",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
            marginBottom: 8,
          }}
        >
          Check your email
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#6b7280",
            fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
            marginBottom: 20,
          }}
        >
          We've sent a magic login link to <strong>{email}</strong>
        </p>
        <button onClick={onCancel} style={outlineBtnDark}>
          Back to Sign In
        </button>
      </div>
    );

  return (
    <>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "#1a2e44",
          textAlign: "center",
          marginBottom: 6,
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
        }}
      >
        Enter your email and we'll email you a magic login link ✨
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginTop: 20,
        }}
      >
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="Please enter email of your account"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            style={inputStyle(!!error)}
          />
          {error && <p style={errorText}>{error}</p>}
        </div>
        <button type="submit" style={primaryBtn}>
          Send me a link
        </button>
        <button type="button" onClick={onCancel} style={outlineBtn}>
          Cancel
        </button>
      </form>
    </>
  );
};

// ── AUTH MODAL WRAPPER (reusable shell) ───────────────────────────────────────
// startView: "login" | "signup-full" | "forgot"
export const AuthModal = ({ onClose, startView = "login" }) => {
  const [view, setView] = useState(startView);

  const renderView = () => {
    switch (view) {
      case "login":
        return (
          <LoginView
            onSignUpClick={() => setView("signup-full")}
            onForgotClick={() => setView("forgot")}
            onSuccess={onClose}
          />
        );
      case "signup-full":
        return <SignUpFullView onBackToLogin={() => setView("login")} />;
      case "forgot":
        return <ForgotPasswordView onCancel={() => setView("login")} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        padding: 16,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: 440,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 32,
          zIndex: 10000,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <X size={20} color="#374151" />
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 65,
              height: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ApartmentLogoNested />
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#1a2e44",
              fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
              letterSpacing: "-0.3px",
            }}
          >
            SmartHomes
          </span>
        </div>
        {renderView()}
      </div>
    </div>
  );
};
