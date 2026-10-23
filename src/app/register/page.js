"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, loginWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [craftType, setCraftType] = useState("Ceramics & Stoneware");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const validations = {
    name:
      name.length > 0 && name.trim().length < 2
        ? "Name must be at least 2 characters"
        : "",
    email:
      email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Enter a valid email address"
        : "",
    password:
      password.length > 0 && password.length < 6
        ? "Password must be at least 6 characters"
        : "",
    confirmPassword:
      confirmPassword.length > 0 && confirmPassword !== password
        ? "Passwords do not match"
        : "",
    storeName:
      storeName.length > 0 && storeName.trim().length < 2
        ? "Studio name must be at least 2 characters"
        : "",
  };

  const inputClass = (field, value) => {
    if (!touched[field] || !value) return "form-input";
    return validations[field] ? "form-input is-error" : "form-input is-valid";
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email address is already registered. Please sign in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address format.";
      case "auth/weak-password":
        return "The password is too weak. Please use at least 6 characters with mixed letters & numbers.";
      case "auth/popup-closed-by-user":
        return "Google sign-up popup was closed before completion.";
      default:
        return "Failed to register artisan account. Please try again or check your connection.";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, {
        name,
        storeName: storeName || `${name || "My"} Studio`,
        craftType,
      });
      router.push("/");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      console.error("Google sign-up error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setErrorMessage(getFriendlyError(err.code));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const crafts = [
    "Ceramics & Stoneware",
    "Handwoven Textiles",
    "Heirloom Woodcraft",
    "Fine Leather Goods",
    "Handmade Jewelry",
    "Botanical Dyeing",
    "Stone & Glass Art",
  ];

  const perks = [
    "Free forever for independent makers",
    "88%+ of every sale goes directly to you",
    "Listed in our verified international artisan guild",
  ];

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
              H
            </div>
            <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Handmade
            </span>
          </Link>
          <h1 className="text-[1.6rem] font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Open your artisan shop
          </h1>
          <p className="text-sm text-stone-500 mt-1.5">
            Join the verified guild of independent makers &amp; artists.
          </p>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <span className="text-rose-600 font-bold text-sm leading-none mt-0.5">⚠</span>
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Google One-Click Sign Up */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={googleLoading || loading}
          className="btn btn-outline btn-wide mb-4 flex items-center justify-center gap-2.5"
        >
          {googleLoading ? (
            <span className="spinner" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Sign up with Google</span>
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-xs text-stone-400">or register with email</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="e.g. Elena Rostova"
              className={inputClass("name", name)}
            />
            {touched.name && validations.name && (
              <p className="form-error-msg">⚠ {validations.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-store" className="form-label">
              Studio / brand name
            </label>
            <input
              id="reg-store"
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              onBlur={() => handleBlur("storeName")}
              placeholder="e.g. Solstice Clay & Loom"
              className={inputClass("storeName", storeName)}
            />
            {touched.storeName && validations.storeName && (
              <p className="form-error-msg">⚠ {validations.storeName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="maker@studio.com"
              className={inputClass("email", email)}
            />
            {touched.email && validations.email && (
              <p className="form-error-msg">⚠ {validations.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Min 6 characters"
                className={inputClass("password", password)}
              />
              {touched.password && validations.password && (
                <p className="form-error-msg">⚠ {validations.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm-password" className="form-label">
                Confirm
              </label>
              <input
                id="reg-confirm-password"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Re-enter"
                className={inputClass("confirmPassword", confirmPassword)}
              />
              {touched.confirmPassword && validations.confirmPassword && (
                <p className="form-error-msg">⚠ {validations.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="reg-craft" className="form-label">
              Primary craft discipline
            </label>
            <select
              id="reg-craft"
              value={craftType}
              onChange={(e) => setCraftType(e.target.value)}
              className="form-input form-select"
            >
              {crafts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            id="register-submit-button"
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-primary btn-wide mt-2"
          >
            {loading ? (
              <>
                <span className="spinner" /> Creating Firebase Account...
              </>
            ) : (
              "Create Artisan Account & Sign In"
            )}
          </button>
        </form>

        {/* Perks */}
        <ul className="mt-5 space-y-1.5 pt-4 border-t border-stone-100">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-stone-500">
              <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
              {p}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <p className="text-center text-xs text-stone-500 mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-amber-700 hover:text-amber-600 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
