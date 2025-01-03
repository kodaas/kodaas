import { cn } from "@/app/utils";
import { ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl text-sm font-medium backdrop-blur-sm transition-shadow duration-300 ease-out [--bg-size:300%]",
        className,
      )}
    >
      {children}
    </div>
  );
}
