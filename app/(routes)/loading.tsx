import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Image width={50} height={50} src={duckImage} alt="Yellow duck searching" />
  );
}
