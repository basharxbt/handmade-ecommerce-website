import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Us — Handmade",
  description:
    "Learn about Handmade, an artisanal marketplace dedicated to connecting independent makers with collectors of handcrafted treasures.",
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: "🏺",
      title: "Authentic Craftsmanship",
      description:
        "Every single item listed on Handmade is made by hand in small studio batches using traditional heritage techniques.",
    },
    {
      icon: "🌿",
      title: "Ethical & Honest Materials",
      description:
        "We prioritize wild-harvested clays, organic vegetable dyes, reclaimed hardwoods, and sustainable natural fibers.",
    },
    {
      icon: "🤝",
      title: "Direct Maker Support",
      description:
        "Over 90% of every sale goes directly into the hands of independent artisans, sustaining studios and craft lineages.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-amber-800">
            Handmade
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">About Us</span>
        </nav>

        {/* 1. TITLE & HERO DESCRIPTION SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/60 inline-block">
            Our Mission & Purpose
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            About Handmade
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            <strong>Handmade</strong> is a curated online marketplace created to celebrate the slow, human art of making by hand. We connect master potters, weavers, woodturners, and jewelers directly with people who value intentional living and timeless objects.
          </p>
        </div>

        {/* 2. OPTIONAL IMAGE SECTION */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 aspect-[21/9] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
            alt="Artisan ceramic maker shaping pottery on a traditional wheel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-lg">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                Studio Philosophy
              </span>
              <p className="text-sm sm:text-base font-serif font-medium mt-1 text-stone-100 leading-snug">
                “Every brushstroke, hammer blow, and warp thread tells a human story that mass production can never replicate.”
              </p>
            </div>
          </div>
        </div>

        {/* 3. CORE PILLARS / OPTIONAL VALUES SECTION */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Why We Built Handmade
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              In an age of automated factory replicas and disposable trends, we champion objects designed to outlive us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/70 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-900 text-2xl flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  {val.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 border-t border-stone-100 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                850+
              </div>
              <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                Independent Studios
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                4,200+
              </div>
              <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                Handcrafted Pieces
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                92%
              </div>
              <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                Paid Direct to Makers
              </div>
            </div>
          </div>
        </div>

        {/* 4. CALL TO ACTION STRIP */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Discover Authentic Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Browse our catalog of handcrafted items or register your own artisan studio.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/items"
              className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Explore Items
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors cursor-pointer"
            >
              Open Artisan Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
