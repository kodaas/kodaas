import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/projects"),
  description: "Explore projects built by Fiyinfoluwa John Ajala",
  openGraph: {
    title: "Projects | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/projects",
    description: "Explore projects built by Fiyinfoluwa John Ajala",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/projects.png",
  },
};

export default function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}
