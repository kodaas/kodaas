import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="flex items-center justify-center w-full min-h-[100vh] h-[100dvh]">
      <Image
        width={50}
        height={50}
        src={duckImage}
        alt="Yellow duck searching"
        unoptimized
      />
    </section>
  );
}
