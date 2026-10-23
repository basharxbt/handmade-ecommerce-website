"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const validations = {
    email:
      email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Enter a valid email address"
        : "",
    password:
      password.length > 0 && password.length < 6
        ? "Password must be at least 6 characters"
        : "",
  };

  const inputClass = (field, value) => {
    if (!touched[field] || !value) return "form-input";
    return validations[field] ? "form-input is-error" : "form-input is-valid";
  };

  // Convert Firebase error codes to friendly messages
  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password. Please verify your credentials.";
      case "auth/invalid-email":
        return "Please enter a valid email address format.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/too-many-requests":
        return "Access to this account has been temporarily disabled due to many failed login attempts. Reset your password or try again later.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was closed before completion.";
      default:
        return "Failed to sign in. Please check your credentials and network connection.";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setErrorMessage(getFriendlyError(err.code));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
              H
            </div>
            <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Handmade
            </span>
          </Link>
          <h1 className="text-[1.6rem] font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="text-sm text-stone-500 mt-1.5">
            Sign in to your artisan studio account
          </p>
        </div>

        {/* Already logged in notice */}
        {isLoggedIn && (
          <div className="toast-warning flex items-center justify-between mb-5">
            <span>
              You are already <strong>signed in</strong>
            </span>
            <Link href="/" className="font-semibold underline underline-offset-2 ml-3">
              Go home →
            </Link>
          </div>
        )}

        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <span className="text-rose-600 font-bold text-sm leading-none mt-0.5">⚠</span>
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Google One-Click Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
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
          <span>Continue with Google</span>
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-xs text-stone-400">or sign in with email</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={inputClass("email", email)}
              placeholder="you@studio.com"
            />
            {touched.email && validations.email && (
              <p className="form-error-msg">⚠ {validations.email}</p>
            )}
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="login-password" className="form-label" style={{ marginBottom: 0 }}>
                Password
              </label>
            </div>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={inputClass("password", password)}
              placeholder="••••••••"
            />
            {touched.password && validations.password && (
              <p className="form-error-msg">⚠ {validations.password}</p>
            )}
          </div>

          <button
            id="login-submit-button"
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-primary btn-wide mt-2"
          >
            {loading ? (
              <>
                <span className="spinner" /> Signing in with Firebase...
              </>
            ) : (
              "Sign In to Handmade"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-stone-500 mt-6">
          Don&apos;t have an artisan account?{" "}
          <Link
            href="/register"
            className="font-semibold text-amber-700 hover:text-amber-600 transition-colors"
          >
            Register as a maker
          </Link>
        </p>
      </div>
    </div>
  );
}
