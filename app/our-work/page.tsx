import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

// Temporary dummy data — Sanity connect hote hi ye yahan se hatakar CMS se fetch hoga
const dummyPrograms = [
  {
    id: 1,
    title: "Leadership & Mentorship",
    description:
      "Equipping young people with the confidence and skills to lead their communities.",
    image: "https://via.placeholder.com/600x340",
  },
  {
    id: 2,
    title: "Community Development",
    description:
      "Building stronger neighborhoods through youth-led local initiatives.",
    image: "https://via.placeholder.com/600x340",
  },
  {
    id: 3,
    title: "Career & Entrepreneurship",
    description:
      "Helping youth turn ideas into real, sustainable opportunities.",
    image: "https://via.placeholder.com/600x340",
  },
];

const dummyProjects = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description:
      "Providing clean drinking water access to underserved communities.",
    image: "https://via.placeholder.com/600x340",
    status: "Active",
  },
  {
    id: 2,
    title: "Youth Skills Bootcamp",
    description:
      "A 6-week intensive program teaching digital and vocational skills.",
    image: "https://via.placeholder.com/600x340",
    status: "Completed",
  },
  {
    id: 3,
    title: "Community Garden Project",
    description: "Turning unused urban land into shared green spaces.",
    image: "https://via.placeholder.com/600x340",
    status: "Active",
  },
];

const dummyStats = [
  { id: 1, number: "10K+", label: "Lives Impacted" },
  { id: 2, number: "35+", label: "Active Volunteers" },
  { id: 3, number: "120+", label: "Programs Completed" },
  { id: 4, number: "25+", label: "Community Partners" },
];

const dummyStories = [
  {
    id: 1,
    quote:
      "This program gave me the confidence to start my own small business. I never thought I could lead a team, but now I do.",
    name: "Ayesha Malik",
    role: "Program Graduate",
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: 2,
    quote:
      "The mentorship I received changed the direction of my life. I'm now mentoring other young people in my community.",
    name: "Bilal Ahmed",
    role: "Youth Leader",
    image: "https://via.placeholder.com/100x100",
  },
];

const dummyFieldImages = [
  { id: 1, src: "https://via.placeholder.com/500x350", alt: "Volunteers at community event" },
  { id: 2, src: "https://via.placeholder.com/500x350", alt: "Youth workshop in progress" },
  { id: 3, src: "https://via.placeholder.com/500x350", alt: "Clean water project site" },
  { id: 4, src: "https://via.placeholder.com/500x350", alt: "Community garden volunteers" },
  { id: 5, src: "https://via.placeholder.com/500x350", alt: "Leadership training session" },
  { id: 6, src: "https://via.placeholder.com/500x350", alt: "Local partnership meeting" },
];

const dummyPartners = [
  { id: 1, name: "Bright Future Trust", logo: "https://via.placeholder.com/160x80?text=Partner+1" },
  { id: 2, name: "Global Youth Alliance", logo: "https://via.placeholder.com/160x80?text=Partner+2" },
  { id: 3, name: "CommunityFirst Org", logo: "https://via.placeholder.com/160x80?text=Partner+3" },
  { id: 4, name: "NextGen Foundation", logo: "https://via.placeholder.com/160x80?text=Partner+4" },
];

export default function OurWorkPage() {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPrograms.map((program) => (
              <Card key={program.id} hoverable noPadding>
                <Card.Image src={program.image} alt={program.title} />
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
        </Container>
      </section>

      {/* Projects Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Projects
          </Heading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyProjects.map((project) => (
              <Card
                key={project.id}
                hoverable
                noPadding
                className="relative"
              >
                <div className="relative">
                  <Card.Image src={project.image} alt={project.title} />
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                      project.status === "Active"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Description>{project.description}</Card.Description>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Statistics Section */}
      <section className="bg-brand-primary py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {dummyStats.map((stat) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyStories.map((story) => (
              <Card key={story.id} className="flex flex-col justify-between">
                <p className="text-brand-gray italic text-base mb-6">
                  “{story.quote}”
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-brand-dark">
                      {story.name}
                    </p>
                    <p className="text-sm text-brand-gray">{story.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Real Field Images Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Real Field Images
          </Heading>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dummyFieldImages.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-xl aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand-dark text-3xl md:text-4xl font-bold text-center mb-12">
            Our Partners
          </Heading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {dummyPartners.map((partner) => (
              <img
                key={partner.id}
                src={partner.logo}
                alt={partner.name}
                className="grayscale hover:grayscale-0 transition-all duration-300 max-h-16 object-contain"
              />
            ))}
          </div>
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