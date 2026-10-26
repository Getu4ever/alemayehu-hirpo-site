import { cn } from "@/lib/utils";

export function FlagStripe({
  className,
  vertical,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <div
      className={cn(
        vertical ? "flag-stripe-vertical" : "flag-stripe",
        className,
      )}
      aria-hidden
    >
      <span />
      <span />
      <span />
    </div>
  );
}
