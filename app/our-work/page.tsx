import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// ---- Types ----
type Program = {
  _id: string;
  title: string;
  description?: string;
  image?: any;
  category?: string;
  status?: string;
};

type Project = {
  _id: string;
  title: string;
  description?: string;
  image?: any;
  status?: string;
};

type ImpactStory = {
  _id: string;
  title: string;
  story?: string;
  image?: any;
  date?: string;
};

type Partner = {
  _id: string;
  name: string;
  logo?: any;
  website?: string;
};

// ---- GROQ Queries ----
const programsQuery = `*[_type == "program"]{
  _id, title, description, image, category, status
}`;

const projectsQuery = `*[_type == "project"]{
  _id, title, description, image, status
}`;

const storiesQuery = `*[_type == "impactStory"]{
  _id, title, story, image, date
}`;

const partnersQuery = `*[_type == "partner"]{
  _id, name, logo, website
}`;

// Revalidate this page's data periodically instead of caching forever
export const revalidate = 60;

export default async function OurWorkPage() {
  const [programs, projects, stories, partners] = await Promise.all([
    client.fetch<Program[]>(programsQuery),
    client.fetch<Project[]>(projectsQuery),
    client.fetch<ImpactStory[]>(storiesQuery),
    client.fetch<Partner[]>(partnersQuery),
  ]);

  return (
    <main>
      {/* Impact Hero Section */}
      <section className="relative bg-brand-darkest text-white">
        <Container>
          <div className="py-24 md:py-32 text-center">
            <Heading className="text-white text-4xl md:text-5xl font-bold mb-4">
              Creating Real Impact, One Community at a Time
            </Heading>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              Explore the programs, projects, and stories that reflect our
              commitment to empowering youth and building stronger futures.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Programs Section */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Our Programs
          </Heading>

          {programs.length === 0 ? (
            <p className="text-center text-brand-gray">
              No programs added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program._id} hoverable noPadding>
                  {program.image && (
                    <Card.Image
                      src={urlFor(program.image).width(600).height(340).url()}
                      alt={program.title}
                    />
                  )}
                  <div className="p-5 sm:p-6">
                    <Card.Title>{program.title}</Card.Title>
                    <Card.Description>{program.description}</Card.Description>
                    <Button className="mt-4 bg-brand-primary text-white">
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Projects Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Projects
          </Heading>

          {projects.length === 0 ? (
            <p className="text-center text-brand-gray">
              No projects added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project._id} hoverable noPadding className="relative">
                  <div className="relative">
                    {project.image && (
                      <Card.Image
                        src={urlFor(project.image).width(600).height(340).url()}
                        alt={project.title}
                      />
                    )}
                    {project.status && (
                      <span
                        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                          project.status === "Active"
                            ? "bg-green-600"
                            : "bg-gray-500"
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Description>{project.description}</Card.Description>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Impact Statistics Section (kept static — no Sanity schema for stats yet) */}
      <section className="bg-brand-primary py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { id: 1, number: "10K+", label: "Lives Impacted" },
              { id: 2, number: "35+", label: "Active Volunteers" },
              { id: 3, number: "120+", label: "Programs Completed" },
              { id: 4, number: "25+", label: "Community Partners" },
            ].map((stat) => (
              <div key={stat.id}>
                <p className="text-white text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Success Stories
          </Heading>

          {stories.length === 0 ? (
            <p className="text-center text-brand-gray">
              No success stories added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <Card key={story._id} className="flex flex-col justify-between">
                  <p className="text-brand-gray italic text-base mb-6">
                    &ldquo;{story.story}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    {story.image && (
                      <img
                        src={urlFor(story.image).width(100).height(100).url()}
                        alt={story.title}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-brand-dark">
                        {story.title}
                      </p>
                      {story.date && (
                        <p className="text-sm text-brand-gray">
                          {new Date(story.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Our Partners
          </Heading>

          {partners.length === 0 ? (
            <p className="text-center text-brand-gray">
              No partners added yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {partners.map((partner) =>
                partner.logo ? (
                  <a
                    key={partner._id}
                    href={partner.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={urlFor(partner.logo).width(160).height(80).url()}
                      alt={partner.name}
                      className="grayscale hover:grayscale-0 transition-all duration-300 max-h-16 object-contain"
                    />
                  </a>
                ) : null
              )}
            </div>
          )}
        </Container>
      </section>

      {/* CTA / Donate Section */}
      <section className="bg-brand-darkest py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Heading className="text-white text-3xl md:text-4xl font-bold mb-4">
              Be Part of the Change
            </Heading>
            <p className="text-gray-300 text-lg mb-8">
              Your support helps us reach more communities and create lasting
              impact. Join us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-primary text-white px-8 py-3">
                Donate Now
              </Button>
              <Button className="bg-transparent border border-white text-white px-8 py-3">
                Volunteer With Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}