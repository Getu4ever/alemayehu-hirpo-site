import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass text-charcoal hover:bg-[#c4a609] border border-transparent shadow-[0_0_0_1px_rgba(7,137,48,0.25)]",
  secondary:
    "bg-transparent text-ivory border border-ethio-green hover:border-ethio-yellow hover:bg-ethio-green/20",
  ghost:
    "bg-transparent text-ivory/90 hover:text-ethio-yellow border border-transparent",
  light:
    "bg-ethio-green text-ivory hover:bg-forest-deep border border-transparent",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", className } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-300 min-h-11",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
