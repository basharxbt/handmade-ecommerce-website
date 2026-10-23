"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Award,
  Heart,
  MapPin,
  CheckCircle2,
  Star,
  Mail,
  Compass,
  Flame,
  Hammer,
} from "lucide-react";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const featuredArtisans = [
    {
      name: "Elena Rostova",
      role: "Master Potter & Ceramicist",
      location: "Kyoto, Japan",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      studioPhoto:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
      experience: "16 yrs",
      quote:
        "Every piece carries the fingerprint of human hands and 36 continuous hours of wood-ash flame.",
      specialty: "Anagama Wood Kilns & Terrazzo Stoneware",
      link: "/items?category=Ceramics",
    },
    {
      name: "Marcus Lindqvist",
      role: "Heirloom Woodturner",
      location: "Stockholm, Sweden",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      studioPhoto:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      experience: "22 yrs",
      quote:
        "I only harvest urban hardwoods that fell naturally during Scandinavian autumn storms.",
      specialty: "Single-Block Walnut & Reclaimed Oak",
      link: "/items?category=Woodcraft",
    },
    {
      name: "Amina Diallo",
      role: "Botanical Weaver & Guild Head",
      location: "Oaxaca, Mexico",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      studioPhoto:
        "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=600&q=80",
      experience: "14 yrs",
      quote:
        "We brew our wild indigo and marigold dye vats using heritage recipes passed down across four generations.",
      specialty: "Organic Belgian Flax & Living Botanical Dyes",
      link: "/items?category=Textiles",
    },
  ];

  const craftPillars = [
    {
      icon: Leaf,
      title: "Conscious Material Sourcing",
      desc: "Foraged riverbed clays, windfall urban hardwoods, and certified organic European flax. Zero toxic synthetics or plastic fillers.",
      tag: "Earth First",
    },
    {
      icon: Award,
      title: "Direct 88% Artisan Royalties",
      desc: "Makers receive the lion's share of every purchase directly, sustaining independent studios and heritage apprenticeships worldwide.",
      tag: "Fair Trade",
    },
    {
      icon: Sparkles,
      title: "Hand-Signed & Numbered",
      desc: "Every creation is individually finished, inspected, and stamped with the maker's registered hallmark and studio batch certificate.",
      tag: "Authentic",
    },
    {
      icon: ShieldCheck,
      title: "Lifetime Craft Guarantee",
      desc: "Pieces built to become family heirlooms. We provide lifelong conditioning guides and complimentary repair for all studio items.",
      tag: "Heirloom Quality",
    },
  ];

  const craftJourney = [
    {
      step: "01",
      title: "Ethical Harvest",
      desc: "Sourcing wild clays, windfall timber, and botanical dye plants strictly in harmony with seasonal natural cycles.",
      time: "Season-Aligned",
    },
    {
      step: "02",
      title: "Slow Shaping",
      desc: "Drawn-out hours on traditional momentum wheels, heritage floor looms, or hand-planing with Japanese steel gouges.",
      time: "24–48 Hours",
    },
    {
      step: "03",
      title: "Kiln & Dye Alchemy",
      desc: "Firing in multi-chamber wood kilns reaching 1,280°C, and steeping flax yarns in living botanical fermentation vats.",
      time: "36 Continuous Hours",
    },
    {
      step: "04",
      title: "Certified Provenance",
      desc: "Hand-numbered, stamped with the artisan wax seal, and shipped in plastic-free biodegradable recycled packaging.",
      time: "Hand-Numbered",
    },
  ];

  const testimonials = [
    {
      quote:
        "The hand-thrown terrazzo vase is the tactile centerpiece of our home. You can feel the real human warmth and stone grain the moment you hold it.",
      author: "Sarah & David K.",
      role: "Architectural Designers, San Francisco",
      item: "Terrazzo Clay Vase",
      rating: 5,
    },
    {
      quote:
        "In a sea of soulless fast-furniture, Handmade connects you with actual master makers. The walnut catchall will be passed down to my children.",
      author: "Julian Vance",
      role: "Collector & Creative Director, London",
      item: "Black Walnut Catchall",
      rating: 5,
    },
    {
      quote:
        "The botanical linen throw has softened into absolute perfection. Knowing Amina loomed it personally in Oaxaca gives it incredible soul and character.",
      author: "Elena M.",
      role: "Art Curator, Zurich",
      item: "Naturally Dyed Linen Throw",
      rating: 5,
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "Hand-Thrown Terrazzo Clay Vase",
      artisan: "Elena Rostova",
      category: "Ceramics",
      price: "$84.00",
      rating: "5.0",
      reviews: 32,
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80",
      tag: "Best Seller",
    },
    {
      id: 2,
      title: "Hand-Carved Black Walnut Catchall",
      artisan: "Marcus Lindqvist",
      category: "Woodcraft",
      price: "$68.00",
      rating: "4.9",
      reviews: 19,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      tag: "Artisan Pick",
    },
    {
      id: 3,
      title: "Naturally Dyed Organic Linen Throw",
      artisan: "Amina & Co. Weavers",
      category: "Textiles",
      price: "$120.00",
      rating: "4.9",
      reviews: 44,
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
      tag: "Eco Friendly",
    },
    {
      id: 4,
      title: "Vegetable Tanned Leather Travel Folio",
      artisan: "Mateo Silva Studio",
      category: "Leather Goods",
      price: "$95.00",
      rating: "4.8",
      reviews: 28,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      tag: "Limited Craft",
    },
  ];

  const categories = [
    { name: "Pottery & Stoneware", count: "142 items", icon: "🏺" },
    { name: "Woven Fiber & Textiles", count: "89 items", icon: "🧵" },
    { name: "Heirloom Woodcraft", count: "64 items", icon: "🪵" },
    { name: "Artisanal Jewelry", count: "115 items", icon: "💍" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf9f5] via-[#f7f2e9] to-[#fbf9f5] py-16 md:py-24 border-b border-stone-200/70">
        {/* Soft background accents */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Curated Marketplace for Authentic Makers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
                Crafted with intention. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-stone-800">
                  Treasured for generations.
                </span>
              </h1>

              <p className="text-lg text-stone-600 max-w-2xl font-light leading-relaxed">
                Welcome to <strong>Handmade</strong> — an artisan-first collective where master potters, weavers, woodworkers, and jewelers share honest crafts directly with collectors.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/items"
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Explore Handcrafted Items
                </Link>

                {isLoggedIn ? (
                  <Link
                    href="/items/add"
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 font-medium text-sm transition-all duration-200 shadow-sm flex items-center gap-2"
                  >
                    <span className="text-amber-600 font-bold">+</span>
                    List New Item
                  </Link>
                ) : (
                  <Link
                    href="/register"
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 font-medium text-sm transition-all duration-200 shadow-sm"
                  >
                    Join as Artisan Maker
                  </Link>
                )}
              </div>

              {/* Artisan Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">4,200+</div>
                  <div className="text-xs text-stone-500">Verified Crafts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">850+</div>
                  <div className="text-xs text-stone-500">Independent Studios</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900">4.98 / 5</div>
                  <div className="text-xs text-stone-500">Collector Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
                    alt="Artisan ceramic maker at work"
                    className="w-full h-96 object-cover"
                  />
                  <div className="p-5 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        Featured Artisan of the Month
                      </span>
                      <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium border border-amber-200">
                        Ceramics Guild
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-stone-900 mt-1">
                      Elena Rostova Pottery Studio
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Fired in wood-burning kilns using local riverbed clay and natural ash glazes.
                    </p>
                  </div>
                </div>

                {/* Floating Interactive Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-lg">
                    ✨
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">100% Traceable Craft</div>
                    <div className="text-[11px] text-stone-500">Directly from maker to your doorstep</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-12 border-b border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/collections"
                className="group p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-amber-600/50 hover:shadow-md transition-all flex items-center gap-3.5"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-xs text-stone-400">{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-16 md:py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Handmade Marketplace
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
                Handcrafted Signatures
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Authentic, one-of-a-kind studio pieces ready to ship directly from master workshops.
              </p>
            </div>
            <Link
              href="/items"
              className="text-sm font-semibold text-stone-800 hover:text-amber-700 mt-4 md:mt-0 inline-flex items-center gap-1.5 group transition-colors"
            >
              Browse all items{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-stone-100">
                    {product.tag}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span>{product.category}</span>
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">by {product.artisan}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-base font-bold text-stone-900 font-mono">
                      {product.price}
                    </span>
                    <Link
                      href={`/items/item-${product.id}`}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white text-xs font-semibold text-stone-800 transition-colors inline-flex items-center gap-1"
                    >
                      View Piece
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Lookbook / Seasonal Feature */}
      <section className="py-16 md:py-24 bg-[#f5f0e8] border-y border-stone-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  Autumn 2026 Curated Capsule
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                  The Earth & Fire Collection
                </h2>
                <p className="text-stone-600 text-base leading-relaxed">
                  Sculpted from mountain stoneware clay, harvested river stone grit, and weathered Nordic hardwoods. This seasonal capsule explores the raw tactile boundaries between mineral geology and slow human craftsmanship.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <div className="text-xs text-stone-400 uppercase font-semibold">Kiln Type</div>
                    <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">Anagama Wood</div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <div className="text-xs text-stone-400 uppercase font-semibold">Glaze Formula</div>
                    <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">Natural Pine Ash</div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl col-span-2 sm:col-span-1">
                    <div className="text-xs text-stone-400 uppercase font-semibold">Limited Run</div>
                    <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">32 Pieces Total</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <Link
                  href="/collections"
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-medium text-sm transition-all duration-200 shadow-md inline-flex items-center gap-2 group"
                >
                  Explore Capsule
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/items?category=Ceramics"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium text-sm transition-all shadow-sm"
                >
                  View Ceramics Only
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80"
                alt="Wood-fired ceramics in warm studio light"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-200 hidden sm:block">
                <p className="text-xs font-serif italic text-stone-800">
                  &ldquo;A ceramic vessel is not merely an object; it is frozen heat, riverbed earth, and thirty-six hours of patience.&rdquo;
                </p>
                <span className="text-[11px] font-bold text-amber-800 block mt-1">
                  — Master Potter Elena Rostova, Kyoto
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Handmade Craft Standard (4 Pillars) */}
      <section className="py-16 md:py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              The Guild Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              Why Handcrafted Matters
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              In an age of automated convenience, we champion deliberate, human-paced craftsmanship that honors materials, tradition, and the makers who sustain them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-lg hover:border-amber-600/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100/80 text-amber-800 flex items-center justify-center transition-colors">
                        <IconComponent className="w-6 h-6 text-amber-700" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 group-hover:bg-amber-50 group-hover:text-amber-800 transition-colors">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Guild Certified Guarantee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artisan Guild Spotlight ("Voices From the Studio") */}
      <section className="py-16 md:py-24 bg-stone-100/60 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Master Makers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
                Meet the Artisans
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Step inside independent workshops across the globe and discover the artists behind each creation.
              </p>
            </div>
            <Link
              href="/artisans"
              className="text-sm font-semibold text-stone-800 hover:text-amber-700 mt-4 md:mt-0 inline-flex items-center gap-1.5 group transition-colors"
            >
              Discover all artisans{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map((artisan, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Studio Header Image */}
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.studioPhoto}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {artisan.location}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/30">
                      {artisan.experience} experience
                    </span>
                  </div>
                </div>

                {/* Artisan Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={artisan.avatar}
                        alt={artisan.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-600/30 shadow-sm"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-800 transition-colors">
                          {artisan.name}
                        </h3>
                        <p className="text-xs text-amber-800 font-medium">{artisan.role}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 mb-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <strong>Focus:</strong> {artisan.specialty}
                    </p>

                    <blockquote className="text-xs text-stone-600 italic font-serif leading-relaxed border-l-2 border-amber-600/40 pl-3">
                      &ldquo;{artisan.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <Link
                      href={artisan.link}
                      className="w-full py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 group-hover:bg-amber-50 group-hover:text-amber-900"
                    >
                      <span>Explore Works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Journey ("From Raw Earth to Collector Heirloom") */}
      <section className="py-16 md:py-24 bg-[#fbf9f5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              The Creative Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              From Raw Earth to Heirloom
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Every handcrafted piece is born from a rigorous, patient cycle of harvesting, shaping, wood firing, and individual hallmark authentication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {craftJourney.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm relative flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-amber-700/40">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {step.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-2 text-stone-400 text-xs font-medium">
                  <Hammer className="w-3.5 h-3.5 text-amber-700" />
                  <span>Stage {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collector Stories & Living Spaces (Testimonials) */}
      <section className="py-16 md:py-24 bg-[#f5f0e8] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
              Living Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              Treasured in Real Homes
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Hear from design collectors, architects, and art lovers who live with our handcrafted pieces every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-stone-700 font-serif italic text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{t.author}</h4>
                      <p className="text-xs text-stone-500">{t.role}</p>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                      {t.item}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Dispatch & Collector's Guild Newsletter (CTA Strip) */}
      <section className="py-16 md:py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-strip relative rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16">
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Mail className="w-3.5 h-3.5" />
                The Collector&apos;s Circle
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                Studio Dispatches & Secret Kiln Drops
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Join our private collector newsletter. Receive weekly behind-the-scenes studio films, intimate maker interviews, and 24-hour advance access to small-batch kiln drops.
              </p>

              {isSubscribed ? (
                <div className="p-4 bg-emerald-900/60 border border-emerald-500/50 rounded-2xl text-emerald-200 text-sm flex items-center justify-center gap-2 animate-fade-up">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Welcome to the Collector&apos;s Circle! Check your inbox for your private preview token.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg whitespace-nowrap cursor-pointer hover:shadow-amber-600/30"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Weekly Kiln Drops
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  No Spam Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Cancel Anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

