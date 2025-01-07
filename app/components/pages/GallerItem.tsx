"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function GalleryItem({
  data,
  col,
}: {
  data: { url: string; width: number; height: number };
  index: number;
  col: number;
}) {
  const { scrollYProgress } = useScroll();

  const scrollTranformMap = [
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    useTransform(scrollYProgress, [0, 1], [0, -100]),
  ];
  const galleryWidth = 360;
  const widthHeightRatio = data.height / data.width;
  const galleryHeight = Math.ceil(widthHeightRatio * galleryWidth);
  const photoSpans = Math.ceil(galleryHeight / 10) + 2;

  return (
    <motion.section
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
        delay: 0.1 * col + 0.3,
        stiffness: 0.5,
      }}
      viewport={{ once: true }}
      className="justify-self-center cursor-pointer overflow-hidden group"
      style={{
        gridRow: `span ${photoSpans}`,
        width: `${galleryWidth}px`,
        y: scrollTranformMap[col],
      }}
    >
      <div>
        <ImageComponent
          width={galleryWidth}
          height={galleryHeight}
          url={data.url + `?text=${col}`}
        />
      </div>
    </motion.section>
  );
}

async function ImageComponent({
  width,
  height,
  url,
}: {
  url: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={url}
      width={width}
      height={height}
      className="rounded-3xl"
      alt="gallery image"
    />
  );
}
