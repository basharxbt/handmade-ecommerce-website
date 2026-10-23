import React from "react";
import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    {
      title: "Earth & Fire: Studio Ceramics",
      description: "Wood-fired pottery, stoneware bowls, and sculptural vases handcrafted by independent ceramicists.",
      count: "24 items",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Woven Heritage: Loom & Thread",
      description: "Naturally dyed throws, tapestries, and tabletop linens woven on heritage floor looms.",
      count: "18 items",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Forest Grain: Heirloom Woodwork",
      description: "Hand-turned walnut bowls, edge-grain boards, and carved kitchen utensils made from fallen timber.",
      count: "15 items",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Patina & Stitch: Fine Leather",
      description: "Vegetable-tanned goods stitched with waxed linen cord, engineered to age gracefully.",
      count: "12 items",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="py-12 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-8">
          <Link href="/">Handmade</Link>
          <span>/</span>
          <span className="current">Collections</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="page-label">
            Curated Series
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
            Artisanal Collections
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Themed collections organized by material tradition, studio guild, and creative ethos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <div
              key={col.title}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="h-64 relative overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {col.count}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-xl group-hover:text-amber-800 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href="/items"
                    className="text-xs font-semibold text-stone-900 hover:text-amber-700 flex items-center gap-1"
                  >
                    View Collection Items <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
