"use client";

import { cn } from "@/lib/utils";

export function EqualizerBars({
  active = true,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("eq-bars inline-flex items-end gap-[2px] h-3 w-3", className)}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "eq-bars__bar w-[2px] rounded-full bg-brass",
            active && "eq-bars__bar--live",
          )}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}
