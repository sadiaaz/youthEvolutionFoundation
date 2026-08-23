import { groq } from 'next-sanity'

export const aboutPageQuery = groq`{
  "about": *[_type == "about"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    storyTitle,
    storyContent,
    mission,
    vision,
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
    image,
    linkedin
  }
}`