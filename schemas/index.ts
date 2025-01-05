import job from "./job";
import profile from "./profile";
import project from "./project";
import post from "./post";
import author from "./author";
import heroe from "./heroe";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";
import joke from "./heroJokes";
import testimonials from "./testimonials";

export const schemaTypes = [
  profile,
  job,
  project,
  post,
  author,
  testimonials,
  heroe,
  joke,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
