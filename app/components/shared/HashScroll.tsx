// "use client";
import Link from "next/link";

type props = {
  text: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event?: any;
};

// export const scrollTop = (header: HTMLHeadingElement) => {
//   header.scrollIntoView({ behavior: "smooth" });
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const slugify = (id: any) => {
  if (id) {
    id.toString()
      .toLowerCase()
      .replaceAll(/[^-\w]+/g, "-")
      .replaceAll(/--+/g, "-")
      .replace(/^-|-$/g, "");
  }
  return "";
};

export default function HashScroll({ text, event }: props) {
  return (
    <Link
      onClick={event}
      href={`#${text
        ?.toString()
        .toLowerCase()
        .replaceAll(/[^-\w]+/g, "-")
        .replaceAll(/--+/g, "-")
        .replace(/^-|-$/g, "")}`}
    >
      {text}
    </Link>
  );
}
