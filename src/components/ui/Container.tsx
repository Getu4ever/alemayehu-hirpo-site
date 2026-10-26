import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
