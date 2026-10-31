"use client";

import { FormEvent, useCallback, useState } from "react";
import type { FanSubmission } from "@/lib/fan-gallery";

type Tab = "pending" | "approved" | "rejected";

export default function AdminGalleryPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("pending");
  const [items, setItems] = useState<FanSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(
    async (nextTab: Tab = tab, nextSecret = secret) => {
      setError(null);
      const res = await fetch(
        `/api/gallery/admin?status=${nextTab}&secret=${encodeURIComponent(nextSecret)}`,
        {
          headers: { "x-gallery-admin-secret": nextSecret },
        },
      );
      const data = (await res.json()) as {
        items?: FanSubmission[];
        error?: string;
      };
      if (!res.ok) {
        setAuthed(false);
        setError(data.error || "Unable to load submissions.");
        return;
      }
      setAuthed(true);
      setItems(data.items ?? []);
    },
    [secret, tab],
  );

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    await load("pending", secret);
    setTab("pending");
  }

  async function moderate(id: string, action: "approve" | "reject") {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/gallery/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gallery-admin-secret": secret,
        },
        body: JSON.stringify({ id, action }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Action failed.");
        return;
      }
      await load(tab, secret);
    } finally {
      setBusyId(null);
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-background text-ivory px-4 py-16">
        <form
          onSubmit={onUnlock}
          className="mx-auto max-w-md border border-border bg-surface/60 p-8 space-y-5"
        >
          <h1 className="font-display text-2xl text-brass">Gallery moderation</h1>
          <p className="text-sm text-muted">
            Enter the admin secret from <code className="text-brass">GALLERY_ADMIN_SECRET</code>{" "}
            to review fan photo submissions.
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
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

  return (
    <main className="min-h-screen bg-background text-ivory px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
              Admin
            </p>
            <h1 className="font-display text-3xl text-ivory">Fan photo review</h1>
          </div>
          <div className="flex gap-2">
            {(["pending", "approved", "rejected"] as Tab[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTab(id);
                  void load(id, secret);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border min-h-10 ${
                  tab === id
                    ? "border-brass text-brass bg-brass/10"
                    : "border-border text-muted"
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="mb-4 text-sm text-ethio-red">{error}</p> : null}

        {!items.length ? (
          <p className="text-muted">No {tab} submissions.</p>
        ) : (
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="grid gap-5 border border-border bg-surface/40 p-4 sm:grid-cols-[180px_1fr] sm:p-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    item.publicSrc ||
                    item.pendingUrl ||
                    `/api/gallery/admin/preview/${item.id}?secret=${encodeURIComponent(secret)}`
                  }
                  alt=""
                  className="h-44 w-full object-cover border border-border"
                />
                <div>
                  <p className="font-display text-xl text-ivory">{item.name}</p>
                  <p className="text-sm text-muted">{item.email}</p>
                  <p className="mt-3 text-sm text-ivory/85 leading-relaxed">
                    {item.caption || "No caption provided."}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Submitted {new Date(item.createdAt).toLocaleString()}
                  </p>
                  {item.status === "pending" ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void moderate(item.id, "approve")}
                        className="min-h-10 px-4 bg-brass text-charcoal text-sm uppercase tracking-wide disabled:opacity-60"
                      >
                        Approve & publish
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => void moderate(item.id, "reject")}
                        className="min-h-10 px-4 border border-border text-sm uppercase tracking-wide text-muted hover:text-ivory disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-brass">
                      {item.status}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
