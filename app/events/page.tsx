import { client } from "@/sanity/lib/client";
import { eventsQuery, eventsPageQuery } from "@/sanity/lib/queries";
import { HeroSlider } from "@/components/HeroSlider";
import EventsClient from "@/components/EventsClient";

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

export default async function EventsPage() {
  const events: Event[] = await client.fetch(eventsQuery);
  const eventsPage = await client.fetch(eventsPageQuery);

  return (
    <main>
      {/* Hero */}
      <div className="relative">
        <HeroSlider
          slides={eventsPage?.heroSlides || []}
          title=" "
          subtitle=" "
          showButtons={false}
        />

        {/* Centered text overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-teal-300">
            Our Events
          </span>

          <h1
            className="text-4xl italic text-white md:text-6xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Moments That Matter
          </h1>

          <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
            From leadership summits to community dialogues — every event brings
            us closer to a future shaped by young changemakers.
          </p>
        </div>
      </div>

      {/* Tabs + Cards (client component for interactivity) */}
      <EventsClient events={events} />
    </main>
  );
}