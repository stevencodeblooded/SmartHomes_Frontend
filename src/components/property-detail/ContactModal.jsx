// src/components/property-detail/ContactModal.jsx

import React, { useState } from "react";
import { X } from "lucide-react";
import { ApartmentLogoNested } from "../common/ApartmentLogo";
import {
  SignUpView,
  LoginView,
  SignUpFullView,
  ForgotPasswordView,
} from "../common/AuthViews";
import { StepIndicator, primaryBtn } from "../common/AuthViews";

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = () => (
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
);

// ── Contact success view ──────────────────────────────────────────────────────

const ContactView = ({ onClose }) => (
  <>
    <StepIndicator currentStep={2} />
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1a2e44",
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          marginBottom: 8,
        }}
      >
        You're all set!
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#6b7280",
          fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
          marginBottom: 24,
        }}
      >
        You can now contact this landlord directly.
      </p>
      <button
        style={{ ...primaryBtn, maxWidth: 240, margin: "0 auto" }}
        onClick={onClose}
      >
        Contact Landlord
      </button>
    </div>
  </>
);

// ── Main Modal ────────────────────────────────────────────────────────────────
const ContactModal = ({ onClose }) => {
  const [view, setView] = useState("signup");

  const renderView = () => {
    switch (view) {
      case "signup":
        return (
          <SignUpView
            onLoginClick={() => setView("login")}
            onSuccess={() => setView("contact")}
          />
        );
      case "login":
        return (
          <LoginView
            onSignUpClick={() => setView("signup-full")}
            onForgotClick={() => setView("forgot")}
            onSuccess={() => setView("contact")}
          />
        );
      case "signup-full":
        return <SignUpFullView onBackToLogin={() => setView("login")} />;
      case "forgot":
        return <ForgotPasswordView onCancel={() => setView("login")} />;
      case "contact":
        return <ContactView onClose={onClose} />;
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
        <Logo />
        {renderView()}
      </div>
    </div>
  );
};

export default ContactModal;
