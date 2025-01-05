import { groq } from "next-sanity";

// Reusable post fields
const postField = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  description,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  featured,
  isPublished
`;

export const profileQuery = groq`*[_type == "profile"]{
  _id,
  fullName,
  availability,
  headline,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  usage
}`;

export const jobQuery = groq`*[_type == "job"] | order(order desc){
  _id,
  name,
  order,
  achievements,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  name,
  order,
  active,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  repository,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  tagline,
  description
}`;

export const jokesQuery = groq`*[_type == "joke"] | order(_createdAt desc){
  _id,
  joke
}`;

export const postsQuery = groq`*[_type == "Post"] | order(_createdAt desc){
  ${postField},
  date,
  "author": author-> {
    name,
    photo,
    twitterUrl
  },
  body,
}`;

export const featuredPostsQuery = groq`*[_type == "Post" && featured == true] | order(_createdAt desc) {
  ${postField}
}`;

export const singlePostQuery = groq`*[_type == "Post" && slug.current == $slug][0]{
  ${postField},
  _updatedAt,
  canonicalLink,
  date,
  tags,
  "author": author-> {
    name,
    photo {
      "image": asset->url,
      alt
    },
    twitterUrl
  },
  body,
}`;

export const heroesQuery = groq`*[_type == "heroe"] | order(_createdAt asc) { _id, _createdAt, name, url, met }`;

export const testimonialQuery = groq`*[_type == "testimonial"] | order(_createdAt asc) {
  _id,
  _createdAt,
  name,
  role,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  }, 
  handle,  
  url, 
  quotet 
}`;
