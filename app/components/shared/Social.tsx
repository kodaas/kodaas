import { SOCIALS_LINKS } from "@/app/constant";
import RefLink from "./RefLink";
import { cn } from "@/app/utils";

export default function Social({
  type,
  center,
}: {
  type: string;
  center?: boolean;
}) {
  return (
    <ul
      className={cn("flex items-center flex-wrap gap-x-5 gap-y-4 my-10", [
        center ? "justify-center" : "",
      ])}
    >
      {SOCIALS_LINKS.filter((item) => item.status === type).map((value) => (
        <li key={value.id}>
          <RefLink
            href={value.url}
            className="flex items-center border-b dark:border-b-zinc-800 border-zinc-200 group"
          >
            <value.icon
              className="flex-shrink-0 h-5 w-5 text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
              aria-hidden="true"
            />{" "}
            &nbsp;
            {value.name}
          </RefLink>
        </li>
      ))}
    </ul>
  );
}
