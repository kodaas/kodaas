import Link from "next/link";
import { Slide } from "../shared/Slide";
import ContributionGraph from "./ContributionGraph";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function GithubCalendarComponent() {
  return (
    <section>
      <Slide
        delay={0.2}
        className="flex items-end justify-between mb-10 max-w-[60rem]"
      >
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          Contrbution Graph
        </h2>

        <Link
          href="/projects"
          className="flex hover:text-primary-color hover:underline transition-all duration-300 text-lg items-center gap-1 font-incognito"
        >
          Veiw Projects <MdKeyboardArrowRight />{" "}
        </Link>
      </Slide>

      <Slide delay={0.18}>
        <ContributionGraph />
      </Slide>
    </section>
  );
}
