"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // 5 Curated Routes (exceeds the 4+ requirement)
  const navRoutes = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "Collections", href: "/collections" },
    { name: "Artisans", href: "/artisans" },
    { name: "Our Story", href: "/about" },
  ];

  // Sticky scroll shadow & blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Notification / Demo Switcher Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-medium transition-all border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">100% Genuine Handcrafted Pieces — Worldwide Artisan Delivery</span>
            <span className="sm:hidden">Genuine Handcrafted Artisan Goods</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-stone-400 text-xs">
              <span>✨ Studio Direct Pricing</span>
              <span className="text-stone-600">•</span>
              <span>Verified Independent Guild</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav-scrolled border-b border-stone-200/90 shadow-sm py-3"
            : "glass-nav border-b border-stone-200/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-lg"
            >
              {/* Handcrafted Emblem Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 text-white flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-amber-200"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                    Handmade
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200/70">
                    Crafted
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-sans tracking-wide -mt-0.5">
                  Artisanal Goods & Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (4+ Routes) */}
            <nav
              id="desktop-navigation"
              aria-label="Main Navigation"
              className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-stone-100/70 p-1.5 rounded-full border border-stone-200/60 shadow-inner"
            >
              {navRoutes.map((route) => {
                const active = isActive(route.href);
                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    id={`nav-link-${route.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-stone-900 bg-white shadow-sm font-semibold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    {route.name}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Search / Cart + Auth Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Shortcut */}
              <Link
                href="/items"
                aria-label="Search items"
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 bg-stone-100 hover:bg-stone-200/70 rounded-full transition-colors border border-stone-200/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span>Search pottery, wood...</span>
                <kbd className="bg-white border border-stone-300 rounded px-1 text-[10px] text-stone-400 font-mono">
                  ⌘K
                </kbd>
              </Link>

              {/* Shopping Bag Icon */}
              <Link
                href="/items"
                aria-label="Cart"
                className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* AUTHENTICATION STATE */}
              {!isLoggedIn ? (
                /* LOGGED OUT: Show Login & Register */
                <div id="auth-logged-out" className="flex items-center gap-2">
                  <Link
                    href="/login"
                    id="nav-login-btn"
                    className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors rounded-lg hover:bg-stone-100/80"
                  >
                    Log In
                  </Link>

                  <Link
                    href="/register"
                    id="nav-register-btn"
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                /* LOGGED IN: Show User Trigger Button + Dropdown */
                <div
                  id="auth-logged-in-container"
                  className="relative"
                  ref={dropdownRef}
                >
                  {/* Dropdown Trigger Button */}
                  <button
                    id="user-profile-menu-button"
                    type="button"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    aria-expanded={userDropdownOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      userDropdownOpen
                        ? "bg-stone-100 border-amber-600/50 ring-2 ring-amber-600/20"
                        : "bg-white/80 hover:bg-stone-100 border-stone-200/80 shadow-sm"
                    }`}
                  >
                    {/* User Avatar with status dot */}
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user?.avatar}
                        alt={user?.name || "User Avatar"}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/30"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    {/* Name & Role Preview on Desktop */}
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-semibold text-stone-900 leading-tight">
                        {user?.name}
                      </span>
                      <span className="text-[10px] text-amber-700 font-medium">
                        Artisan Seller
                      </span>
                    </div>

                    {/* Chevron icon with rotation */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180 text-amber-700" : ""
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* USER DROPDOWN MENU */}
                  {userDropdownOpen && (
                    <div
                      id="user-profile-dropdown"
                      role="menu"
                      aria-orientation="vertical"
                      tabIndex="-1"
                      className="absolute right-0 mt-2.5 w-80 glass-dropdown rounded-2xl border border-stone-200/80 shadow-2xl overflow-hidden z-50 animate-slide-down"
                    >
                      {/* SECTION 1: Logged-in user info (replacing login/register) */}
                      <div className="p-4 bg-gradient-to-br from-amber-50/70 via-stone-50 to-white border-b border-stone-100">
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={user?.avatar}
                              alt={user?.name}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-600/40 shadow-sm"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4
                                id="dropdown-user-name"
                                className="text-sm font-bold text-stone-900 truncate"
                              >
                                {user?.name}
                              </h4>
                              <span
                                title="Verified Artisan"
                                className="text-amber-600 flex-shrink-0"
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                </svg>
                              </span>
                            </div>

                            <p
                              id="dropdown-user-email"
                              className="text-xs text-stone-500 truncate"
                            >
                              {user?.email}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200/80">
                                ⭐ {user?.role || "Verified Artisan"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Store summary strip */}
                        <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                          <span className="font-medium truncate max-w-[170px]">
                            🏺 {user?.storeName}
                          </span>
                          <span className="text-amber-700 font-semibold bg-white px-2 py-0.5 rounded border border-stone-200">
                            {user?.stats?.products || 18} Active Items
                          </span>
                        </div>
                      </div>

                      {/* SECTION 2: Action Links */}
                      <div className="p-2 space-y-1">
                        {/* Requirement Item 1: Add Product */}
                        <Link
                          href="/items/add"
                          id="dropdown-add-product-link"
                          role="menuitem"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-50/80 text-stone-800 hover:text-amber-900 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">
                                Add Product
                              </span>
                              <span className="text-[10px] font-medium uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                New
                              </span>
                            </div>
                            <p className="text-xs text-stone-500">
                              List a new handcrafted piece for sale
                            </p>
                          </div>
                        </Link>

                        {/* Requirement Item 2: Manage Items */}
                        <Link
                          href="/items/manage"
                          id="dropdown-manage-products-link"
                          role="menuitem"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-50/80 text-stone-800 hover:text-amber-900 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-white transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">
                                Manage Products
                              </span>
                              <span className="text-xs text-stone-500 font-mono">
                                18 listed
                              </span>
                            </div>
                            <p className="text-xs text-stone-500">
                              Edit listings, stock & pricing
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* SECTION 3: Secondary Shortcuts */}
                      <div className="px-2 py-1.5 bg-stone-50/80 border-t border-stone-100 grid grid-cols-2 gap-1 text-xs font-medium text-stone-600">
                        <Link
                          href="/items"
                          onClick={() => setUserDropdownOpen(false)}
                          className="px-2.5 py-1.5 rounded-lg hover:bg-stone-200/60 hover:text-stone-900 transition-colors flex items-center gap-1.5"
                        >
                          <span>📦</span> My Orders
                        </Link>
                        <Link
                          href="/artisans"
                          onClick={() => setUserDropdownOpen(false)}
                          className="px-2.5 py-1.5 rounded-lg hover:bg-stone-200/60 hover:text-stone-900 transition-colors flex items-center gap-1.5"
                        >
                          <span>🎨</span> Studio Profile
                        </Link>
                      </div>

                      {/* SECTION 4: Logout */}
                      <div className="p-2 border-t border-stone-100">
                        <button
                          id="dropdown-logout-btn"
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 hover:text-rose-800 transition-colors cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                id="mobile-menu-toggle-button"
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                {mobileMenuOpen ? (
                  /* Close 'X' icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  /* Hamburger 3-line icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RESPONSIVE MOBILE DRAWER / MENU */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden border-t border-stone-200/80 bg-white/95 backdrop-blur-2xl shadow-xl animate-slide-down"
          >
            <div className="px-4 pt-3 pb-6 space-y-4 max-w-lg mx-auto">
              {/* Mobile Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search artisanal creations..."
                  className="w-full bg-stone-100 border border-stone-200 rounded-full py-2 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-stone-400 absolute left-3.5 top-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>

              {/* Mobile 4+ Navigation Links */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-3 pb-1">
                  Explore Handmade
                </div>
                {navRoutes.map((route) => {
                  const active = isActive(route.href);
                  return (
                    <Link
                      key={route.name}
                      href={route.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        active
                          ? "bg-amber-50 text-amber-900 font-semibold border-l-4 border-amber-600"
                          : "text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span>{route.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-stone-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-3 border-t border-stone-200">
                {!isLoggedIn ? (
                  /* Logged out in mobile */
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center py-2.5 rounded-xl border border-stone-300 text-stone-800 font-semibold hover:bg-stone-50 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-stone-900 to-amber-900 text-white font-semibold hover:opacity-95 transition-opacity shadow-sm"
                    >
                      Register / Join as Artisan
                    </Link>
                  </div>
                ) : (
                  /* Logged in in mobile: Show user info + Add Product + Manage Products */
                  <div className="space-y-3">
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-stone-900 truncate">
                            {user?.name}
                          </div>
                          <div className="text-xs text-stone-500 truncate">
                            {user?.email}
                          </div>
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full">
                            ⭐ {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Link
                        href="/items/add"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-medium text-sm"
                      >
                        <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-base">
                          +
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold">Add Product</div>
                          <div className="text-xs text-amber-800/70">
                            Create new handcrafted listing
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/items/manage"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-stone-100 text-stone-900 hover:bg-stone-200 transition-colors font-medium text-sm"
                      >
                        <span className="w-7 h-7 rounded-lg bg-stone-800 text-white flex items-center justify-center text-xs">
                          📊
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold">Manage Products</div>
                          <div className="text-xs text-stone-500">
                            Inventory, edits & pricing
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 py-1.5 px-3 rounded-lg hover:bg-rose-50 flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
