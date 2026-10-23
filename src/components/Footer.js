"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus("error");
      setNewsletterError("Please enter a valid email");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
    setTimeout(() => setNewsletterStatus("idle"), 4000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-serif font-bold">
                H
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                Handmade
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Empowering independent craftspeople and artisans worldwide. Every piece has a story, hands, and heart behind it.
            </p>
            <div className="text-xs text-stone-500">
              © {year ?? ""} Handmade Studio Inc. All rights reserved.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-amber-400 transition-colors">
                  Handcrafted Items
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-amber-400 transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-amber-400 transition-colors">
                  Artisans & Guilds
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Our Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Artisan Portal */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Artisan Guild
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/items/add" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500 font-bold">+</span> Add Items
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>📊</span> Manage Items
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-amber-400 transition-colors">
                  Open Artisan Shop
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition-colors">
                  Creator Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Artisan Gazette
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Stories of raw materials, ancient techniques, and new weekly releases.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your.email@craft.com"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === "error") setNewsletterStatus("idle");
                  }}
                  className={`bg-stone-800 text-stone-200 border rounded-lg px-3 py-2 text-xs w-full focus:outline-none transition-colors ${
                    newsletterStatus === "error"
                      ? "border-red-500 focus:border-red-400"
                      : "border-stone-700 focus:border-amber-500"
                  }`}
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-2 rounded-lg font-semibold transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </div>
              {newsletterStatus === "error" && (
                <p className="text-xs text-red-400 animate-fade-up">{newsletterError}</p>
              )}
              {newsletterStatus === "success" && (
                <p className="text-xs text-emerald-400 animate-fade-up">✓ Welcome to the Artisan Gazette!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
