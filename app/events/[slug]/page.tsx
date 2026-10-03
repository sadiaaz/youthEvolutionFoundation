import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { eventBySlugQuery } from "@/sanity/lib/queries";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  content?: any;
  image?: any;
  heroImage?: any;
  eventDate: string;
  location: string;
  status: "upcoming" | "past";
  registrationLink?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: Event = await client.fetch(eventBySlugQuery, { slug });

  if (!event) {
    return { title: "Event Not Found | Youth Evolution Foundation" };
  }

  return {
    title: event.seoTitle || `${event.title} | Youth Evolution Foundation`,
    description: event.seoDescription || event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: Event = await client.fetch(eventBySlugQuery, { slug });

  if (!event) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-800 min-h-[380px] flex items-end pt-20">
        {event.heroImage && (
          <img
            src={urlFor(event.heroImage).width(1920).url()}
            alt={event.heroImage?.alt || event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/85 to-blue-800/70" />

        <div className="relative mx-auto max-w-4xl px-6 pb-12 w-full">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-300 hover:text-teal-200 mb-5"
          >
            ← Back to Events
          </Link>

          <span
            className={`inline-block text-xs font-bold uppercase px-3 py-1.5 rounded-full mb-5 ${
              event.status === "upcoming"
                ? "bg-teal-500 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
          </span>

          <h1 className="font-serif italic text-4xl sm:text-5xl text-white leading-tight">
            {event.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-white/90 text-sm">
            <span className="flex items-center gap-1.5">
              📅{" "}
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              📍 {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {event.description}
          </p>

          {event.content && (
            <div className="prose prose-slate max-w-none prose-headings:text-blue-800 prose-a:text-teal-600">
              <PortableText value={event.content} />
            </div>
          )}

          {event.status === "upcoming" && event.registrationLink && (
            <div className="mt-10 rounded-2xl bg-blue-50 p-8 text-center">
              <h3 className="text-xl font-bold text-blue-800">
                Want to join this event?
              </h3>
              <p className="mt-2 text-slate-600">
                Register now to secure your spot.
              </p>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-md bg-blue-800 px-8 py-3 font-semibold text-white hover:bg-blue-900 transition-colors"
              >
                Register Now
              </a>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:underline"
            >
              ← Back to all events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}