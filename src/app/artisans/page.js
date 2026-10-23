import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Artisans & Guild — Handmade",
  description: "Meet the skilled hands behind Handmade. Independent potters, weavers, woodturners, and jewelers sharing their craft.",
};

export default function ArtisansPage() {
  const artisans = [
    {
      name: "Elena Rostova",
      specialty: "Master Ceramicist & Potter",
      location: "Kyoto / Pacific Northwest",
      experience: "16 years crafting",
      bio: "Focuses on wood-fired stoneware vessels created with harvested mountain clay and natural wood-ash glazes.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Hand-Thrown Terrazzo Clay Vase",
      icon: "🏺",
    },
    {
      name: "Marcus Lindqvist",
      specialty: "Heirloom Woodturner",
      location: "Stockholm, Sweden",
      experience: "12 years crafting",
      bio: "Carves sculptural bowls and kitchen tools strictly from sustainably felled local walnut, birch, and oak.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Black Walnut Catchall",
      icon: "🪵",
    },
    {
      name: "Amina Al-Mansoor",
      specialty: "Botanical Weaver & Fiber Artist",
      location: "Oaxaca, Mexico",
      experience: "20 years crafting",
      bio: "Uses vintage wooden floor looms and extracts pigments from indigo, marigold, and cochineal.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Naturally Dyed Organic Linen Throw",
      icon: "🧵",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="breadcrumb mb-8">
          <Link href="/">Handmade</Link>
          <span className="sep">/</span>
          <span className="current">Artisans</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="page-label">The Guild of Makers</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mt-3 tracking-tight">
            Meet the Artisans
          </h1>
          <p className="text-base text-stone-500 mt-3 leading-relaxed">
            Get to know the skilled hands, heritage techniques, and studios behind each handmade object.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {artisans.map((artisan, i) => (
            <div
              key={artisan.name}
              className={`card card-hover flex flex-col p-6 animate-fade-up stagger-${i + 1}`}
            >
              {/* Avatar + Identity */}
              <div className="flex items-start gap-4 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/20 shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight">
                    {artisan.name}
                  </h3>
                  <div className="text-xs text-amber-700 font-semibold mt-0.5">
                    {artisan.specialty}
                  </div>
                  <div className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                    <span>📍</span>
                    <span className="truncate">{artisan.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-stone-600 leading-relaxed flex-1">
                {artisan.bio}
              </p>

              {/* Signature item */}
              <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-2.5">
                <span className="text-lg">{artisan.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Signature Piece</div>
                  <div className="text-xs font-semibold text-stone-800 truncate">{artisan.featuredItem}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="badge badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Verified Guild Maker
                </span>
                <Link
                  href="/items"
                  className="text-xs font-semibold text-stone-700 hover:text-amber-700 transition-colors flex items-center gap-1"
                >
                  View Items
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-strip mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Join the Artisan Guild</h2>
            <p className="text-sm text-stone-300 mt-1">Open your studio shop and share your craft with the world.</p>
          </div>
          <Link href="/register" className="btn btn-amber flex-shrink-0 btn-lg">
            Open Your Studio Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
