const fs = require('fs');

/* ── ARTISANS ──────────────────────────────────────────── */
const artisans = `import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Artisans & Guild — Handmade",
  description: "Meet the skilled hands behind Handmade.",
};

export default function ArtisansPage() {
  const artisans = [
    {
      name: "Elena Rostova",
      specialty: "Master Ceramicist & Potter",
      location: "Kyoto / Pacific Northwest",
      bio: "Focuses on wood-fired stoneware vessels created with harvested mountain clay and natural wood-ash glazes.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Hand-Thrown Terrazzo Clay Vase",
      icon: "🏺",
    },
    {
      name: "Marcus Lindqvist",
      specialty: "Heirloom Woodturner",
      location: "Stockholm, Sweden",
      bio: "Carves sculptural bowls and kitchen tools strictly from sustainably felled local walnut, birch, and oak.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Black Walnut Catchall",
      icon: "🪵",
    },
    {
      name: "Amina Al-Mansoor",
      specialty: "Botanical Weaver & Fiber Artist",
      location: "Oaxaca, Mexico",
      bio: "Uses vintage wooden floor looms and extracts pigments from indigo, marigold, and cochineal.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      featuredItem: "Naturally Dyed Organic Linen Throw",
      icon: "🧵",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <nav className="breadcrumb mb-8">
          <Link href="/">Handmade</Link>
          <span className="sep">/</span>
          <span className="current">Artisans</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="page-label">The Guild of Makers</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mt-3 tracking-tight">
            Meet the Artisans
          </h1>
          <p className="text-base text-stone-500 mt-3 leading-relaxed">
            The skilled hands, heritage techniques, and studios behind every handmade object.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {artisans.map((artisan, i) => (
            <article
              key={artisan.name}
              className="card card-hover flex flex-col p-6"
              style={{ animationDelay: i * 0.07 + "s" }}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/20 shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight">{artisan.name}</h3>
                  <div className="text-xs text-amber-700 font-semibold mt-0.5">{artisan.specialty}</div>
                  <div className="text-xs text-stone-400 mt-1">📍 {artisan.location}</div>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed flex-1">{artisan.bio}</p>

              <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-2.5">
                <span className="text-xl">{artisan.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Signature Piece</div>
                  <div className="text-xs font-semibold text-stone-800 truncate">{artisan.featuredItem}</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="badge badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Verified Maker
                </span>
                <Link href="/items" className="text-xs font-semibold text-stone-700 hover:text-amber-700 transition-colors">
                  View Items →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-strip mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Join the Artisan Guild</h2>
            <p className="text-sm text-stone-300 mt-1">Open your studio shop and share your craft with the world.</p>
          </div>
          <Link href="/register" className="btn btn-amber btn-lg flex-shrink-0">
            Open Your Studio Shop
          </Link>
        </div>

      </div>
    </div>
  );
}
`;

/* ── COLLECTIONS ───────────────────────────────────────── */
const collections = `import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Collections — Handmade",
  description: "Themed collections of handcrafted goods organised by material tradition and studio guild.",
};

export default function CollectionsPage() {
  const collections = [
    {
      title: "Earth & Fire: Studio Ceramics",
      description: "Wood-fired pottery, stoneware bowls, and sculptural vases handcrafted by independent ceramicists.",
      count: "24 items",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
      icon: "🏺",
    },
    {
      title: "Woven Heritage: Loom & Thread",
      description: "Naturally dyed throws, tapestries, and tabletop linens woven on heritage floor looms.",
      count: "18 items",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
      icon: "🧵",
    },
    {
      title: "Forest Grain: Heirloom Woodwork",
      description: "Hand-turned walnut bowls, edge-grain boards, and carved kitchen utensils from fallen timber.",
      count: "15 items",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      icon: "🪵",
    },
    {
      title: "Patina & Stitch: Fine Leather",
      description: "Vegetable-tanned goods stitched with waxed linen cord, engineered to age gracefully.",
      count: "12 items",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      icon: "🪡",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <nav className="breadcrumb mb-8">
          <Link href="/">Handmade</Link>
          <span className="sep">/</span>
          <span className="current">Collections</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="page-label">Curated Series</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mt-3 tracking-tight">
            Artisanal Collections
          </h1>
          <p className="text-base text-stone-500 mt-3 leading-relaxed">
            Themed collections organised by material tradition, studio guild, and creative ethos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((col, i) => (
            <article
              key={col.title}
              className="card card-hover overflow-hidden flex flex-col"
              style={{ animationDelay: i * 0.07 + "s" }}
            >
              <div className="h-56 sm:h-64 relative overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="badge badge-dark">{col.count}</span>
                </div>
                <div className="absolute bottom-3 left-3 text-2xl drop-shadow-md">{col.icon}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-xl leading-snug">{col.title}</h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">{col.description}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-stone-100">
                  <Link href="/items" className="btn btn-outline btn-sm">Browse Collection →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-strip mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Explore All Handcrafted Items</h2>
            <p className="text-sm text-stone-300 mt-1">Browse over 4,200 pieces from 850+ independent studios.</p>
          </div>
          <Link href="/items" className="btn btn-amber btn-lg flex-shrink-0">Explore All Items</Link>
        </div>

      </div>
    </div>
  );
}
`;

/* ── ABOUT ─────────────────────────────────────────────── */
const about = `import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Us — Handmade",
  description: "Learn about Handmade, an artisanal marketplace dedicated to connecting independent makers with collectors of handcrafted treasures.",
};

export default function AboutPage() {
  const values = [
    {
      icon: "🏺",
      title: "Authentic Craftsmanship",
      description: "Every item listed on Handmade is made by hand in small studio batches using traditional heritage techniques.",
    },
    {
      icon: "🌿",
      title: "Ethical & Honest Materials",
      description: "We prioritise wild-harvested clays, organic vegetable dyes, reclaimed hardwoods, and sustainable natural fibres.",
    },
    {
      icon: "🤝",
      title: "Direct Maker Support",
      description: "Over 90% of every sale goes directly to independent artisans, sustaining studios and craft lineages for generations.",
    },
  ];

  const stats = [
    { value: "850+",   label: "Independent Studios" },
    { value: "4,200+", label: "Handcrafted Pieces" },
    { value: "92%",    label: "Paid Direct to Makers" },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#fbf9f5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        <nav className="breadcrumb">
          <Link href="/">Handmade</Link>
          <span className="sep">/</span>
          <span className="current">About Us</span>
        </nav>

        {/* Hero text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="page-label">Our Mission & Purpose</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            About Handmade
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            <strong>Handmade</strong> is a curated marketplace celebrating the slow, human art of making by hand.
            We connect master potters, weavers, woodturners, and jewelers directly with people who value
            intentional living and timeless objects.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/70 aspect-[21/9] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
            alt="Artisan ceramic maker shaping pottery on a traditional wheel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/10 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-lg">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300">Studio Philosophy</span>
              <p className="text-sm sm:text-base font-serif font-medium mt-1 text-stone-100 leading-snug">
                &ldquo;Every brushstroke, hammer blow, and warp thread tells a human story that mass production can never replicate.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Values + Stats */}
        <div className="bg-white rounded-3xl border border-stone-200/70 shadow-sm p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Why We Built Handmade</h2>
            <p className="text-sm text-stone-500 mt-2 leading-relaxed">
              In an age of automated factory replicas and disposable trends, we champion objects designed to outlive us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((val, i) => (
              <div
                key={val.title}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-3 hover:border-amber-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 text-xl flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-serif font-bold text-stone-900">{val.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100 grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-strip flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Discover Authentic Craftsmanship</h3>
            <p className="text-sm text-stone-300 mt-1">Browse our catalog or register your own artisan studio today.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/items" className="btn btn-amber">Explore Items</Link>
            <Link
              href="/register"
              className="btn"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Open Studio
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/artisans/page.js',    artisans,    'utf8');
fs.writeFileSync('src/app/collections/page.js', collections, 'utf8');
fs.writeFileSync('src/app/about/page.js',       about,       'utf8');
console.log('Done: artisans, collections, about');
