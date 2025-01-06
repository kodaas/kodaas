import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fiyinfoluwa Portfolio",
    short_name: "kodaas",
    description:
      "Fiyinfoluwa John Ajala is a Software Developer and an experienced frontend developer with a knack for building ideas that makes life a bit easier 🤝, one line of code at a time 💻.",
    start_url: "/",
    display: "standalone",
    background_color: "rgba(39, 39, 43, 0.4)",
    theme_color: "#fbbf24",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
