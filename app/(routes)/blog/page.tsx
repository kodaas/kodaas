import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Fiyinfoluwa John Ajala",
  metadataBase: new URL("https://kodaas-mu.vercel.app/blog"),
  description: "Read latest stories from Fiyinfoluwa John Ajala's Blog",
  openGraph: {
    title: "Blog | Fiyinfoluwa John Ajala",
    url: "https://kodaas-mu.vercel.app/blog",
    description: "Read latest stories from Fiyinfoluwa John Ajala's Blog",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/blog.png",
  },
};

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Page</h1>
    </div>
  );
}
