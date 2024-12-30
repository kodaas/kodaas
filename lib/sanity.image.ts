import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env.api";

const imageBuilder = imageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "production",
});

// eslint-disable-next-line 
export function urlFor(source: any) {
  return imageBuilder.image(source).auto("format").fit("max");
}
