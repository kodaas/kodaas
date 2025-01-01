import { PortableTextComponents } from "@portabletext/react";
import RefLink from "./RefLink";
import Favicon from "@/lib/favicon";
import HashScroll from "./HashScroll";

export const CustomPortableTextFavicon: PortableTextComponents = {
  block: {
    h3: ({ children }) => (
      <h3
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="scroll-mt-8 font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl dark:text-zinc-100 text-zinc-700 my-6"
      >
        <HashScroll text={children} />
      </h3>
    ),
    normal: ({ children }) => <p className="mt-2 mb-6">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <RefLink
          href={value?.href}
          className="font-medium inline-flex items-center justify-start gap-x-4 dark:text-blue-400 text-blue-500 underline"
        >
          <Favicon domain={value?.href} alt={value?.href} />
          {children}
        </RefLink>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none mt-2 ml-2 dark:text-zinc-400 text-zinc-600">
        {children}
      </ul>
    ),
  },
  listItem: { bullet: ({ children }) => <li className="mb-4 ">{children}</li> },
};
