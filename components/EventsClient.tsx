"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image?: any;
  eventDate: string;
  location: string;
  status: "upcoming" | "past";
}

export default function EventsClient({ events }: { events: Event[] }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = events.filter((e) => e.status === tab);

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Toggle Tabs */}
        <div className="flex justify-center gap-3 mb-14">
          <button
            onClick={() => setTab("upcoming")}
            className={`px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm ${
              tab === "upcoming"
                ? "bg-blue-800 text-white shadow-md scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setTab("past")}
            className={`px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm ${
              tab === "past"
                ? "bg-blue-800 text-white shadow-md scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-slate-600 font-semibold text-lg">
              No {tab} events right now.
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {filtered.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group w-full sm:w-[340px] rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  {event.image ? (
                    <img
                      src={urlFor(event.image).width(500).url()}
                      alt={event.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-blue-100 to-teal-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-md ${
                      event.status === "upcoming"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    {event.status === "upcoming" ? "● Upcoming" : "Past Event"}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-teal-600 mb-2">
                    <span className="flex items-center gap-1">
                      📅{" "}
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1 truncate">
                      📍 {event.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-blue-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-800">
                    {event.status === "upcoming" ? "Learn More" : "View Details"}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}