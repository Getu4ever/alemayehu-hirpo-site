import { cn } from "@/lib/utils";

export function EmptyState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-border px-8 py-16 text-center",
        className,
      )}
    >
      <div className="gold-rule mx-auto mb-6" />
      <p className="text-muted max-w-md mx-auto leading-relaxed">{message}</p>
    </div>
  );
}
