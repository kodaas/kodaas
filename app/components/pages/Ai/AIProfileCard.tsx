import Image from "next/image";
import { ProfileType } from "@/types";
import Link from "next/link";

type Props = {
  profile: ProfileType;
};

export function AIProfileCard({ profile }: Props) {
  return (
    <Link
      href="/about"
      className="shrink-0 gap-2 inline-flex mx-auto items-center justify-center px-3 py-2 bg-white shadow-line-light dark:shadow-line-dark rounded-3xl dark:bg-black md:mt-24"
    >
      <Image
        src="/logo.png"
        alt="User"
        width={30}
        height={30}
        className="rounded-full"
      />
      <h2>{profile.fullName.split(" ")[0]}&apos;s AI Assistant ✨</h2>
    </Link>
  );
}
