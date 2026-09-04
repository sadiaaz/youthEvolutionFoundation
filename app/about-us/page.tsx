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

function SectionHeading({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Heading level={2} align={align} className="text-blue-950">
        {children}
      </Heading>
      <div
        className={`mt-3 h-1 w-16 rounded-full bg-teal-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
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
      <Section background="brand" spacing="lg">

        <span className="block text-center text-sm font-semibold uppercase tracking-widest text-teal-300">
          About Youth Evolution Foundation
        </span>
        <Heading level={1} align="center" className="mt-4 text-white">
          {about?.heroTitle}
        </Heading>
        {about?.heroSubtitle && (
          <p className="mt-4 text-center text-lg text-blue-100 max-w-2xl mx-auto">
            {about.heroSubtitle}
          </p>
        )}
      </Section>

      {/* Our Story - editorial style */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-0">
            {/* Vertical side label (desktop only) */}
            <div className="hidden lg:flex absolute -left-6 top-0 h-full items-center">
              <span className="[writing-mode:vertical-rl] rotate-180 font-serif italic text-sm tracking-widest text-slate-400">
                founded with purpose — growing together
              </span>
            </div>

            {/* Text block — overlaps the image on desktop */}
            <div className="relative z-10 bg-white px-2 py-6 lg:-mr-24 lg:py-16 lg:pl-16 lg:pr-20">
              <span className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
                <span className="text-orange-400">×</span> Our Story
              </span>
              <h2 className="font-serif text-4xl leading-tight tracking-wide text-blue-950 sm:text-5xl">
                {about?.storyTitle || "Our Story"}
              </h2>
              <div className="mt-6 h-px w-16 bg-orange-400" />
              <div className="mt-8 max-w-md space-y-5 font-serif text-[15px] leading-8 text-slate-600">
                {about?.storyContent && (
                  <PortableText value={about.storyContent} />
                )}
              </div>
            </div>

            {/* Background story image */}
            {about?.storyImage && (
              <div className="relative lg:col-start-2">
                <img
                  src={urlFor(about.storyImage).width(1000).height(1200).url()}
                  alt={
                    about.storyImage?.alt || "Youth Evolution Foundation story"
                  }
                  className="h-[420px] w-full object-cover shadow-xl sm:h-[520px] lg:h-[620px]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision - blob style */}
<section className="bg-slate-50 py-16 sm:py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
      {/* Mission */}
      <div>
        <div className="relative mb-8 h-40 w-40">
          {/* decorative background blob - slightly bigger, offset */}
          <div
            className="absolute -inset-3 rounded-[58%_42%_38%_62%/42%_58%_62%_38%] bg-teal-100"
            aria-hidden="true"
          />
          <div className="absolute inset-0 overflow-hidden rounded-[60%_40%_55%_45%/45%_55%_40%_60%] shadow-md">
            {about?.missionImage ? (
              <img
                src={urlFor(about.missionImage).width(400).height(400).url()}
                alt={about.missionImage?.alt || "Our Mission"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-teal-50">
                <span className="h-3 w-3 rounded-full bg-teal-500" />
              </div>
            )}
          </div>
        </div>

        <h3 className="font-serif text-3xl text-blue-950 sm:text-4xl">
          Our Mission
        </h3>
        <div className="mt-4 h-1 w-12 rounded-full bg-orange-400" />
        <p className="mt-6 max-w-md text-slate-600 leading-relaxed">
          {about?.mission}
        </p>
      </div>

      {/* Vision */}
      <div>
        <div className="relative mb-8 h-40 w-40">
          <div
            className="absolute -inset-3 rounded-[42%_58%_62%_38%/58%_42%_38%_62%] bg-orange-100"
            aria-hidden="true"
          />
          <div className="absolute inset-0 overflow-hidden rounded-[45%_55%_40%_60%/60%_40%_55%_45%] shadow-md">
            {about?.visionImage ? (
              <img
                src={urlFor(about.visionImage).width(400).height(400).url()}
                alt={about.visionImage?.alt || "Our Vision"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-orange-50">
                <span className="h-3 w-3 rounded-full bg-orange-400" />
              </div>
            )}
          </div>
        </div>

        <h3 className="font-serif text-3xl text-blue-950 sm:text-4xl">
          Our Vision
        </h3>
        <div className="mt-4 h-1 w-12 rounded-full bg-teal-500" />
        <p className="mt-6 max-w-md text-slate-600 leading-relaxed">
          {about?.vision}
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Core Values - enhanced */}
<section className="bg-white py-16 sm:py-24">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-16 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
        What We Stand For
      </span>
      <h2 className="mt-3 font-serif text-4xl text-blue-800 sm:text-5xl">
        Core Values
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-400" />
    </div>

    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
      {values?.map((value, index) => {
        const styles = [
          { bg: "bg-teal-50", ring: "ring-teal-100", accent: "bg-teal-500", radius: "60% 40% 55% 45% / 45% 55% 40% 60%" },
          { bg: "bg-orange-50", ring: "ring-orange-100", accent: "bg-orange-400", radius: "45% 55% 40% 60% / 60% 40% 55% 45%" },
          { bg: "bg-blue-50", ring: "ring-blue-100", accent: "bg-blue-800", radius: "55% 45% 60% 40% / 40% 60% 45% 55%" },
          { bg: "bg-teal-50", ring: "ring-teal-100", accent: "bg-teal-500", radius: "42% 58% 62% 38% / 58% 42% 38% 62%" },
        ];
        const s = styles[index % styles.length];

        return (
          <div
            key={value._id}
            className="group flex gap-6 rounded-2xl p-6 transition-colors duration-200 hover:bg-slate-50"
          >
            {/* Icon blob */}
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
                  <span className={`h-2.5 w-2.5 rounded-full ${s.accent}`} />
                )}
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="font-serif text-xl text-blue-800">
                {value.title}
              </h3>
              <div className={`mt-2 h-0.5 w-8 rounded-full ${s.accent}`} />
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
<section className="bg-slate-50 py-16 sm:py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-14 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
        Meet The Team
      </span>
      <h2 className="mt-3 font-serif text-4xl text-blue-800 sm:text-5xl">
        Leadership
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-400" />
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
                alt={person.image?.alt || `${person.name}, ${person.role}`}
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

          <h3 className="font-serif text-xl text-blue-800">
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
<section className="bg-white py-16 sm:py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-16 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
        The People Behind YEF
      </span>
      <h2 className="mt-3 font-serif text-4xl text-blue-800 sm:text-5xl">
        Our Team
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-400" />
    </div>

    {groupedTeam.map(([department, members], deptIndex) => {
      const accents = ["bg-teal-500", "bg-orange-400", "bg-blue-800"];
      const accent = accents[deptIndex % accents.length];

      return (
        <section
          key={department}
          className="mt-16 first:mt-0"
          aria-label={department}
        >
          {/* Department label */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <span className={`h-2 w-2 rounded-full ${accent}`} />
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-800">
              {department}
            </h3>
            <span className={`h-2 w-2 rounded-full ${accent}`} />
          </div>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((person) => (
              <div key={person._id} className="group text-center">
                <div className="relative mx-auto mb-5 h-28 w-28">
                  <div
                    className={`absolute -inset-1 rounded-full ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-15`}
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-full shadow-md ring-4 ring-white">
                    {person.image ? (
                      <img
                        src={urlFor(person.image).width(250).height(250).url()}
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
                </div>

                <h4 className="font-serif text-base text-blue-800">
                  {person.name}
                </h4>
                <p className="mt-1 text-sm text-slate-500">{person.role}</p>
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
      {/* CTA */}
      <Section background="dark" spacing="lg">
        <span className="block text-center text-sm font-semibold uppercase tracking-widest text-teal-400">
          Get Involved
        </span>
        <Heading level={2} align="center" className="mt-3 text-white">
          {about?.ctaTitle || "Join Our Mission"}
        </Heading>
        {about?.ctaButtonText && about?.ctaButtonLink && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href={about.ctaButtonLink}>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring-orange-400"
              >
                {about.ctaButtonText}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        )}

      </Section>
    </main>
  );
}