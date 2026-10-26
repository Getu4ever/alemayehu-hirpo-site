import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(
  date: string,
  locale: "en" | "am" = "en",
): string {
  try {
    return new Intl.DateTimeFormat(locale === "am" ? "am-ET" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function externalRel(url?: string | null) {
  if (!url) return undefined;
  return "noopener noreferrer";
}
