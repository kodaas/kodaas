import { Slide } from "../shared/Slide";
import ContributionGraph from "./ContributionGraph";

export default function GithubCalendarComponent() {
  return (
    <section>
      <Slide delay={0.16} className="mb-8">
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          Contrbution Graph
        </h2>
      </Slide>

      <Slide delay={0.18}>
        <ContributionGraph />
      </Slide>
    </section>
  );
}
