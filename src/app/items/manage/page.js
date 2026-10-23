"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { HANDMADE_ITEMS } from "../../../data/items";

export default function ManageItemsPage() {
  const router = useRouter();
  const { isLoggedIn, user, loading } = useAuth();

  const [items, setItems] = useState(HANDMADE_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [deleteToast, setDeleteToast] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null); // For confirmation modal

  // Protected Page: Only accessible when logged in; redirect others to /login
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login?redirect=/items/manage");
    }
  }, [loading, isLoggedIn, router]);

  // Load items from static dataset and localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("handmade_custom_items");
      const customItems = stored ? JSON.parse(stored) : [];
      setItems([...customItems, ...HANDMADE_ITEMS]);
    } catch {
      setItems(HANDMADE_ITEMS);
    }
  }, []);

  // Filter categories
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.artisan && item.artisan.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Handle Delete Confirmation
  const confirmDelete = (item) => {
    setItemToDelete(item);
  };

  const executeDelete = () => {
    if (!itemToDelete) return;

    const id = itemToDelete.id;
    const title = itemToDelete.title;

    // Remove from local state
    setItems((prev) => prev.filter((i) => i.id !== id));

    // Also remove from localStorage if it was a custom item
    try {
      const stored = localStorage.getItem("handmade_custom_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        const updated = parsed.filter((i) => i.id !== id);
        localStorage.setItem("handmade_custom_items", JSON.stringify(updated));
      }
    } catch {
      // Fallback
    }

    setItemToDelete(null);
    setDeleteToast(`"${title}" has been deleted from your catalog.`);
    setTimeout(() => {
      setDeleteToast("");
    }, 3500);
  };

  // Metrics
  const totalValue = items.reduce((acc, curr) => acc + (curr.price || 0) * (curr.stock || 1), 0);
  const lowStockCount = items.filter((i) => (i.stock || 0) > 0 && (i.stock || 0) <= 5).length;

  // If not logged in, render protected screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-[#fbf9f5] px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200/90 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mx-auto font-bold">
            🔒
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Protected Management Portal
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Managing items requires artisan sign-in. Redirecting you to login...
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/items/manage"
              className="inline-block px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="text-stone-900 font-semibold">Manage Items</span>
        </nav>

        {/* Delete Toast Notification */}
        {deleteToast && (
          <div
            id="delete-item-toast"
            className="fixed top-20 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-slide-down"
          >
            <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
              ✕
            </span>
            <div className="text-xs font-medium">{deleteToast}</div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                📊
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Manage Handcrafted Items
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Artisan Studio:{" "}
                  <strong className="text-stone-800 font-semibold">
                    {user?.storeName || "Elena's Ceramic & Woven Studio"}
                  </strong>{" "}
                  • {items.length} total active items
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/items/add"
              id="manage-add-item-btn"
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="font-bold text-base">+</span>
              <span>Add New Item</span>
            </Link>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Listed Items
            </div>
            <div className="text-2xl font-bold font-serif text-stone-900 mt-1">
              {items.length} Pieces
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              ● All verified authentic
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Low Stock Warnings
            </div>
            <div className="text-2xl font-bold font-serif text-amber-800 mt-1">
              {lowStockCount} Items
            </div>
            <div className="text-[11px] text-stone-500 font-medium mt-1">
              ≤ 5 pieces remaining
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Inventory Value
            </div>
            <div className="text-2xl font-bold font-serif text-stone-900 mt-1 font-mono">
              ${totalValue.toFixed(2)}
            </div>
            <div className="text-[11px] text-stone-500 font-medium mt-1">
              Direct retail value
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Collector Rating
            </div>
            <div className="text-2xl font-bold font-serif text-stone-900 mt-1">
              4.98 ★
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Studio average
            </div>
          </div>
        </div>

        {/* Search, Filter & View Toggle Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, SKU, or craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-stone-400 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-none focus:border-amber-600"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle: Table vs Grid */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/80">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "table"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                }`}
                title="Table view"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v2H2V4zm0 4h16v8a1 1 0 01-1 1H3a1 1 0 01-1-1V8zm2 2v4h4v-4H4zm6 0v4h4v-4h-4z" />
                </svg>
                <span>Table</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                }`}
                title="Grid view"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* LIST ALL PRODUCTS: TABLE VIEW */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200/80 text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    <th className="py-4 px-5">Item & Identifier</th>
                    <th className="py-4 px-5">Category</th>
                    <th className="py-4 px-5">Price</th>
                    <th className="py-4 px-5">Stock</th>
                    <th className="py-4 px-5">Craft Date</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-stone-400">
                        No handcrafted items match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr
                        key={item.id}
                        id={`manage-row-${item.id}`}
                        className="hover:bg-stone-50/80 transition-colors"
                      >
                        {/* Item and image */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <Link
                                href={`/items/${item.id}`}
                                className="font-semibold text-stone-900 hover:text-amber-800 transition-colors line-clamp-1 block text-sm"
                              >
                                {item.title}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400">
                                <span className="font-mono">{item.id}</span>
                                <span>•</span>
                                <span>{item.artisan}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
                            {item.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-5 font-mono font-bold text-stone-900 text-sm">
                          ${(item.price || 0).toFixed(2)}
                        </td>

                        {/* Stock status */}
                        <td className="py-4 px-5">
                          <span
                            className={`font-semibold ${
                              (item.stock || 0) === 0
                                ? "text-rose-600"
                                : (item.stock || 0) <= 5
                                ? "text-amber-700 font-bold"
                                : "text-stone-700"
                            }`}
                          >
                            {item.stock || 5} units
                          </span>
                        </td>

                        {/* Craft Date */}
                        <td className="py-4 px-5 text-stone-500 whitespace-nowrap">
                          {item.dateCrafted || "Autumn 2026"}
                        </td>

                        {/* Requirement Actions: View, Delete */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            {/* Action 1: View */}
                            <Link
                              href={`/items/${item.id}`}
                              id={`action-view-${item.id}`}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>View</span>
                              <span className="text-[11px]">↗</span>
                            </Link>

                            {/* Action 2: Delete */}
                            <button
                              type="button"
                              id={`action-delete-${item.id}`}
                              onClick={() => confirmDelete(item)}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>Delete</span>
                              <span>✕</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* LIST ALL PRODUCTS: GRID VIEW */
          <div
            id="manage-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`manage-card-${item.id}`}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full font-mono">
                      {item.id}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span>Stock: {item.stock || 5} units</span>
                      <span>{item.dateCrafted || "Autumn 2026"}</span>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-base line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      by {item.artisan}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                      {item.shortDescription || item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Price and View, Delete Actions */}
                <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-stone-900 text-base">
                    ${(item.price || 0).toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Action 1: View */}
                    <Link
                      href={`/items/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      View
                    </Link>

                    {/* Action 2: Delete */}
                    <button
                      type="button"
                      onClick={() => confirmDelete(item)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {itemToDelete && (
          <div
            id="delete-confirmation-modal"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-slide-down"
          >
            <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl font-bold mx-auto">
                ⚠️
              </div>

              <div className="text-center">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Delete Handcrafted Item?
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Are you sure you want to permanently remove{" "}
                  <strong className="text-stone-900">
                    &ldquo;{itemToDelete.title}&rdquo;
                  </strong>{" "}
                  from your Handmade studio catalog? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-delete-button"
                  onClick={executeDelete}
                  className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Yes, Delete Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
