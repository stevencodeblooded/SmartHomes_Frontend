// src/components/property-detail/ContactModal.jsx

import React, { useState } from "react";
import {
  SignUpView,
  LoginView,
  SignUpFullView,
  ForgotPasswordView,
  StepIndicator,
  primaryBtn,
  // ModalShell and AnimatedView handle all animation + click-outside + Escape
  ModalShell,
  AnimatedView,
} from "../common/AuthViews";

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

  const renderView = (handleClose) => {
    switch (view) {
      case "signup":
        return (
          <AnimatedView viewKey="signup">
            <SignUpView
              onLoginClick={() => setView("login")}
              onSuccess={() => setView("contact")}
            />
          </AnimatedView>
        );
      case "login":
        return (
          <AnimatedView viewKey="login">
            <LoginView
              onSignUpClick={() => setView("signup")}
              onForgotClick={() => setView("forgot")}
              onSuccess={() => setView("contact")}
            />
          </AnimatedView>
        );
      case "signup-full":
        return (
          <AnimatedView viewKey="signup-full">
            <SignUpFullView onBackToLogin={() => setView("login")} />
          </AnimatedView>
        );
      case "forgot":
        return (
          <AnimatedView viewKey="forgot">
            <ForgotPasswordView onCancel={() => setView("login")} />
          </AnimatedView>
        );
      case "contact":
        return (
          <AnimatedView viewKey="contact">
            <ContactView onClose={handleClose} />
          </AnimatedView>
        );
      default:
        return null;
    }
  };

  return <ModalShell onClose={onClose}>{renderView}</ModalShell>;
};

export default ContactModal;
