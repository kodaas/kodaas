import { ProfileType } from "@/types";
import Image from "next/image";
import { AIInput } from "./AIInput";

type Props = {
  profile: ProfileType;
};

export function EmptyChat({ profile }: Props) {
  return (
    <div className="w-full lg:max-w-[40rem] space-y-5 md:space-y-8">
      <div className="text-center">
        <Image
          src={profile.profileImage.image}
          alt={profile.profileImage.alt}
          width={100}
          height={100}
          className="rounded-full mb-2 mx-auto shadow-line-light dark:shadow-line-dark"
        />
        <h3 className="text-xl font-semibold">
          {profile.fullName.split(" ")[0]}&apos;s AI Assistant ✨
        </h3>
        <p className="text-sm max-w-56 mx-auto">
          You can ask me anything you want to know
        </p>
      </div>

      <AIInput showRecommendation={false} />
    </div>
  );
}
