import { TableRow } from "@sanity/table";
import { PortableTextBlock } from "sanity";

export interface Table {
  rows?: TableRow[];
  title?: string;
}

export type AiRoles = "user" | "assistant" | "error";

export interface TableValueProps {
  table?: Table;
  caption?: string;
}

export interface QuizValueProps {
  _key: string;
  question: string;
  answer: string;
}

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  availability: boolean;
  profileImage: {
    image: string;
    lqip: string;
    alt: string;
  };
  shortBio: string;
  email: string;
  fullBio: PortableTextBlock[];
  location: string;
  resumeURL: string;
  og: string;
  usage: PortableTextBlock[];
};

export type JobType = {
  _id: string;
  name: string;
  order: number;
  jobTitle: string;
  logo: string;
  url: string;
  description: string;
  achievements: PortableTextBlock[];
  startDate: string;
  endDate: string;
};

export type JokeType = {
  _id: string;
  joke: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  active: boolean;
  order: number;
  slug: string;
  _updatedAt: string;
  tagline: string;
  projectUrl: string;
  repository: string;
  logo: string;
  coverImage: {
    image: string;
    alt: string | null;
    lqip: string;
  };
  description: PortableTextBlock[];
};

export type PostType = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  description: string;
  canonicalLink?: string;
  date?: string;
  coverImage: {
    image: string;
    lqip: string;
    alt: string | null;
  };
  tags: string[];
  author: {
    name: string;
    photo: {
      image: string;
      alt: string;
    };
    twitterUrl: string;
  };
  body: PortableTextBlock[];
  featured: boolean;
  isPublished: boolean;
};

export type HeroeType = {
  _id: string;
  _createdAt: string;
  name: string;
  url: string;
  met: boolean;
};

export type TestimonialType = {
  _id: string;
  name: string;
  role: string;
  handle: boolean;
  profileImage: {
    image: string;
    lqip: string;
    alt: string;
  };
  url: string;
  quotet: string;
};
