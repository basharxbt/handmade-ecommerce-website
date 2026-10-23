"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function AddItemPage() {
  const router = useRouter();
  const { isLoggedIn, user, loading } = useAuth();

  // Form Fields State
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [craftDate, setCraftDate] = useState("");
  const [priority, setPriority] = useState("Standard");
  const [category, setCategory] = useState("Ceramics");
  const [location, setLocation] = useState("Kyoto, Japan");
  const [stock, setStock] = useState("5");
  const [imageUrl, setImageUrl] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const categories = [
    "Ceramics",
    "Woodcraft",
    "Textiles",
    "Leather Goods",
    "Metalwork",
    "Jewelry",
  ];

  const priorityOptions = [
    "Standard",
    "Featured / Staff Favorite",
    "High Priority",
    "Limited Batch",
    "Artisan Signature",
  ];

  const sampleImages = [
    {
      label: "Ceramic Studio",
      url: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Woodcraft",
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Loom Textiles",
      url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Protected Page: Only accessible when logged in; redirect others to /login
  useEffect(() => {
    if (!loading) {
      setIsCheckingAuth(false);
      if (!isLoggedIn) {
        router.push("/login?redirect=/items/add");
      }
    }
  }, [loading, isLoggedIn, router]);

  // Set today's date client-side only to avoid SSR/hydration mismatch
  useEffect(() => {
    setCraftDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackImg =
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80";

    const newItem = {
      id: "item-" + Date.now(),
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription:
        fullDescription.trim() ||
        shortDescription.trim() ||
        "Carefully handcrafted using natural materials and artisanal techniques.",
      description: shortDescription.trim(),
      price: parseFloat(price) || 50.0,
      dateCrafted: craftDate,
      priority: priority,
      tag: priority !== "Standard" ? priority : "Newly Crafted",
      category: category,
      location: location || "Independent Artisan Studio",
      stock: parseInt(stock, 10) || 1,
      image: imageUrl.trim() || fallbackImg,
      rating: 5.0,
      reviews: 1,
      artisan: user?.name || "Elena Rostova",
      artisanRole: user?.role || "Verified Master Artisan",
      artisanAvatar:
        user?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      specifications: {
        dimensions: 'Studio Handcrafted Dimensions',
        weight: "1.8 lbs",
        materials: "Natural studio raw materials, organic glazes/oils",
        technique: "Studio hand-thrown / hand-assembled",
        careInstructions: "Handle with artisanal care. Wipe clean with a soft damp cloth.",
        batchNumber: `HM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        leadTime: "In stock, ships in 1-2 business days",
      },
    };

    // Store in localStorage so it dynamically shows in /items and /items/[id]
    try {
      const existing = localStorage.getItem("handmade_custom_items");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newItem);
      localStorage.setItem("handmade_custom_items", JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmationData(newItem);
      setShowToast(true);

      // Redirect after showing the confirmation message
      setTimeout(() => {
        router.push(`/items/${newItem.id}`);
      }, 2000);
    }, 700);
  };

  // If redirecting or checking auth, show protection screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-[#fbf9f5] px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200/90 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mx-auto font-bold">
            🔒
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Protected Artisan Page
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Listing new items requires an authenticated artisan account. Redirecting you to the studio login...
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/items/add"
              className="inline-block px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
            >
              Go to Login Page Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-amber-800">
            Handmade
          </Link>
          <span>/</span>
          <Link href="/items" className="hover:text-amber-800">
            Items
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">Add Item</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                +
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Add Handcrafted Item
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Protected artisan route — publish a new handcrafted piece to the Handmade catalog.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Logged in as {user?.name || "Elena"}
            </span>
          </div>
        </div>

        {/* ON SUCCESS: Toast / Confirmation Notification */}
        {showToast && confirmationData && (
          <div
            id="item-added-confirmation-toast"
            className="my-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 shadow-lg flex items-start gap-4 animate-slide-down"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
              ✓
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-emerald-900">
                Item Successfully Published!
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                <strong>{confirmationData.title}</strong> has been added to the catalog at <strong>${confirmationData.price.toFixed(2)}</strong>. Redirecting to item details...
              </p>
            </div>
          </div>
        )}

        {/* ADD ITEM FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Section 1: Item Identity */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              1. General Item Information
            </h2>

            {/* Field 1: Title */}
            <div>
              <label
                htmlFor="item-title-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
              >
                Item Title *
              </label>
              <input
                id="item-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hand-Thrown Speckled Terrazzo Pitcher"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
              />
            </div>

            {/* Field 2: Short Description (1-2 lines) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="item-short-desc-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700"
                >
                  Short Description (1–2 lines) *
                </label>
                <span className="text-[11px] text-stone-400">
                  Displayed on catalog cards & previews
                </span>
              </div>
              <textarea
                id="item-short-desc-input"
                rows="2"
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g. Wheel-thrown stoneware pitcher with natural mineral speckles and satin white interior glaze."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
              />
            </div>

            {/* Field 3: Full Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="item-full-desc-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700"
                >
                  Full Craftsmanship Narrative & Description *
                </label>
                <span className="text-[11px] text-stone-400">
                  Displayed on Item Details Page
                </span>
              </div>
              <textarea
                id="item-full-desc-input"
                rows="5"
                required
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Describe the raw materials, tools, kiln temperature, inspiration, and heritage techniques that make this piece special..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
              />
            </div>
          </div>

          {/* Section 2: Price / Date / Priority / Relevant Fields */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              2. Commercial & Craft Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Field 4a: Price */}
              <div>
                <label
                  htmlFor="item-price-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Price ($ USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-stone-500 font-bold">
                    $
                  </span>
                  <input
                    id="item-price-input"
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="78.00"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 font-mono focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                  />
                </div>
              </div>

              {/* Field 4b: Date Crafted */}
              <div>
                <label
                  htmlFor="item-date-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Date Crafted *
                </label>
                <input
                  id="item-date-input"
                  type="date"
                  required
                  value={craftDate}
                  onChange={(e) => setCraftDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                />
              </div>

              {/* Field 4c: Priority / Highlight Level */}
              <div>
                <label
                  htmlFor="item-priority-select"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Listing Priority / Tag *
                </label>
                <select
                  id="item-priority-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                >
                  {priorityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4d: Craft Category */}
              <div>
                <label
                  htmlFor="item-category-select"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Craft Category *
                </label>
                <select
                  id="item-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-600"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4e: Stock Quantity */}
              <div>
                <label
                  htmlFor="item-stock-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Available Inventory *
                </label>
                <input
                  id="item-stock-input"
                  type="number"
                  min="1"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Field 4f: Origin Location */}
              <div>
                <label
                  htmlFor="item-location-input"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
                >
                  Artisan Studio Origin
                </label>
                <input
                  id="item-location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kyoto, Japan or Florence, Italy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Optional Image URL */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-lg font-serif font-bold text-stone-900">
                3. Photography (Optional Image URL)
              </h2>
              <span className="text-xs text-stone-400 font-medium">
                Optional field
              </span>
            </div>

            <div>
              <label
                htmlFor="item-image-url-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
              >
                Direct Image Web Address (URL)
              </label>
              <input
                id="item-image-url-input"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
              />
            </div>

            {/* Quick Sample Presets */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 font-medium">
                Sample photos:
              </span>
              {sampleImages.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setImageUrl(s.url)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  + Use {s.label}
                </button>
              ))}
            </div>

            {/* Live Image Preview */}
            {imageUrl && (
              <div className="mt-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 inline-block">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Live Preview:
                </span>
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/items"
              className="px-6 py-3.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </Link>

            {/* Requirement: Submit (add) Button */}
            <button
              id="submit-item-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Adding Item to Catalog...</span>
                </>
              ) : (
                <>
                  <span>Submit (Add Item)</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
