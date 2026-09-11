import { groq } from 'next-sanity'

export const aboutPageQuery = groq`{
  "about": *[_type == "about"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    heroSlides[]{ image, alt },
    storyTitle,
    storyContent,
    storyImage,
    mission,
    missionImage,
    vision,
    visionImage,
    ctaTitle,
    ctaButtonText,
    ctaButtonLink,
    seoTitle,
    seoDescription
  },
  "values": *[_type == "value"] | order(order asc){
    _id,
    title,
    description,
    icon
  },
  "leadership": *[_type == "leadership"] | order(order asc){
    _id,
    name,
    role,
    bio,
    image,
    linkedin
  },
    "team": *[_type == "team"] | order(order asc){
    _id,
    name,
    role,
    department,
    image,
    linkedin
  }
}`

export const testimonialsQuery = groq`*[_type == "testimonial"]
  | order(_createdAt asc){
    _id,
    name,
    role,
    quote,
    image
  }`



export const heroBannerQuery = groq`*[_type == "heroBanner"]
  | order(order asc){
    _id,
    title,
    description,
    image,
    primaryButton,
    secondaryButton
  }`