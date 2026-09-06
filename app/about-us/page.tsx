import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { aboutPageQuery } from "@/sanity/lib/queries";

import { Section } from "@/components/Section";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { HeroSlider } from "@/components/HeroSlider";

interface Value {
  _id: string;
  title: string;
  description: string;
  icon?: any;
}

interface Person {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  department?: string;
  image?: any;
  linkedin?: string;
}

interface AboutData {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: any;
  heroSlides?: { image: any; alt?: string }[];
  storyTitle?: string;
  storyContent?: any;
  storyImage?: any;
  mission: string;
  missionImage?: any;
  vision: string;
  visionImage?: any;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface PageData {
  about: AboutData;
  values: Value[];
  leadership: Person[];
  team: Person[];
}

export async function generateMetadata(): Promise<Metadata> {
  const data: PageData = await client.fetch(aboutPageQuery);
  const title =
    data?.about?.seoTitle || "About Us | Youth Evolution Foundation";
  const description =
    data?.about?.seoDescription ||
    "Learn about YEF's mission, vision, and the team empowering youth through education and mentorship.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/about-us",
      siteName: "Youth Evolution Foundation",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex justify-center pt-6" aria-hidden="true">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-teal-100 ring-4 ring-white shadow">
        <span className="text-xl font-bold text-blue-800">{initials}</span>
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

export default async function AboutUsPage() {
  const data: PageData = await client.fetch(aboutPageQuery);
  const { about, values, leadership, team } = data;

  const groupedTeam = Object.entries(
    (team || []).reduce((groups: Record<string, Person[]>, person) => {
      const dept = person.department || "Team";
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(person);
      return groups;
    }, {})
  );

  return (
    <main>
      {/* Hero */}
      <HeroSlider
        slides={about?.heroSlides || []}
        title={about?.heroTitle}
        subtitle={about?.heroSubtitle}
      />

      {/* Our Story */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
              {about?.storyTitle || "Our Story"}
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="max-w-md space-y-5 text-slate-600 leading-relaxed">
              {about?.storyContent && (
                <PortableText value={about.storyContent} />
              )}
            </div>

            {about?.storyImage && (
              <div className="relative">
                <img
                  src={urlFor(about.storyImage).width(1000).height(700).url()}
                  alt={
                    about.storyImage?.alt || "Youth Evolution Foundation story"
                  }
                  className="h-[320px] w-full rounded-2xl object-cover shadow-xl sm:h-[400px]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision - circular ring style */}
      <section className="bg-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              What Drives Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            {/* Mission text - left */}
            <div className="mx-auto max-w-xs text-center lg:order-1 lg:ml-auto lg:mr-0 lg:text-left">
              <h3 className="text-2xl font-bold text-blue-800 sm:text-3xl">
                Our Mission
              </h3>
              <div className="mx-auto mt-3 h-px w-full bg-teal-400 lg:mx-0" />
              <p className="mt-4 text-slate-600 leading-relaxed">
                {about?.mission}
              </p>
            </div>

            {/* Circle - center */}
            <div className="relative order-first mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:order-2">
              <div className="absolute inset-0 flex overflow-hidden rounded-full shadow-lg">
                <div className="w-1/2 bg-gradient-to-br from-teal-300 via-teal-500 to-blue-800" />
                <div className="w-1/2 bg-gradient-to-bl from-blue-400 via-blue-700 to-blue-950" />
              </div>

              <div className="absolute left-1/2 top-0 h-4 w-1.5 -translate-x-1/2 rounded-b bg-blue-50" />
              <div className="absolute bottom-0 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-t bg-blue-50" />

              <div className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 text-white sm:left-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>

              <div className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 text-white sm:right-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 p-2 shadow-xl sm:h-44 sm:w-44">
                <div className="h-full w-full overflow-hidden rounded-full">
                  {about?.missionImage ? (
                    <img
                      src={urlFor(about.missionImage)
                        .width(400)
                        .height(400)
                        .url()}
                      alt={about.missionImage?.alt || "Our Mission and Vision"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                      <span className="text-sm text-slate-400">
                        Add image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vision text - right */}
            <div className="mx-auto max-w-xs text-center lg:order-3 lg:mx-0 lg:mr-auto lg:text-left">
              <h3 className="text-2xl font-bold text-blue-800 sm:text-3xl">
                Our Vision
              </h3>
              <div className="mt-3 h-px w-full bg-blue-800" />
              <p className="mt-4 text-slate-600 leading-relaxed">
                {about?.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              What We Stand For
            </span>
            <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
              Core Values
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {values?.map((value, index) => {
              const styles = [
                {
                  bg: "bg-teal-50",
                  ring: "ring-teal-100",
                  accent: "bg-teal-500",
                  radius: "60% 40% 55% 45% / 45% 55% 40% 60%",
                },
                {
                  bg: "bg-orange-50",
                  ring: "ring-orange-100",
                  accent: "bg-orange-400",
                  radius: "45% 55% 40% 60% / 60% 40% 55% 45%",
                },
                {
                  bg: "bg-blue-50",
                  ring: "ring-blue-100",
                  accent: "bg-blue-800",
                  radius: "55% 45% 60% 40% / 40% 60% 45% 55%",
                },
                {
                  bg: "bg-teal-50",
                  ring: "ring-teal-100",
                  accent: "bg-teal-500",
                  radius: "42% 58% 62% 38% / 58% 42% 38% 62%",
                },
              ];
              const s = styles[index % styles.length];

              return (
                <div
                  key={value._id}
                  className="group flex gap-6 rounded-2xl p-6 transition-colors duration-200 hover:bg-blue-50"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-16 w-16 items-center justify-center ${s.bg} ring-1 ${s.ring} transition-transform duration-200 group-hover:scale-105`}
                      style={{ borderRadius: s.radius }}
                    >
                      {value.icon ? (
                        <img
                          src={urlFor(value.icon).width(30).height(30).url()}
                          alt=""
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${s.accent}`}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-blue-800">
                      {value.title}
                    </h3>
                    <div
                      className={`mt-2 h-0.5 w-8 rounded-full ${s.accent}`}
                    />
                    <p className="mt-3 leading-relaxed text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              Meet The Team
            </span>
            <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
              Leadership
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadership?.map((person) => (
              <div
                key={person._id}
                className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-md">
                  {person.image ? (
                    <img
                      src={urlFor(person.image).width(300).height(300).url()}
                      alt={
                        person.image?.alt || `${person.name}, ${person.role}`
                      }
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                      <span className="text-lg font-bold text-blue-800">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-blue-800">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-orange-500">
                  {person.role}
                </p>
                <div className="mx-auto mt-3 h-px w-8 bg-slate-200" />
                {person.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {person.bio}
                  </p>
                )}
                {person.linkedin && (
                  
                    <a href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:underline"
                  >
                    {person.name.split(" ")[0]}&apos;s LinkedIn profile
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-800/5 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-orange-400/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              The People Behind YEF
            </span>
            <h2 className="mt-3 text-3xl font-bold text-blue-800 sm:text-4xl">
              Our Team
            </h2>
          </div>

          {[...groupedTeam]
            .sort((a, b) => b[1].length - a[1].length)
            .map(([department, members], deptIndex) => {
              const accents = ["bg-teal-500", "bg-orange-400", "bg-blue-800"];
              const accent = accents[deptIndex % accents.length];

              return (
                <section
                  key={department}
                  className="mt-16 first:mt-0"
                  aria-label={department}
                >
                  <div className="mb-10 flex items-center justify-center gap-4">
                    <span className={`h-2 w-2 rounded-full ${accent}`} />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-800">
                      {department}
                    </h3>
                    <span className={`h-2 w-2 rounded-full ${accent}`} />
                  </div>

                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
                    {members.map((person) => (
                      <div
                        key={person._id}
                        className="group w-40 text-center sm:w-44"
                      >
                        <div className="relative mx-auto mb-5 h-24 w-24">
                          <div
                            className={`absolute -inset-1 rounded-full ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-15`}
                          />
                          <div className="relative h-full w-full overflow-hidden rounded-full shadow-md ring-4 ring-white">
                            {person.image ? (
                              <img
                                src={urlFor(person.image)
                                  .width(250)
                                  .height(250)
                                  .url()}
                                alt={
                                  person.image?.alt ||
                                  `${person.name}, ${person.role}`
                                }
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                                <span className="text-lg font-bold text-blue-800">
                                  {person.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-blue-800">
                          {person.name}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {person.role}
                        </p>
                        {person.linkedin && (
                          
                            <a href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center justify-center gap-1 text-xs font-medium text-blue-800 opacity-0 transition-opacity duration-200 hover:underline group-hover:opacity-100"
                          >
                            <LinkedInIcon />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      </section>

      {/* CTA - matches homepage card style */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-blue-800 px-8 py-12 sm:px-16 sm:py-16">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-300">
                  Make A Difference
                </span>
                <h2 className="mt-3 max-w-md text-3xl font-bold text-white sm:text-4xl">
                  {about?.ctaTitle || "Your Support Can Shape What Comes Next"}
                </h2>
              </div>

              {about?.ctaButtonText && about?.ctaButtonLink && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={about.ctaButtonLink}>
                    <button className="whitespace-nowrap rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                      {about.ctaButtonText}
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="whitespace-nowrap rounded-md bg-white px-6 py-3 font-semibold text-blue-800 transition-colors hover:bg-blue-50">
                      Contact Us
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}