"use client";

import Link from "next/link";
import { AdminGate } from "@/components/admin/AdminGate";
import { FanGalleryPanel } from "@/components/admin/FanGalleryPanel";

const tools = [
  {
    href: "#fan-gallery",
    title: "Fan photo submissions",
    body: "Review, approve, reject, or permanently delete fan gallery uploads.",
  },
  {
    href: "/news",
    title: "News & announcements",
    body: "Read the public news page. New articles are published from the site codebase for now.",
  },
  {
    href: "/gallery",
    title: "Public gallery",
    body: "Preview how approved fan photos appear on the live gallery page.",
  },
  {
    href: "/shop",
    title: "Shop catalogue",
    body: "Check Printify-powered merch as visitors see it.",
  },
] as const;

export default function AdminPage() {
  return (
    <AdminGate
      title="Command room"
      description="Private control for Alemayehu’s site — unlock with your admin password to moderate fan photos and jump to key pages."
    >
      {(secret, lock) => (
        <main className="min-h-screen bg-background text-ivory px-4 py-12 sm:px-8">
          <div className="mx-auto max-w-5xl space-y-12">
            <header className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
                  Alemayehu Hirpo
                </p>
                <h1 className="font-display text-3xl text-ivory sm:text-4xl">
                  Admin control
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Manage community submissions and jump to key public pages. Keep
                  this URL private — it is protected by your admin secret only.
                </p>
              </div>
              <button
                type="button"
                onClick={lock}
                className="min-h-10 border border-border px-4 text-xs uppercase tracking-[0.16em] text-muted hover:text-ivory"
              >
                Lock admin
              </button>
            </header>

            <section>
              <h2 className="font-display text-xl text-brass mb-4">Activities</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="border border-border bg-surface/40 p-5 transition-colors hover:border-brass/40"
                  >
                    <p className="font-display text-lg text-ivory">{tool.title}</p>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {tool.body}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <div id="fan-gallery">
              <FanGalleryPanel secret={secret} />
            </div>
          </div>
        </main>
      )}
    </AdminGate>
  );
}
