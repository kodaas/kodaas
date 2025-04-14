import Image from "next/image";
import { GalleryItemType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  items: GalleryItemType[];
};

export const GalleryImageGrid = ({ items }: Props) => {
  return items.map((item) => {
    return (
      <section key={item._id} className="mb-28">
        <div className="space-y-1 mb-5">
          <h1 className="max-w-xl font-incognito tracking-tight sm:text-5xl text-3xl lg:leading-[3.7rem]">
            <div className="text-base text-gray-500">
              ({new Date(item.date).toLocaleDateString()})
            </div>
            {item.title}
          </h1>
          <p className="max-w-xl text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-4">
          {item.contents.map((content) => (
            <div
              key={content.url}
              className="group relative h-[35rem] overflow-hidden rounded-lg shadow-lg"
              style={{
                aspectRatio: content.meta.dimensions.aspectRatio,
              }}
            >
              <Image
                src={content.url}
                alt={item.title || ""}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={100}
                placeholder={content?.lqip ? `blur` : "empty"}
                blurDataURL={content?.lqip || ""}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <section className="text-sm">
                  <PortableText
                    value={content.caption}
                    components={CustomPortableText}
                  />
                </section>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  });
};
