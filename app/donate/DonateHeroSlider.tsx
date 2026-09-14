"use client";

import { useState, useEffect } from "react";

const images = ["/donate-hero-1.jpg", "/donate-hero-2.jpg"];

const categories = [
  {
    title: "Education",
    desc: "Books & school supplies",
    bg: "bg-blue-50",
    iconBg: "bg-blue-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
  {
    title: "Mentorship",
    desc: "Guidance for young leaders",
    bg: "bg-teal-50",
    iconBg: "bg-teal-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Skills Training",
    desc: "Workshops & certifications",
    bg: "bg-orange-50",
    iconBg: "bg-orange-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
      </svg>
    ),
  },
  {
    title: "Community Care",
    desc: "Support for families in need",
    bg: "bg-rose-50",
    iconBg: "bg-rose-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function DonateHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[480px] items-center sm:min-h-[600px]">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Youth Evolution Foundation donation drive"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-blue-950/65" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">
            Support Our Mission
          </span>
          <h1 className="mt-4 font-serif text-5xl italic text-white sm:text-6xl">
            Donate for a Brighter Future
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            May your generosity give young people the opportunity to learn,
            grow, and lead — and offer their communities a chance to thrive.
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === current ? "w-6 bg-white" : "w-6 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category cards row - overlapping the hero */}
      <div className="relative z-10 mx-auto -mt-12 max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`group rounded-2xl ${cat.bg} p-5 text-center shadow-lg transition-transform duration-200 hover:-translate-y-1 sm:p-6`}
            >
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${cat.iconBg} text-white shadow-md transition-transform duration-200 group-hover:scale-110`}
              >
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                {cat.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}