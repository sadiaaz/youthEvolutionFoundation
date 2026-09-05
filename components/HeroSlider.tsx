"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Slide {
  image: any;
  alt?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  title: string;
  subtitle?: string;
}

export function HeroSlider({ slides, title, subtitle }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => setCurrent(index);
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-blue-800 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-xl text-lg text-white/90">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[550px] items-center sm:min-h-[600px]">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={urlFor(slide.image).width(1600).height(900).url()}
            alt={slide.alt || title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-blue-950/60" />

        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 sm:flex"
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 sm:flex"
            >
              →
            </button>
          </>
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-xl text-lg text-white/90">{subtitle}</p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/programs">
                <button className="w-full rounded-md bg-blue-800 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-blue-900 sm:w-auto">
                  Our Programs
                </button>
              </Link>
              <Link href="/get-involved">
                <button className="w-full rounded-md bg-white px-8 py-3.5 font-semibold text-blue-800 transition-colors hover:bg-blue-50 sm:w-auto">
                  Join as a Volunteer
                </button>
              </Link>
            </div>

            {slides.length > 1 && (
              <div className="mt-10 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === current ? "w-6 bg-white" : "w-6 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}