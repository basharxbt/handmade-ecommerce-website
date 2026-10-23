"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HANDMADE_ITEMS, getItemById, getRelatedItems } from "../../../data/items";

export default function ItemDetailsClient({ id, initialItem }) {
  const [item, setItem] = useState(initialItem);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // If not found in static items, check localStorage for custom items created via /items/add
    if (!getItemById(id)) {
      try {
        const stored = localStorage.getItem("handmade_custom_items");
        if (stored) {
          const parsed = JSON.parse(stored);
          const customItem = parsed.find((i) => i.id === id);
          if (customItem) {
            setItem({
              ...customItem,
              dateCrafted: customItem.dateCrafted || "Recently Crafted (2026)",
              specifications: customItem.specifications || {
                dimensions: "Studio Handcrafted Custom Dimensions",
                weight: "Approx 1.5 lbs",
                materials: customItem.materials || "Natural authentic studio raw materials",
                technique: "Studio hand-thrown / hand-assembled",
                careInstructions: "Handle with artisanal care. Wipe clean with a damp cloth.",
                batchNumber: "HM-CUSTOM-01",
                leadTime: "Ships in 1-2 business days",
              },
            });
          }
        }
      } catch {
        // Fallback
      }
    }
  }, [id]);

  const activeItem = item || initialItem || HANDMADE_ITEMS[0];
  const relatedItems = getRelatedItems(activeItem.id, activeItem.category, 3);

  const handleAddToBag = () => {
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 3500);
  };

  return (
    <div className="py-10 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Requirement: Back button to Items page */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/items"
            id="back-to-items-btn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200/90 text-xs font-semibold text-stone-800 shadow-sm transition-all hover:-translate-x-0.5 group cursor-pointer"
          >
            <span className="text-stone-500 group-hover:text-amber-800 transition-colors">
              ←
            </span>
            <span>Back to Items</span>
          </Link>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-stone-700">
              Handmade
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-stone-700">
              Items
            </Link>
            <span>/</span>
            <span className="text-stone-700 font-medium truncate max-w-[200px]">
              {activeItem.title}
            </span>
          </nav>
        </div>

        {/* Added to Bag Toast Notification */}
        {addedToast && (
          <div
            id="added-to-bag-toast"
            className="fixed top-20 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-slide-down"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <div className="text-xs">
              <div className="font-bold">Added to Collection Bag</div>
              <div className="text-stone-300">
                {quantity} × {activeItem.title}
              </div>
            </div>
          </div>
        )}

        {/* MAIN PRODUCT DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Requirement: Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />

              {activeItem.tag && (
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-stone-200/60">
                  {activeItem.tag}
                </span>
              )}

              <span className="absolute top-4 right-4 bg-stone-900/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                {activeItem.category}
              </span>
            </div>

            {/* Maker verification strip */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeItem.artisanAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={activeItem.artisan}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-600/30"
                />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    Handmade by {activeItem.artisan}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {activeItem.artisanRole || "Guild Artisan"} • 📍 {activeItem.location}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                Verified Studio
              </span>
            </div>
          </div>

          {/* RIGHT: Title, Pricing, Additional Info, Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div>
              {/* Requirement: Additional info (price/date/category) */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                  {activeItem.category}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-medium">
                  Crafted: {activeItem.dateCrafted || "Autumn 2026"}
                </span>
              </div>

              {/* Requirement: Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                {activeItem.title}
              </h1>

              {/* Rating & reviews */}
              <div className="flex items-center gap-3 mt-2.5 text-xs text-stone-500">
                <div className="flex items-center text-amber-700 font-bold">
                  ★ {activeItem.rating ? activeItem.rating.toFixed(1) : "5.0"}
                </div>
                <span>•</span>
                <span>{activeItem.reviews || 24} Verified collector reviews</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">
                  ● In Stock ({activeItem.stock || 5} pieces remaining)
                </span>
              </div>
            </div>

            {/* Requirement: Additional info (price) */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  Artisan Direct Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-bold font-mono text-stone-900">
                    ${activeItem.price ? activeItem.price.toFixed(2) : "84.00"}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    USD
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                  Free Carbon-Neutral Shipping
                </span>
              </div>
            </div>

            {/* Requirement: Full Description */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                The Artisan Story & Narrative
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed pt-1">
                {activeItem.fullDescription || activeItem.description}
              </p>
            </div>

            {/* Purchase CTA controls */}
            <div className="flex items-center gap-3 pt-2">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-300 rounded-full bg-white px-2 py-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center font-bold text-stone-600 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold font-mono text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center font-bold text-stone-600 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA button */}
              <button
                type="button"
                id="add-to-bag-button"
                onClick={handleAddToBag}
                className="flex-1 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Collection Bag</span>
                <span>•</span>
                <span className="font-mono">
                  ${((activeItem.price || 84) * quantity).toFixed(2)}
                </span>
              </button>

              {/* Save / Favorite toggle */}
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-rose-50 border-rose-300 text-rose-600"
                    : "bg-white border-stone-300 text-stone-600 hover:bg-stone-50"
                }`}
                aria-label="Save to favorites"
                title={isSaved ? "Saved to wishlist" : "Save to wishlist"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            {/* Fast shipping guarantee */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center gap-2">
                <span>📦</span>
                <span>Plastic-Free Recycled Packaging</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center gap-2">
                <span>🛡️</span>
                <span>Authenticity Certificate Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requirement: Key information / Specifications */}
        <section className="mt-14 bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10">
          <div className="flex items-center gap-3 border-b border-stone-200/80 pb-4 mb-6">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              ⚙️
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Key Information & Technical Specifications
              </h2>
              <p className="text-xs text-stone-500">
                Exact measurements, materials provenance, and artisan care guide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Dimensions
              </span>
              <span className="font-medium text-stone-900 text-right">
                {activeItem.specifications?.dimensions || '9.2" H × 5.4" W'}
              </span>
            </div>

            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Weight
              </span>
              <span className="font-medium text-stone-900 text-right">
                {activeItem.specifications?.weight || "2.4 lbs (1.08 kg)"}
              </span>
            </div>

            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Raw Materials
              </span>
              <span className="font-medium text-stone-900 text-right max-w-xs">
                {activeItem.specifications?.materials || "Natural clay, stone grit, ash glaze"}
              </span>
            </div>

            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Craft Technique
              </span>
              <span className="font-medium text-stone-900 text-right max-w-xs">
                {activeItem.specifications?.technique || "Wheel-thrown, high-fire wood kiln"}
              </span>
            </div>

            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Batch Registry
              </span>
              <span className="font-mono font-medium text-stone-900 text-right">
                {activeItem.specifications?.batchNumber || "KY-2026-04"}
              </span>
            </div>

            <div className="flex items-start justify-between py-2.5 border-b border-stone-100">
              <span className="font-semibold text-stone-500 text-xs uppercase tracking-wider">
                Fulfillment & Lead Time
              </span>
              <span className="font-medium text-stone-900 text-right">
                {activeItem.specifications?.leadTime || "Ships within 24 hours"}
              </span>
            </div>

            <div className="md:col-span-2 py-3 bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 mt-2">
              <span className="font-semibold text-stone-900 text-xs uppercase tracking-wider block mb-1">
                Artisan Care & Maintenance Instructions
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeItem.specifications?.careInstructions ||
                  "Hand wash with gentle organic soap and lukewarm water. Avoid abrasive metal scrubbers."}
              </p>
            </div>
          </div>
        </section>

        {/* Requirement: Related items (if applicable) */}
        {relatedItems && relatedItems.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Complementary Creations
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Related Handcrafted Items
                </h2>
              </div>

              <Link
                href="/items"
                className="text-xs font-semibold text-stone-800 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                View all items <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <Link
                      href={`/items/${rel.id}`}
                      className="aspect-[4/3] relative overflow-hidden bg-stone-100 block cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                        {rel.category}
                      </span>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="text-[11px] text-stone-400">
                          📍 {rel.location}
                        </span>
                        <span className="text-amber-700 font-semibold">
                          ★ {rel.rating.toFixed(1)}
                        </span>
                      </div>

                      <Link href={`/items/${rel.id}`}>
                        <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors leading-snug cursor-pointer">
                          {rel.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-stone-500 mt-1">
                        by {rel.artisan}
                      </p>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {rel.shortDescription || rel.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-stone-900">
                      ${rel.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/items/${rel.id}`}
                      className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
