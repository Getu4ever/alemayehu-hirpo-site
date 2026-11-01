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
      setError("Enter the admin secret.");
      return;
    }

    // Probe gallery admin API — same secret unlocks site admin tools.
    const res = await fetch(
      `/api/gallery/admin?status=pending&secret=${encodeURIComponent(next)}`,
      { headers: { "x-gallery-admin-secret": next } },
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
      <main className="min-h-screen bg-background text-ivory px-4 py-16">
        <form
          onSubmit={onUnlock}
          className="mx-auto max-w-md border border-border bg-surface/60 p-8 space-y-5"
        >
          <h1 className="font-display text-2xl text-brass">{title}</h1>
          <p className="text-sm text-muted">{description}</p>
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full min-h-11 px-4 py-3 bg-background border border-border text-ivory"
            placeholder="Admin secret"
            required
          />
          {error ? <p className="text-sm text-ethio-red">{error}</p> : null}
          <button
            type="submit"
            className="min-h-11 px-5 bg-brass text-charcoal uppercase text-sm tracking-wide"
          >
            Unlock
          </button>
        </form>
      </main>
    );
  }

  return <>{children(secret, lock)}</>;
}
