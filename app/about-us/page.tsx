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
  vision: string;
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
    <div
      className="flex aspect-square w-full items-center justify-center rounded-t-xl bg-blue-50"
      aria-hidden="true"
    >
      <span className="text-3xl font-bold text-blue-800">{initials}</span>
    </div>
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

      {/* Our Story */}
      <Section background="white" spacing="md">
        <SectionHeading align="left">
          {about?.storyTitle || "Our Story"}
        </SectionHeading>
        <div className="mt-8">
          <div className="prose prose-lg prose-slate max-w-3xl">
            {about?.storyContent && (
              <PortableText value={about.storyContent} />
            )}
          </div>
          {about?.storyImage && (
            <div className="relative mt-10 mb-6 sm:mb-0">
              <img
                src={urlFor(about.storyImage).width(1200).height(600).url()}
                alt={
                  about.storyImage?.alt ||
                  "Youth Evolution Foundation community activity"
                }
                className="w-full max-h-[420px] rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-6 left-6 hidden rounded-xl bg-white p-4 shadow-lg sm:block">
                <p className="text-2xl font-bold text-blue-900">2025</p>
                <p className="text-sm text-slate-600">Year Founded</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section background="light" spacing="lg">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-t-4 border-t-blue-700">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              Our Mission
            </span>
            <Heading level={3} className="mt-2 text-blue-950">
              Mission
            </Heading>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {about?.mission}
            </p>
          </Card>
          <Card className="border-t-4 border-t-teal-500">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              Our Vision
            </span>
            <Heading level={3} className="mt-2 text-blue-950">
              Vision
            </Heading>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {about?.vision}
            </p>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section background="white" spacing="lg">
        <SectionHeading>Core Values</SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values?.map((value) => (
            <Card
              key={value._id}
              hoverable
              className="text-center transition-transform duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-600"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                {value.icon ? (
                  <img
                    src={urlFor(value.icon).width(32).height(32).url()}
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <span
                    className="h-3 w-3 rounded-full bg-teal-500"
                    aria-hidden="true"
                  />
                )}
              </div>
              <Card.Title className="text-blue-950">
                {value.title}
              </Card.Title>
              <Card.Description>{value.description}</Card.Description>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section background="light" spacing="lg">
        <SectionHeading>Leadership</SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership?.map((person) => (
            <Card
              key={person._id}
              hoverable
              noPadding
              className="bg-white transition-transform duration-200 hover:-translate-y-1"
            >
              {person.image ? (
                <Card.Image
                  src={urlFor(person.image).width(600).height(340).url()}
                  alt={person.image?.alt || `${person.name}, ${person.role}`}
                />
              ) : (
                <Initials name={person.name} />
              )}
              <div className="p-5 sm:p-6">
                <Card.Title className="text-blue-950">
                  {person.name}
                </Card.Title>
                <p className="mt-1 text-sm font-medium text-teal-600">
                  {person.role}
                </p>
                {person.bio && (
                  <Card.Description>{person.bio}</Card.Description>
                )}
                {person.linkedin && (
                  
                    <a href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                  >
                    {person.name.split(" ")[0]}&apos;s LinkedIn profile
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section background="white" spacing="lg">
        <SectionHeading>Our Team</SectionHeading>
        {groupedTeam.map(([department, members]) => (
          <section
            key={department}
            className="mt-12 first:mt-10"
            aria-label={department}
          >
            <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-teal-600">
              {department}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((person) => (
                <Card
                  key={person._id}
                  hoverable
                  noPadding
                  className="transition-transform duration-200 hover:-translate-y-1"
                >
                  {person.image ? (
                    <Card.Image
                      src={urlFor(person.image).width(400).height(400).url()}
                      alt={
                        person.image?.alt || `${person.name}, ${person.role}`
                      }
                    />
                  ) : (
                    <Initials name={person.name} />
                  )}
                  <div className="p-4 text-center">
                    <Card.Title className="text-base text-blue-950">
                      {person.name}
                    </Card.Title>
                    <p className="mt-1 text-sm text-slate-600">
                      {person.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </Section>

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