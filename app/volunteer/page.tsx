import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { volunteerPageQuery } from "@/sanity/lib/queries";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata = {
  title: "Become a Volunteer | Youth Evolution Foundation",
  description:
    "Join Youth Evolution Foundation as a volunteer and help empower youth.",
};

interface VolunteerPageData {
  heroImage?: any;
  sideImage?: any;
  sideTitle?: string;
  sideSubtitle?: string;
}

export default async function VolunteerPage() {
  let pageData: VolunteerPageData | null = null;

  try {
    pageData = await client.fetch(volunteerPageQuery);
  } catch (e) {
    console.error("Sanity fetch error:", e);
  }

    let heroImageUrl: string | null = "/images/volunteer-hero.jpg";
    let sideImageUrl: string | null = "/images/volunteer-side.jpg";
  try {
    if (pageData?.heroImage?.asset)
      heroImageUrl = urlFor(pageData.heroImage).width(1920).url();
    if (pageData?.sideImage?.asset)
      sideImageUrl = urlFor(pageData.sideImage).width(900).url();
  } catch (e) {
    console.error("Image error:", e);
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-blue-900 pb-24 pt-20">
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={pageData?.heroImage?.alt || "Become a Volunteer"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-blue-950/60" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-teal-300">
            Get Involved
          </span>
          <h1 className="mt-4 font-serif text-4xl italic text-white sm:text-5xl">
            Become a Volunteer
          </h1>
        </div>
      </section>

      {/* Card (hero ke neeche overlap) */}
      <section className="relative z-10 -mt-20 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <VolunteerForm
            sideImageUrl={sideImageUrl}
            sideTitle={pageData?.sideTitle}
            sideSubtitle={pageData?.sideSubtitle}
          />
        </div>
      </section>
    </main>
  );
}