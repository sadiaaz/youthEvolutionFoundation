import Link from "next/link";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { aboutPageQuery } from "@/sanity/lib/queries";

import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
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
  image?: any;
  linkedin?: string;
}

interface AboutData {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: any;
  storyTitle?: string;
  storyContent?: any;
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
  return {
    title: data?.about?.seoTitle || "About Us | Youth Evolution Foundation",
    description:
      data?.about?.seoDescription ||
      "Learn about YEF's mission, vision, and the team empowering youth through education and mentorship.",
  };
}

export default async function AboutUsPage() {
  const data: PageData = await client.fetch(aboutPageQuery);
  const { about, values, leadership, team } = data;

  return (
    <>
      {/* Hero */}
      <Section background="brand" spacing="lg">
        <Container size="lg">
          {about?.heroImage && (
            <img
              src={urlFor(about.heroImage).width(1200).height(500).url()}
              alt={about.heroImage?.alt || "About Youth Evolution Foundation"}
              className="w-full rounded-xl object-cover mb-8"
            />
          )}
          <Heading level={1} align="center" className="text-white">
            {about?.heroTitle}
          </Heading>
          {about?.heroSubtitle && (
            <p className="mt-4 text-center text-lg text-blue-100 max-w-2xl mx-auto">
              {about.heroSubtitle}
            </p>
          )}
        </Container>
      </Section>

      {/* Our Story */}
      <Section background="white" spacing="md">
        <Container size="md">
          <Heading level={2}>{about?.storyTitle || "Our Story"}</Heading>
          <div className="mt-6 prose prose-slate max-w-none">
            {about?.storyContent && <PortableText value={about.storyContent} />}
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section background="light" spacing="md">
        <Container size="lg">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <Heading level={3}>Mission</Heading>
              <p className="mt-3 text-slate-600">{about?.mission}</p>
            </Card>
            <Card>
              <Heading level={3}>Vision</Heading>
              <p className="mt-3 text-slate-600">{about?.vision}</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section background="white" spacing="md">
        <Container size="lg">
          <Heading level={2} align="center">
            Core Values
          </Heading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values?.map((value) => (
              <Card key={value._id} hoverable>
                <Card.Title>{value.title}</Card.Title>
                <Card.Description>{value.description}</Card.Description>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section background="light" spacing="md">
        <Container size="lg">
          <Heading level={2} align="center">
            Leadership
          </Heading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership?.map((person) => (
              <Card key={person._id} hoverable noPadding>
                {person.image && (
                  <Card.Image
                    src={urlFor(person.image).width(600).height(340).url()}
                    alt={person.image?.alt || person.name}
                  />
                )}
                <div className="p-5 sm:p-6">
                  <Card.Title>{person.name}</Card.Title>
                  <p className="mt-1 text-sm font-medium text-blue-700">
                    {person.role}
                  </p>
                  {person.bio && (
                    <Card.Description>{person.bio}</Card.Description>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-blue-700 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section background="white" spacing="md">
        <Container size="lg">
          <Heading level={2} align="center">
            Our Team
          </Heading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team?.map((person) => (
              <Card key={person._id} hoverable noPadding>
                {person.image && (
                  <Card.Image
                    src={urlFor(person.image).width(400).height(400).url()}
                    alt={person.image?.alt || person.name}
                  />
                )}
                <div className="p-4">
                  <Card.Title className="text-base">{person.name}</Card.Title>
                  <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark" spacing="lg">
        <Container size="md">
          <Heading level={2} align="center" className="text-white">
            {about?.ctaTitle || "Join Our Mission"}
          </Heading>
          {about?.ctaButtonText && about?.ctaButtonLink && (
            <div className="mt-8 flex justify-center">
              <Link href={about.ctaButtonLink}>
                <Button size="lg">{about.ctaButtonText}</Button>
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}