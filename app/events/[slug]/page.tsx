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

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-5 text-[17px] leading-8 text-slate-700">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-blue-900 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-blue-800">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-6 text-lg font-semibold text-blue-800">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 rounded-r-xl border-l-4 border-teal-500 bg-teal-50 px-5 py-4 italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-[17px] leading-8 text-slate-700 marker:text-teal-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-[17px] leading-8 text-slate-700 marker:font-semibold marker:text-teal-600">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-700 underline underline-offset-4 hover:text-teal-600"
      >
        {children}
      </a>
    ),
  },
};

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
<section className="relative flex min-h-[460px] items-end overflow-hidden bg-blue-900 pt-36">
  {event.heroImage && (
    <img
      src={urlFor(event.heroImage).width(1920).url()}
      alt={event.heroImage?.alt || event.title}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )}
  {/* halka overlay: image nazar aaye, text bhi parha jaye */}
  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-blue-900/20" />

  <div className="relative mx-auto w-full max-w-4xl px-6 pb-12">
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-300 hover:text-teal-200"
      >
        ← Back to Events
      </Link>

      <span
        className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
          event.status === "upcoming"
            ? "bg-teal-500 text-white"
            : "bg-white text-slate-700"
        }`}
      >
        {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
      </span>
    </div>

    <h1 className="font-serif text-4xl italic leading-tight text-white drop-shadow-lg sm:text-5xl">
      {event.title}
    </h1>

    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/90">
      <span className="flex items-center gap-1.5">
        📅{" "}
        {new Date(event.eventDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
      <span className="flex items-center gap-1.5">📍 {event.location}</span>
    </div>
  </div>
</section>
      
      {/* Content */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Short description: intro ki tarah */}
          <p className="mb-10 rounded-r-xl border-l-4 border-teal-500 bg-slate-50 px-6 py-5 text-lg leading-8 text-slate-700">
            {event.description}
          </p>

          {event.content && (
            <div>
              <PortableText value={event.content} components={ptComponents} />
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
                className="mt-5 inline-block rounded-md bg-blue-800 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
              >
                Register Now
              </a>
            </div>
          )}

          <div className="mt-12 border-t border-slate-200 pt-8">
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