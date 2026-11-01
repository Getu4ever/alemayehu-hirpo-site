import { cn } from "@/lib/utils";

export function EmptyState({
  message,
  title,
  className,
}: {
  message: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal-up border border-border/70 bg-surface/30 px-8 py-16 text-center",
        className,
      )}
    >
      <div className="flag-stripe mx-auto mb-6 max-w-[5.5rem]" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      {title ? (
        <h3 className="font-display text-2xl text-ivory mb-3">{title}</h3>
      ) : (
        <div className="gold-rule mx-auto mb-6" />
      )}
      <p className="text-muted max-w-md mx-auto leading-relaxed">{message}</p>
    </div>
  );
}
