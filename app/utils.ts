import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYoutubeId(url: string) {
  const regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  const match = regex.exec(url);

  if (!match) {
    return null;
  }
  return match[3];
}


export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}



/*
  This function generates an array of years from the iniital year a user joins GitHub to the current year.
  if joinYear = 2020, result = [2020, 2021, 2022, 2023, 2024] 
*/

export function getGitHubYears(joinYear: number | undefined): number[] {
  if (!joinYear) return [];

  const currentYear = new Date().getFullYear();
  const duration = currentYear - joinYear + 1;
  const years = Array.from({ length: duration }, (_year, i) => currentYear - i);
  return years;
}
