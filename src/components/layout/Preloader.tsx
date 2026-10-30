"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { artist } from "@/data/artist";

const STORAGE_KEY = "alemayehu-hirpo-preloader-seen";

function setPreloaderFlag(value: "pending" | "skip") {
  document.documentElement.dataset.preloader = value;
}

function shouldSkip(pathname: string) {
  if (typeof document !== "undefined" && document.documentElement.dataset.preloader === "skip") {
    return true;
  }
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function Monogram() {
  return (
    <svg viewBox="0 0 96 96" className="h-16 w-16 sm:h-20 sm:w-20" aria-hidden>
      <defs>
        <linearGradient id="ahRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c85a" />
          <stop offset="50%" stopColor="#d4b40a" />
          <stop offset="100%" stopColor="#9a8410" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="45" fill="#0a120c" stroke="url(#ahRing)" strokeWidth="2.5" />
      {/* Tibeb diamond */}
      <path
        d="M48 18 L78 48 L48 78 L18 48 Z"
        fill="none"
        stroke="#d4b40a"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M48 30 L66 48 L48 66 L30 48 Z"
        fill="none"
        stroke="#078930"
        strokeWidth="1"
        opacity="0.45"
      />
      <text
        x="48"
        y="54"
        textAnchor="middle"
        fill="#f7f3e8"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="1"
      >
        AH
      </text>
    </svg>
  );
}

export function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    if (shouldSkip(pathname)) {
      setPreloaderFlag("skip");
      setVisible(false);
      return;
    }

    setPreloaderFlag("pending");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 450 : 1800;
    const start = performance.now();
    let raf = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setExiting(true);
      exitTimer = window.setTimeout(
        () => {
          setPreloaderFlag("skip");
          setVisible(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        },
        reduced ? 0 : 650,
      );
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`site-preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#021208] ${exiting ? "site-preloader--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${artist.name.en}`}
      aria-hidden={exiting}
    >
      {/* Soft highland glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 20% 30%, rgba(7,137,48,0.28), transparent 55%),
            radial-gradient(ellipse 45% 35% at 80% 25%, rgba(212,180,10,0.2), transparent 50%),
            radial-gradient(ellipse 40% 40% at 60% 85%, rgba(180,40,48,0.16), transparent 55%)
          `,
        }}
        aria-hidden
      />
      {/* Tibeb lattice veil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M32 4 L60 32 L32 60 L4 32 Z' fill='none' stroke='%23fcdd09' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div className="site-preloader__mark relative mb-8">
        <span
          className="absolute inset-[-12px] rounded-full bg-gradient-to-br from-[#e6c85a] via-[#d4b40a] to-[#078930] opacity-80 blur-[1px]"
          aria-hidden
        />
        <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#0a120c] p-2.5 ring-1 ring-brass/40">
          <Monogram />
        </span>
      </div>

      <p className="relative font-display text-sm sm:text-base font-semibold tracking-[0.28em] text-brass uppercase">
        Alemayehu Hirpo
      </p>
      <p className="relative mt-2 amharic text-sm tracking-wide text-ivory/55">
        {artist.name.am}
      </p>
      <p className="relative mt-3 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/35">
        The Sound of Ethiopian Soul
      </p>

      <div className="relative mt-10 h-[2px] w-44 overflow-hidden bg-ivory/15 sm:w-56">
        <div
          className="h-full bg-gradient-to-r from-ethio-green via-brass to-[#c4a609] transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative mt-3 tabular-nums text-[0.65rem] tracking-[0.18em] text-ivory/40">
        {String(progress).padStart(2, "0")}%
      </p>
    </div>
  );
}
