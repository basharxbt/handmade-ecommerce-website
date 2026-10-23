"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { HANDMADE_ITEMS } from "../../data/items";

export default function ItemsPage() {
  const [items, setItems] = useState(HANDMADE_ITEMS);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering states (at least 2 fields implemented: Category, Price Range, Location, Rating)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  // Load any user-added items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("handmade_custom_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems([...parsed, ...HANDMADE_ITEMS]);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Filter categories and locations dynamically
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const locations = useMemo(() => {
    const set = new Set(items.map((i) => i.location));
    return ["All", ...Array.from(set)];
  }, [items]);

  // Price range options
  const priceRanges = [
    { label: "All Prices", value: "All" },
    { label: "Under $50", value: "under-50" },
    { label: "$50 to $85", value: "50-85" },
    { label: "$85 to $120", value: "85-120" },
    { label: "Over $120", value: "over-120" },
  ];

  // Filter items based on search and multi-field criteria
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search bar filter (title, description, artisan, location)
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter Field 1: Category
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // Filter Field 2: Price Range
      let matchesPrice = true;
      if (selectedPriceRange === "under-50") {
        matchesPrice = item.price < 50;
      } else if (selectedPriceRange === "50-85") {
        matchesPrice = item.price >= 50 && item.price <= 85;
      } else if (selectedPriceRange === "85-120") {
        matchesPrice = item.price > 85 && item.price <= 120;
      } else if (selectedPriceRange === "over-120") {
        matchesPrice = item.price > 120;
      }

      // Filter Field 3: Origin / Location
      const matchesLocation =
        selectedLocation === "All" || item.location === selectedLocation;

      // Filter Field 4: Minimum Rating
      let matchesRating = true;
      if (selectedRating === "4.9") {
        matchesRating = item.rating >= 4.9;
      } else if (selectedRating === "5.0") {
        matchesRating = item.rating >= 5.0;
      }

      return matchesSearch && matchesCategory && matchesPrice && matchesLocation && matchesRating;
    });
  }, [items, searchQuery, selectedCategory, selectedPriceRange, selectedLocation, selectedRating]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedPriceRange !== "All" ||
    selectedLocation !== "All" ||
    selectedRating !== "All";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSelectedLocation("All");
    setSelectedRating("All");
  };

  return (
    <div className="py-10 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-amber-800">
            Handmade
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Items Catalog</span>
        </nav>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block mb-3">
            Handmade Pieces & Creations
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Handcrafted Items
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Browse authentic creations shaped by master potters, weavers, woodworkers, and jewelers. Filter by craft discipline, price, or maker origin.
          </p>
        </div>

        {/* SEARCH BAR & FILTERING PANEL */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 mb-10 space-y-6">
          {/* 1. Main Search Bar */}
          <div>
            <label
              htmlFor="items-search-input"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
            >
              Search Handcrafted Items
            </label>
            <div className="relative">
              <input
                id="items-search-input"
                type="text"
                placeholder="Search by piece title, materials, artisan name, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 text-sm p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 2. Multi-Field Filter Controls (At least 2 fields implemented) */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Filter by Multiple Fields:
              </span>
              {hasActiveFilters && (
                <button
                  id="clear-filters-btn"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Field 1: Category Filter */}
              <div>
                <label
                  htmlFor="filter-category"
                  className="block text-[11px] font-semibold text-stone-600 mb-1.5"
                >
                  Craft Category
                </label>
                <select
                  id="filter-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-600"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 2: Price Range Filter */}
              <div>
                <label
                  htmlFor="filter-price"
                  className="block text-[11px] font-semibold text-stone-600 mb-1.5"
                >
                  Price Range
                </label>
                <select
                  id="filter-price"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-600"
                >
                  {priceRanges.map((pr) => (
                    <option key={pr.value} value={pr.value}>
                      {pr.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Artisan Origin Location Filter */}
              <div>
                <label
                  htmlFor="filter-location"
                  className="block text-[11px] font-semibold text-stone-600 mb-1.5"
                >
                  Artisan Origin / Region
                </label>
                <select
                  id="filter-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-600"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All Regions" : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Minimum Rating Filter */}
              <div>
                <label
                  htmlFor="filter-rating"
                  className="block text-[11px] font-semibold text-stone-600 mb-1.5"
                >
                  Minimum Rating
                </label>
                <select
                  id="filter-rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 bg-white focus:outline-none focus:border-amber-600"
                >
                  <option value="All">All Ratings</option>
                  <option value="4.9">4.9★ and above</option>
                  <option value="5.0">5.0★ Perfect Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-900">{filteredItems.length}</strong> of {items.length} handcrafted items
            </span>
            {hasActiveFilters && (
              <span className="text-amber-800 font-medium">Filters Applied</span>
            )}
          </div>
        </div>

        {/* RESPONSIVE GRID LAYOUT (Minimum 6 Items Displayed) */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
            <span className="text-4xl mb-3 block">🏺</span>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              No handcrafted items match your criteria
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Try adjusting your search query, price range, or category filter to discover more studio pieces.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-full hover:bg-amber-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            id="items-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`item-card-${item.id}`}
                className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Element 1: Image or Icon with Link */}
                  <Link
                    href={`/items/${item.id}`}
                    className="aspect-[4/3] relative overflow-hidden bg-stone-100 block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {item.tag && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-stone-200/60">
                        {item.tag}
                      </span>
                    )}

                    {/* Category pill */}
                    <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 pb-2">
                    {/* Rating & Location meta */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span className="text-[11px] text-stone-400">
                        📍 {item.location}
                      </span>
                      <span className="flex items-center text-amber-700 font-semibold text-xs">
                        ★ {item.rating.toFixed(1)} ({item.reviews || 20})
                      </span>
                    </div>

                    {/* Card Element 2: Title with Link */}
                    <Link href={`/items/${item.id}`}>
                      <h2 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-800 transition-colors leading-snug">
                        {item.title}
                      </h2>
                    </Link>

                    {/* Artisan creator */}
                    <p className="text-xs text-amber-900 font-medium mt-1">
                      by {item.artisan}
                    </p>

                    {/* Card Element 3: Short Description (Strictly 1–2 lines) */}
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-2">
                      {item.shortDescription || item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Card Element 4: Button → “View Details” */}
                <div className="p-5 sm:p-6 pt-3 mt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                      Price
                    </span>
                    <span className="text-lg font-bold font-mono text-stone-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Button → “View Details” (Navigates to /items/[id]) */}
                  <Link
                    href={`/items/${item.id}`}
                    id={`view-details-btn-${item.id}`}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
