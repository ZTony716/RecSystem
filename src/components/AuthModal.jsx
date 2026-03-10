import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  checkUsernameAvailable,
  resetPassword,
} from "../utils/auth.js";

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    identifier: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const [usernameStatus, setUsernameStatus] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);

  useEffect(() => {
    if (showAuthModal) {
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        identifier: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setError("");
      setMode("login");
      setUsernameStatus("");
      setUsernameTouched(false);
    }
  }, [showAuthModal]);

  const passwordStrength = useMemo(() => {
  const password = form.password;

  if (!password) {
        return {
        level: "",
        width: "0%",
        className: "",
        };
    }

    let score = 0;

    if (password.length >= 6) score += 1;
    if (/[a-zA-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) {
        return {
        level: "Weak",
        width: "33%",
        className: "strengthBarFill--weak",
        };
    }

    if (score <= 3) {
        return {
        level: "Medium",
        width: "66%",
        className: "strengthBarFill--medium",
        };
    }

    return {
        level: "Strong",
        width: "100%",
        className: "strengthBarFill--strong",
    };
    }, [form.password]);

  if (!showAuthModal) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username" && mode === "register") {
      setUsernameStatus("");
      setUsernameTouched(false);
    }
  }

  function handleUsernameBlur() {
    if (mode !== "register") return;

    const value = form.username.trim();
    setUsernameTouched(true);

    if (!value) {
      setUsernameStatus("");
      return;
    }

    const available = checkUsernameAvailable(value);
    setUsernameStatus(available ? "available" : "taken");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const available = checkUsernameAvailable(form.username);
      if (!available) {
        setError("Username already exists. Please choose another username.");
        setUsernameStatus("taken");
        setUsernameTouched(true);
        return;
      }
    }

    if (mode === "forgot") {
        if (form.newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (form.newPassword !== form.confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            resetPassword({
            identifier: form.identifier,
            newPassword: form.newPassword,
            });

            setError("");
            setMode("login");
            setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            identifier: "",
            newPassword: "",
            confirmNewPassword: "",
            });
            alert("Password reset successfully. Please log in.");
        } catch (err) {
            setError(err.message);
        }

        return;
    }

    try {
      if (mode === "login") {
        login({
          username: form.username,
          password: form.password,
        });
      } else {
        register({
          username: form.username,
          email: form.email,
          password: form.password,
        });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function switchToRegister() {
    setMode("register");
    setError("");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      identifier: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setUsernameStatus("");
    setUsernameTouched(false);
  }

  function switchToLogin() {
    setMode("login");
    setError("");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      identifier: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setUsernameStatus("");
    setUsernameTouched(false);
  }
  function switchToForgot() {
    setMode("forgot");
    setError("");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      identifier: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setUsernameStatus("");
    setUsernameTouched(false);
  }

  return (
    <div className="authModalOverlay">
      <div className="authModal">
        <button
          className="authClose"
          onClick={closeAuthModal}
          aria-label="Close"
        >
          ×
        </button>

        <div className="authLogo">RecSys Demo</div>

        <h2 className="authTitle">
          {mode === "login"
            ? "Welcome"
            : mode === "register"
            ? "Create Account"
            : "Reset Password"}
        </h2>

        <p className="authSubtitle">
          {mode === "login"
            ? "Sign in to save your browsing history and recommendations."
            : mode === "register"
            ? "Create an account to get your own personalized recommendations."
            : "Enter your username or email and choose a new password."}
        </p>

        <form className="authGlassForm" onSubmit={handleSubmit}>
          {mode === "register" &&
            usernameTouched &&
            usernameStatus === "available" && (
              <div className="inputHint inputHint--success">
                Username is available.
              </div>
            )}

          {mode === "register" &&
            usernameTouched &&
            usernameStatus === "taken" && (
              <div className="inputHint inputHint--error">
                Username is already taken.
              </div>
            )}

          {mode !== "forgot" && (
            <input
                name="username"
                type="text"
                placeholder={mode === "login" ? "Username or Email" : "Username"}
                value={form.username}
                onChange={handleChange}
                onBlur={handleUsernameBlur}
                required
            />
            )}

          {mode === "register" && (
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
          )}


          {mode === "forgot" && (
            <input
                name="identifier"
                type="text"
                placeholder="Username or Email"
                value={form.identifier}
                onChange={handleChange}
                required
            />
          )}

          {mode !== "forgot" && (
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
          )}

          {mode === "register" && (
            <>
                <div className="passwordRule">
                Password must be at least 6 characters and contain letters or numbers.
                </div>

                <div className="strengthBar">
                <div
                    className={`strengthBarFill ${passwordStrength.className}`}
                    style={{ width: passwordStrength.width }}
                />
                </div>

                {(mode === "register" && form.password) ||
                    (mode === "forgot" && form.newPassword) ? (
                    <div className="strengthText">
                        Password strength: {passwordStrength.level}
                    </div>
                ) : null}
            </>
          )}

          {mode === "register" && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          {mode === "forgot" && (
            <>
                <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
                />

                <div className="passwordRule">
                Password must be at least 6 characters and contain letters or numbers.
                </div>

                <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={handleChange}
                required
                />
            </>
          )}

          {error ? <div className="authError">{error}</div> : null}

          <button type="submit" className="authSubmitBtn">
            {mode === "login"
                ? "Login"
                : mode === "register"
                ? "Register"
                : "Reset Password"}
          </button>
        </form>

        <div className="authActionsRow">
            {mode === "login" && (
                <>
                <button
                    className="authTextBtn"
                    type="button"
                    onClick={switchToRegister}
                >
                    Create account
                </button>

                <button
                    className="authTextBtn"
                    type="button"
                    onClick={switchToForgot}
                >
                    Forgot password?
                </button>
                </>
            )}

            {mode === "register" && (
                <button
                className="authTextBtn"
                type="button"
                onClick={switchToLogin}
                >
                Back to login
                </button>
            )}

            {mode === "forgot" && (
                <button
                className="authTextBtn"
                type="button"
                onClick={switchToLogin}
                >
                Back to login
                </button>
            )}
        </div>

        <div className="authGuestRow">
          <button
            className="authGuestBtn"
            type="button"
            onClick={closeAuthModal}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}