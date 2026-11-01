"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { ADMIN_SECRET_KEY } from "@/lib/admin-session";

export function AdminGate({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: (secret: string, lock: () => void) => ReactNode;
}) {
  const [secret, setSecret] = useState("");
  const [draft, setDraft] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_SECRET_KEY);
    if (stored) {
      setSecret(stored);
      setDraft(stored);
      setAuthed(true);
    }
    setReady(true);
  }, []);

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const next = draft.trim();
    if (!next) {
      setError("Enter the admin password.");
      return;
    }

    // Probe gallery admin API — same secret unlocks site admin tools.
    const res = await fetch(
      `/api/gallery/admin?status=pending&secret=${encodeURIComponent(next)}`,
      { headers: { "x-admin-secret": next } },
    );
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setAuthed(false);
      setError(data.error || "Unable to unlock admin.");
      return;
    }

    sessionStorage.setItem(ADMIN_SECRET_KEY, next);
    setSecret(next);
    setAuthed(true);
  }

  function lock() {
    sessionStorage.removeItem(ADMIN_SECRET_KEY);
    setSecret("");
    setDraft("");
    setAuthed(false);
  }

  if (!ready) {
    return (
      <main className="min-h-screen bg-background text-ivory px-4 py-16">
        <p className="mx-auto max-w-md text-sm text-muted">Loading admin…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background text-ivory px-4 py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 10%, rgba(212,180,10,0.18), transparent 55%), radial-gradient(ellipse 40% 35% at 90% 80%, rgba(7,137,48,0.12), transparent 50%)",
          }}
          aria-hidden
        />
        <form
          onSubmit={onUnlock}
          className="relative mx-auto max-w-md border border-brass/30 bg-surface/70 p-8 space-y-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-brass/80">
            Restricted
          </p>
          <h1 className="font-display text-3xl text-brass">{title}</h1>
          <p className="text-sm text-muted leading-relaxed">{description}</p>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-brass">
              Password
            </span>
            <input
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full min-h-11 px-4 py-3 bg-background border border-border text-ivory focus:border-brass focus:outline-none"
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm text-ethio-red">{error}</p> : null}
          <button
            type="submit"
            className="min-h-11 w-full px-5 bg-brass text-charcoal uppercase text-sm tracking-[0.18em] hover:brightness-110"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return <>{children(secret, lock)}</>;
}
