"use client";
import './home.css'
import React, { useEffect, useRef, useState } from "react";

const heroSlides = [
  {
    title: "Empowering Youth, Building Sustainable Communities",
    description:
      "Creating opportunities that empower young people through education, leadership, innovation, and community development.",
    primary: "Explore Programs",
    secondary: "Donate",
  },
  {
    title: "Transforming Lives Through Education & Skills",
    description:
      "Helping young people build brighter futures through quality education, skills training, and meaningful mentorship.",
    primary: "Our Programs",
    secondary: "Join as a Volunteer",
  },
  {
    title: "Together We Create Lasting Impact",
    description:
      "Every donation, volunteer, and partnership creates lasting impact and strengthens communities across Pakistan.",
    primary: "Become a Partner",
    secondary: "Donate Now",
  },
  {
    title: "Your Next Opportunity Starts Here",
    description:
      "Join our upcoming events, volunteer initiatives, and youth programs and take the next step toward creating meaningful impact.",
    primary: "View Upcoming Events",
    secondary: "Register Now",
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2200&q=90",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2200&q=90",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=2200&q=90",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=2200&q=90",
];

const partnerLogos = [
  {
    name: "The Citizens Foundation",
    image: "/logos/tcf.png",
  },
  {
    name: "Akhuwat Foundation",
    image: "/logos/akhuwat.png",
  },
  {
    name: "Saylani Welfare",
    image: "/logos/saylani.png",
  },
  {
    name: "UNICEF",
    image: "/logos/unicef.png",
  },
  {
    name: "Engro",
    image: "/logos/engro.png",
  },
  {
    name: "HBL",
    image: "/logos/hbl.png",
  },
];
const programs = [
  {
    number: "02",
    title: "Leadership & Mentorship",
    description:
      "Building confident leaders through guidance, mentorship, and real-world experiences.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=85",
  },
  {
    number: "03",
    title: "Community Development",
    description:
      "Creating positive change through community projects and youth-led initiatives.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&q=85",
  },
  {
    number: "04",
    title: "Career & Entrepreneurship",
    description:
      "Supporting young dreamers to start, grow, and build impactful careers and ventures.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=85",
  },
];

const events = [
  {
    day: "06",
    month: "Aug",
    title: "Career Guidance Workshop",
    description:
      "Empowering young people with practical direction, career insights, and confidence.",
  },
  {
    day: "10",
    month: "Sep",
    title: "Community Impact Day",
    description:
      "A youth-led day of action focused on creating meaningful community impact.",
  },
  {
    day: "28",
    month: "Oct",
    title: "Social Innovation Challenge",
    description:
      "Young changemakers turn creative ideas into solutions for real community needs.",
  },
];

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "YEF Program Participant",
    quote:
      "YEF gave me more than skills. It gave me the confidence to believe I could create change in my community.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Hassan Ahmed",
    role: "Leadership Program Graduate",
    quote:
      "The mentorship I received at YEF completely changed the way I see my future. I now feel prepared to lead and make a difference.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Maham Ali",
    role: "Skills Development Participant",
    quote:
      "I learned practical skills, met inspiring people, and discovered confidence I never knew I had. YEF helped me take the next step.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Bilal Raza",
    role: "Community Volunteer",
    quote:
      "Being part of YEF showed me that young people can create real change when we have the right support, opportunity, and community.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=90",
  },
];

const ArrowRight = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const ArrowLeft = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
);

const Heart = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const Facebook = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.33L17 12H13V9c0-.67.33-1 1-1Z" />
  </svg>
);

const Youtube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9-6.8 3.9Z" />
  </svg>
);

const Linkedin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.06 2.06 0 1 0 4.75 7.12 2.06 2.06 0 0 0 4.75 3ZM21 13.84c0-3.76-2-5.51-4.68-5.51-2.15 0-3.11 1.18-3.65 2.01V8.5H9.17V21h3.5v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.01 1.86 2.01 3.31V21H21v-7.16Z" />
  </svg>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#0758AA]">
    {children}
  </span>
);

const CTAButton = ({
  children,
  variant = "primary",
  href = "#",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
  href?: string;
}) => {
  const styles = {
    primary:
      "bg-[#0758AA] text-white hover:bg-[#064c92] shadow-[0_5px_18px_rgba(7,88,170,0.18)]",
    outline:
      "border border-white/45 bg-transparent text-white hover:bg-white hover:text-[#0758AA]",
    light:
      "bg-white text-[#0758AA] hover:bg-[#f5f9ff] shadow-[0_5px_18px_rgba(0,0,0,0.08)]",
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[7px] px-5 text-[13px] font-semibold transition-all duration-300 ${styles[variant]}`}
    >
      {children}
    </a>
  );
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const testimonialTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const currentHero = heroSlides[heroIndex];
  const currentTestimonial = testimonials[testimonialIndex];

  
   // HERO AUTO SLIDER
  
  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [heroIndex]);

  
  // TESTIMONIAL AUTO ROTATION
   
  useEffect(() => {
    testimonialTimerRef.current = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (testimonialTimerRef.current) {
        window.clearInterval(testimonialTimerRef.current);
      }
    };
  }, []);

  // SCROLL REVEAL
   
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal]"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-scroll-reveal");

            if (id) {
              setVisibleSections((current) => ({
                ...current,
                [id]: true,
              }));
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const nextHero = () => {
    setHeroIndex((current) => (current + 1) % heroSlides.length);
  };

  const previousHero = () => {
    setHeroIndex(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const nextTestimonial = () => {
    setTestimonialIndex(
      (current) => (current + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    setTestimonialIndex(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const revealClass = (id: string, direction: "left" | "right" | "up") => {
    const base =
      "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

    const hidden = {
      left: "translate-x-[-55px] opacity-0",
      right: "translate-x-[55px] opacity-0",
      up: "translate-y-[40px] opacity-0",
    };

    return `${base} ${
      visibleSections[id]
        ? "translate-x-0 translate-y-0 opacity-100"
        : hidden[direction]
    }`;
  };

  return (
  <main className="w-full overflow-hidden bg-white pt-[104px] text-[#26384A]">
    
    {/* HERO */}
    <section className="relative min-h-[460px] overflow-hidden md:h-[572px]">

      {heroSlides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
            index === heroIndex
              ? "z-[1] opacity-100"
              : "z-0 opacity-0"
          }`}
        >
          <img
            src={
              index === 0
                ? "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2200&q=90"
                : index === 1
                ? "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2200&q=90"
                : index === 2
                ? "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=2200&q=90"
                : "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=2200&q=90"
            }
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#082b4d]/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#062f54]/80 via-[#073c68]/35 to-transparent" />
        </div>
      ))}

      {/* Previous */}
      <button
        type="button"
        aria-label="Previous hero slide"
        onClick={previousHero}
        className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0758AA] md:left-6"
      >
        <ArrowLeft />
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next hero slide"
        onClick={nextHero}
        className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0758AA] md:right-6"
      >
        <ArrowRight />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center px-6 py-16 md:px-10 lg:px-12">
        <div
          key={heroIndex}
          className="max-w-[700px] animate-[heroContentIn_700ms_ease-out]"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white/80">
            Youth Evolution Foundation
          </p>

          <h1 className="max-w-[680px] text-[34px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-[43px] md:text-[52px]">
            {currentHero.title}
          </h1>

          <p className="mt-5 max-w-[590px] text-[14px] leading-6 text-white/88 md:text-[15px]">
            {currentHero.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#programs">
              {currentHero.primary}
            </CTAButton>

            <CTAButton href="#support" variant="light">
              {(heroIndex === 0 || heroIndex === 2) && <Heart />}
              {currentHero.secondary}
            </CTAButton>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setHeroIndex(index)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  index === heroIndex
                    ? "w-8 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* =========================================================
    PARTNER STRIP
    ========================================================= */}

<section className="overflow-hidden border-b border-[#edf1f5] bg-white">
  <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-7 md:px-10 lg:px-12">

    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />

    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

    <div
      className="flex w-max items-center gap-14 md:gap-20"
      style={{
        animation: "partnerMove 30s linear infinite",
      }}
    >
      {[...partnerLogos, ...partnerLogos].map((partner, index) => (
        <div
          key={`${partner.name}-${index}`}
          className="flex h-8 w-[110px] shrink-0 items-center justify-center"
        >
          <img
            src={partner.image}
            alt={partner.name}
            className="max-h-8 max-w-[105px] object-contain"
          />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* =========================================================
          WHO WE ARE
          ========================================================= */}

      <section
        data-scroll-reveal="who"
        className={`bg-white px-6 py-20 md:px-10 md:py-[96px] lg:px-12 ${revealClass(
          "who",
          "up"
        )}`}
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="mb-12 text-center md:mb-14">
            <SectionLabel>Who We Are</SectionLabel>

            <h2 className="mx-auto max-w-[600px] text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0758AA] md:text-[34px]">
              Where Young People
              <br className="hidden sm:block" />
              Find the Confidence to Lead.
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">

            {/* LEFT */}
            <div
              data-scroll-reveal="who-text"
              className={revealClass("who-text", "left")}
            >
              <div className="space-y-5 text-[13.5px] leading-[1.85] text-[#667085] md:text-[14px]">
                <p>
                  YEF works at the intersection of education, mentorship,
                  leadership, and community development to equip young people
                  with the skills, support, and opportunities they need to
                  unlock their potential and drive meaningful change.
                </p>

                <p>
                  We believe every young person deserves the chance to learn,
                  grow, lead, and contribute to their community. Through
                  impactful programs, mentorship opportunities, leadership
                  development, and community-driven initiatives, we create
                  spaces where young people can discover their strengths, build
                  confidence, and turn their ideas into action.
                </p>

                <p>
                  Our work goes beyond education. We focus on building
                  resilient, empowered, and socially responsible young leaders
                  who are prepared to create positive change in their
                  communities and beyond.
                </p>
              </div>

              <a
                href="#about"
                className="mt-7 inline-flex h-[42px] items-center gap-2 rounded-[7px] bg-[#0758AA] px-5 text-[13px] font-semibold text-white shadow-[0_5px_18px_rgba(7,88,170,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#064c92]"
              >
                Learn More About YEF
                <ArrowRight />
              </a>
            </div>

            {/* RIGHT */}
            <div
              data-scroll-reveal="who-image"
              className={`relative mx-auto w-full max-w-[520px] ${revealClass(
                "who-image",
                "right"
              )} lg:ml-auto`}
            >
              <div className="overflow-hidden rounded-[12px]">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=90"
                  alt="Young volunteers working together"
                  className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-[1.02] md:h-[440px]"
                />
              </div>

              <div className="absolute -bottom-7 left-4 w-[155px] rounded-[9px] bg-[#0758AA] p-5 shadow-[0_14px_35px_rgba(7,88,170,0.25)] md:left-[-22px] md:w-[170px]">
                <p className="text-[14px] font-semibold leading-[1.55] text-white md:text-[15px]">
                  “We believe in youth. We invest in potential. We build
                  stronger communities together.”
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          WHAT WE DO
          ========================================================= */}

      <section
        id="programs"
        data-scroll-reveal="programs"
        className={`bg-[#EFF7FF] px-6 py-20 md:px-10 md:py-[96px] lg:px-12 ${revealClass(
          "programs",
          "up"
        )}`}
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="mb-12 text-center md:mb-14">
            <SectionLabel>What We Do</SectionLabel>

            <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0758AA] md:text-[34px]">
              Turning Potential Into Possibility.
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:gap-9">

            {/* FEATURED PROGRAM */}
            <div
              data-scroll-reveal="program-featured"
              className={`relative min-h-[420px] overflow-hidden rounded-[14px] shadow-[0_8px_30px_rgba(16,48,80,0.08)] ${revealClass(
                "program-featured",
                "left"
              )}`}
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=90"
                alt="Young woman speaking during a learning session"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#062e53]/90 via-[#062e53]/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                <div className="mb-2 text-[13px] font-bold tracking-[0.15em] text-white/70">
                  01
                </div>

                <h3 className="text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[32px]">
                  Education &
                  <br />
                  Skills
                </h3>

                <p className="mt-3 max-w-[300px] text-[13px] leading-5 text-white/80">
                  Equipping youth with modern knowledge and practical skills
                  for a better future.
                </p>
              </div>
            </div>

            {/* PROGRAM LIST */}
            <div
              data-scroll-reveal="program-list"
              className={`flex flex-col gap-4 ${revealClass(
                "program-list",
                "right"
              )}`}
            >
              {programs.map((program) => (
                <article
                  key={program.number}
                  className="group flex min-h-[127px] gap-4 rounded-[11px] bg-white p-4 shadow-[0_5px_20px_rgba(16,48,80,0.055)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,48,80,0.10)]"
                >
                  <div className="h-[98px] w-[106px] shrink-0 overflow-hidden rounded-[8px]">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 py-1">
                    <div className="text-[11px] font-bold tracking-[0.13em] text-[#0758AA]">
                      {program.number}
                    </div>

                    <h3 className="mt-1 text-[16px] font-bold leading-tight text-[#26384A]">
                      {program.title}
                    </h3>

                    <p className="mt-2 max-w-[390px] text-[12px] leading-[1.55] text-[#667085]">
                      {program.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          EVENTS
          ========================================================= */}

      <section
        id="events"
        data-scroll-reveal="events"
        className={`bg-white px-6 py-20 md:px-10 md:py-[96px] lg:px-12 ${revealClass(
          "events",
          "up"
        )}`}
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="mb-12 text-center md:mb-14">
            <SectionLabel>Join The Movement</SectionLabel>

            <h2 className="mx-auto max-w-[650px] text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0758AA] md:text-[34px]">
              Something Meaningful Is Always Happening.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">

            {/* FEATURED EVENT */}
            <article
              data-scroll-reveal="event-featured"
              className={`grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center ${revealClass(
                "event-featured",
                "left"
              )}`}
            >
              <div className="relative overflow-hidden rounded-[10px]">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=90"
                  alt="Young woman speaking at a leadership conference"
                  className="h-[270px] w-full object-cover transition-transform duration-700 hover:scale-[1.03] md:h-[300px]"
                />

                <div className="absolute left-4 top-4 flex h-[62px] w-[58px] flex-col items-center justify-center rounded-[7px] bg-[#0758AA] text-white shadow-lg">
                  <span className="text-[21px] font-bold leading-none">
                    24
                  </span>

                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em]">
                    Aug
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#667085]">
                  Featured Event
                </p>

                <h3 className="text-[30px] font-extrabold leading-[0.98] tracking-[0.02em] text-[#0758AA]">
                  YOUTH
                  <br />
                  LEADERSHIP
                  <br />
                  SUMMIT
                </h3>

                <p className="mt-4 text-[13px] leading-[1.75] text-[#667085]">
                  A space for emerging voices, mentors, changemakers, and
                  ambitious young leaders to learn, connect, build confidence,
                  and develop the leadership skills needed to create meaningful
                  change.
                </p>

                <a
                  href="#"
                  className="mt-5 inline-flex h-[42px] items-center gap-2 rounded-[7px] bg-[#0758AA] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#064c92]"
                >
                  Register Now
                  <ArrowRight />
                </a>
              </div>
            </article>

            {/* UPCOMING */}
            <div
              data-scroll-reveal="event-list"
              className={`border-l border-[#d8e5f1] pl-6 md:pl-7 ${revealClass(
                "event-list",
                "right"
              )}`}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0758AA]">
                Upcoming Events
              </p>

              <div className="space-y-5">
                {events.map((event) => (
                  <article
                    key={`${event.day}-${event.month}`}
                    className="flex gap-4 border-b border-[#e8edf2] pb-5 last:border-0"
                  >
                    <div className="flex h-[56px] w-[48px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#EFF7FF]">
                      <span className="text-[18px] font-bold leading-none text-[#0758AA]">
                        {event.day}
                      </span>

                      <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#667085]">
                        {event.month}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[15px] font-bold leading-tight text-[#26384A]">
                        {event.title}
                      </h3>

                      <p className="mt-1.5 text-[11.5px] leading-[1.55] text-[#667085]">
                        {event.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          STORIES OF CHANGE
          ========================================================= */}

      <section
        data-scroll-reveal="stories"
        className={`bg-[#EFF7FF] px-6 py-20 md:px-10 md:py-[88px] lg:px-12 ${revealClass(
          "stories",
          "up"
        )}`}
      >
        <div className="mx-auto max-w-[1200px]">

          <div className="mb-10 text-center">
            <SectionLabel>Stories of Change</SectionLabel>

            <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0758AA] md:text-[34px]">
              Real People. Real Growth.
              <br className="hidden sm:block" />
              Real Change.
            </h2>
          </div>

          {/* Smooth testimonial transition */}
          <div
            key={testimonialIndex}
            className="flex flex-col items-center gap-7 md:flex-row md:gap-9 animate-[testimonialIn_700ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            <div className="h-[105px] w-[105px] shrink-0 overflow-hidden rounded-[12px] shadow-sm">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 text-[30px] leading-none text-[#0758AA]">
                “
              </div>

              <blockquote className="max-w-[720px] text-[18px] font-medium leading-[1.55] tracking-[-0.01em] text-[#26384A] md:text-[20px]">
                {currentTestimonial.quote}
              </blockquote>

              <div className="mt-4">
                <p className="text-[14px] font-bold text-[#0758AA]">
                  {currentTestimonial.name}
                </p>

                <p className="mt-0.5 text-[11px] text-[#667085]">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 md:items-end">

              <span className="text-[11px] font-bold tracking-[0.12em] text-[#0758AA]">
                {String(testimonialIndex + 1).padStart(2, "0")} / 04
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={previousTestimonial}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b9d2e8] bg-white text-[#0758AA] transition-all duration-300 hover:-translate-x-0.5 hover:bg-[#0758AA] hover:text-white"
                >
                  <ArrowLeft />
                </button>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={nextTestimonial}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0758AA] bg-[#0758AA] text-white transition-all duration-300 hover:translate-x-0.5 hover:bg-[#064c92]"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="flex gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View testimonial ${index + 1}`}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === testimonialIndex
                        ? "w-5 bg-[#0758AA]"
                        : "w-1.5 bg-[#b9d2e8]"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          SUPPORT CTA
          ========================================================= */}

      <section
        id="support"
        data-scroll-reveal="support"
        className={`bg-white px-6 py-16 md:px-10 md:py-[82px] lg:px-12 ${revealClass(
          "support",
          "up"
        )}`}
      >
        <div className="mx-auto max-w-[1160px] overflow-hidden rounded-[13px] bg-[#0758AA] px-7 py-10 shadow-[0_12px_35px_rgba(7,88,170,0.16)] transition-transform duration-500 hover:shadow-[0_18px_45px_rgba(7,88,170,0.20)] md:px-11 md:py-12 lg:px-14">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">

            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                Make A Difference
              </p>

              <h2 className="max-w-[500px] text-[29px] font-bold leading-[1.12] tracking-[-0.025em] text-white md:text-[35px]">
                Your Support Can Shape
                <br className="hidden sm:block" />
                What Comes Next.
              </h2>
            </div>

            <div className="max-w-[520px]">
              <p className="mb-5 text-[13px] leading-6 text-white/80">
                Give your time. Share your skills. Support a young person's
                journey.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <CTAButton href="#volunteer" variant="outline">
                  <Heart />
                  Volunteer
                </CTAButton>

                <CTAButton href="#donate" variant="outline">
                  <PlusIcon />
                  Donate
                </CTAButton>

                <CTAButton href="#partner" variant="outline">
                  <PlusIcon />
                  Partner With Us
                </CTAButton>
              </div>
            </div>

          </div>
        </div>
      </section>


     
     
    </main>
  );
}