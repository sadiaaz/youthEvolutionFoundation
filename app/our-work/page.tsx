import Link from "next/link";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

type Program = {
  _id: string;
  title: string;
  description?: string;
  image?: SanityImageSource;
  category?: string;
  status?: string;
};

type Project = {
  _id: string;
  title: string;
  description?: string;
  image?: SanityImageSource;
  relatedProgram?: {
    title?: string;
  };
  status?: string;
};

type ImpactStory = {
  _id: string;
  title: string;
  story?: string;
  image?: SanityImageSource;
  date?: string;
};

type Partner = {
  _id: string;
  name: string;
  logo?: SanityImageSource;
  website?: string;
};

const programsQuery = `*[_type == "program"] | order(_createdAt desc) {
  _id,
  title,
  description,
  image,
  category,
  status
}`;

const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  image,
  relatedProgram->{title},
  status
}`;

const storiesQuery = `*[_type == "impactStory"] | order(date desc, _createdAt desc) {
  _id,
  title,
  story,
  image,
  date
}`;

const partnersQuery = `*[_type == "partner"] | order(_createdAt desc) {
  _id,
  name,
  logo,
  website
}`;

export const revalidate = 60;

const paragraphClass = "text-base leading-7";
const mutedTextClass = "text-brand-gray";
const sectionClass = "py-16 md:py-24";

const primaryLinkClass =
  "inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

const outlineLinkClass =
  "inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand-darkest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2";

const fallbackFieldImage = "/images/yef-field-activity.png";

function getImageUrl(
  image: SanityImageSource,
  width: number,
  height: number
) {
  return urlFor(image)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}

function getProjectStatusClass(status?: string) {
  switch (status) {
    case "Active":
      return "bg-green-700 text-white";
    case "Upcoming":
      return "bg-amber-100 text-amber-900";
    case "Completed":
      return "bg-slate-200 text-slate-800";
    default:
      return "bg-slate-200 text-slate-800";
  }
}

export default async function OurWorkPage() {
  const [programs, projects, stories, partners] = await Promise.all([
    client.fetch<Program[]>(programsQuery),
    client.fetch<Project[]>(projectsQuery),
    client.fetch<ImpactStory[]>(storiesQuery),
    client.fetch<Partner[]>(partnersQuery),
  ]);

  const publishedStories = stories.filter(
    (story) => story.story?.trim()
  );

  const heroSanityImage =
    projects.find((project) => project.image)?.image ??
    programs.find((program) => program.image)?.image ??
    publishedStories.find((story) => story.image)?.image;

  const heroImageUrl = heroSanityImage
    ? getImageUrl(heroSanityImage, 1600, 900)
    : fallbackFieldImage;

  const sanityFieldImages = [
    ...projects
      .filter((project) => project.image)
      .map((project) => ({
        id: `project-${project._id}`,
        src: getImageUrl(project.image as SanityImageSource, 800, 600),
        alt: `${project.title} project activity`,
      })),
    ...publishedStories
      .filter((story) => story.image)
      .map((story) => ({
        id: `story-${story._id}`,
        src: getImageUrl(story.image as SanityImageSource, 800, 600),
        alt: `${story.title} impact story`,
      })),
    ...programs
      .filter((program) => program.image)
      .map((program) => ({
        id: `program-${program._id}`,
        src: getImageUrl(program.image as SanityImageSource, 800, 600),
        alt: `${program.title} program activity`,
      })),
  ].slice(0, 6);

  const fieldImages =
    sanityFieldImages.length > 0
      ? sanityFieldImages
      : [
          {
            id: "official-yef-field-activity",
            src: fallbackFieldImage,
            alt: "Youth Evolution Foundation community activity",
          },
        ];

  const statistics = [
    {
      value: programs.length,
      label: "Programs",
    },
    {
      value: projects.length,
      label: "Projects",
    },
    {
      value: publishedStories.length,
      label: "Impact Stories",
    },
    {
      value: partners.length,
      label: "Partners",
    },
  ];

  return (
    <main>
      <section
        className="relative overflow-hidden bg-brand-darkest text-white"
        aria-labelledby="our-work-hero-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15,32,54,0.80), rgba(15,32,54,0.90)), url("${heroImageUrl}")`,
          }}
          aria-hidden="true"
        />

        <Container>
          <div className="relative py-24 text-center md:py-32">
            <Heading
              id="our-work-hero-title"
              level={1}
              size={1}
              align="center"
              className="text-white"
            >
              Creating Real Impact, One Community at a Time
            </Heading>

            <p
              className={`${paragraphClass} mx-auto mt-6 max-w-2xl text-white`}
            >
              Explore the programs, projects, and stories that reflect YEF&apos;s
              work in youth empowerment, education, and community development.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="programs"
        className={`bg-white ${sectionClass}`}
        aria-labelledby="programs-title"
      >
        <Container>
          <Heading
            id="programs-title"
            level={2}
            size={2}
            align="center"
            className="text-brand-dark"
          >
            Our Programs
          </Heading>

          <div className="mt-12">
            {programs.length === 0 ? (
              <p
                className={`${paragraphClass} text-center ${mutedTextClass}`}
              >
                No programs have been published yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <Card
                    key={program._id}
                    hoverable
                    noPadding
                    className="overflow-hidden rounded-xl"
                  >
                    {program.image && (
                      <Card.Image
                        src={getImageUrl(program.image, 600, 340)}
                        alt={program.title}
                      />
                    )}

                    <div className="p-5 sm:p-6">
                      {program.category && (
                        <span className="text-sm font-medium text-brand-primary">
                          {program.category}
                        </span>
                      )}

                      <Card.Title className="mt-1">
                        {program.title}
                      </Card.Title>

                      {program.description && (
                        <Card.Description
                          className={`${paragraphClass} ${mutedTextClass}`}
                        >
                          {program.description}
                        </Card.Description>
                      )}

                      {program.status && (
                        <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                          {program.status}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section
        className={`bg-slate-50 ${sectionClass}`}
        aria-labelledby="projects-title"
      >
        <Container>
          <Heading
            id="projects-title"
            level={2}
            size={2}
            align="center"
            className="text-brand-dark"
          >
            Projects
          </Heading>

          <div className="mt-12">
            {projects.length === 0 ? (
              <p
                className={`${paragraphClass} text-center ${mutedTextClass}`}
              >
                No projects have been published yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card
                    key={project._id}
                    hoverable
                    noPadding
                    className="relative overflow-hidden rounded-xl"
                  >
                    {project.image && (
                      <div className="relative">
                        <Card.Image
                          src={getImageUrl(project.image, 600, 340)}
                          alt={project.title}
                        />

                        {project.status && (
                          <span
                            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-semibold ${getProjectStatusClass(
                              project.status
                            )}`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-5 sm:p-6">
                      <Card.Title>{project.title}</Card.Title>

                      {project.relatedProgram?.title && (
                        <span className="mt-2 block text-sm font-medium text-brand-primary">
                          {project.relatedProgram.title}
                        </span>
                      )}

                      {project.description && (
                        <Card.Description
                          className={`${paragraphClass} ${mutedTextClass}`}
                        >
                          {project.description}
                        </Card.Description>
                      )}

                      {!project.image && project.status && (
                        <span
                          className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getProjectStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section
        className="bg-brand-primary py-16 md:py-20"
        aria-labelledby="impact-statistics-title"
      >
        <Container>
          <Heading
            id="impact-statistics-title"
            level={2}
            size={2}
            align="center"
            className="sr-only"
          >
            Impact Statistics
          </Heading>

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {statistics.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white md:text-5xl">
                  {stat.value}
                </p>

                <p className={`${paragraphClass} mt-2 text-white`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        className={`bg-white ${sectionClass}`}
        aria-labelledby="success-stories-title"
      >
        <Container>
          <Heading
            id="success-stories-title"
            level={2}
            size={2}
            align="center"
            className="text-brand-dark"
          >
            Success Stories
          </Heading>

          <div className="mt-12">
            {publishedStories.length === 0 ? (
              <p
                className={`${paragraphClass} text-center ${mutedTextClass}`}
              >
                No success stories have been published yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {publishedStories.map((story) => (
                  <Card
                    key={story._id}
                    className="flex h-full flex-col justify-between rounded-xl"
                  >
                    <p
                      className={`${paragraphClass} ${mutedTextClass}`}
                    >
                      &ldquo;{story.story}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      {story.image && (
                        <img
                          src={getImageUrl(story.image, 100, 100)}
                          alt={story.title}
                          loading="lazy"
                          decoding="async"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}

                      <div>
                        <p className="text-base font-semibold leading-7 text-brand-dark">
                          {story.title}
                        </p>

                        {story.date && (
                          <time
                            dateTime={story.date}
                            className="block text-sm leading-6 text-brand-gray"
                          >
                            {new Date(story.date).toLocaleDateString()}
                          </time>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section
        className={`bg-slate-50 ${sectionClass}`}
        aria-labelledby="field-images-title"
      >
        <Container>
          <Heading
            id="field-images-title"
            level={2}
            size={2}
            align="center"
            className="text-brand-dark"
          >
            Real Field Images
          </Heading>

          <p
            className={`${paragraphClass} mx-auto mt-4 max-w-2xl text-center ${mutedTextClass}`}
          >
            Real YEF community and program activity.
          </p>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {fieldImages.map((item) => (
                <div
                  key={item.id}
                  className="group aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        className={`bg-white ${sectionClass}`}
        aria-labelledby="partners-title"
      >
        <Container>
          <Heading
            id="partners-title"
            level={2}
            size={2}
            align="center"
            className="text-brand-dark"
          >
            Our Partners
          </Heading>

          <div className="mt-12">
            {partners.filter((partner) => partner.logo).length === 0 ? (
              <p
                className={`${paragraphClass} text-center ${mutedTextClass}`}
              >
                No partners have been published yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4">
                {partners
                  .filter((partner) => partner.logo)
                  .map((partner) => {
                    const logoContent = (
                     <div
  className="flex h-90 w-90 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md"
  title={partner.name}
>
                        <img
                          src={getImageUrl(
                            partner.logo as SanityImageSource,
                            240,
                            120
                          )}
                          alt={partner.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    );

                    return partner.website ? (
                      <a
                        key={partner._id}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${partner.name} website`}
                      >
                        {logoContent}
                      </a>
                    ) : (
                      <div key={partner._id}>{logoContent}</div>
                    );
                  })}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section
        id="support"
        className="bg-brand-darkest py-16 md:py-24"
        aria-labelledby="cta-title"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading
              id="cta-title"
              level={2}
              size={2}
              align="center"
              className="text-white"
            >
              Be Part of the Change
            </Heading>

            <p className={`${paragraphClass} mx-auto mt-5 text-white`}>
              Your support helps YEF reach more communities and continue its
              work in youth empowerment, education, and community development.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/donate" className={primaryLinkClass}>
                Donate Now
              </Link>

              <Link href="/get-involved" className={outlineLinkClass}>
                Volunteer With Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
