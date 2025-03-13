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
      "https://res.cloudinary.com/dceeaha7i/image/upload/f_webp,fl_awebp,q_auto/v1735727807/blog-og",
  },
};

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Page WIP 🏗️🚧</h1>
    </div>
  );
}
