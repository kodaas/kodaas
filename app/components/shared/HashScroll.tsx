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
