"use client";

import { useCallback, useEffect, useState } from "react";
import type { FanSubmission } from "@/lib/fan-gallery";

type Tab = "all" | "pending" | "approved" | "rejected";

export function FanGalleryPanel({ secret }: { secret: string }) {
  const [tab, setTab] = useState<Tab>("all");
  const [items, setItems] = useState<FanSubmission[]>([]);
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(
    async (nextTab: Tab = tab) => {
      setError(null);
      const query =
        nextTab === "all" ? "status=all" : `status=${encodeURIComponent(nextTab)}`;
      const res = await fetch(
        `/api/gallery/admin?${query}&secret=${encodeURIComponent(secret)}`,
        { headers: { "x-admin-secret": secret } },
      );
      const data = (await res.json()) as {
        items?: FanSubmission[];
        counts?: typeof counts;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Unable to load submissions.");
        return;
      }
      setItems(data.items ?? []);
      if (data.counts) setCounts(data.counts);
    },
    [secret, tab],
  );

  useEffect(() => {
    void load(tab);
  }, [load, tab]);

  async function moderate(id: string, action: "approve" | "reject" | "delete") {
    if (
      action === "delete" &&
      !window.confirm("Permanently delete this photo from the site?")
    ) {
      return;
    }

    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/gallery/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ id, action }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Action failed.");
        return;
      }
      await load(tab);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-brass mb-2">
            Fan gallery
          </p>
          <h2 className="font-display text-2xl text-ivory sm:text-3xl">
            Photo submissions
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            All fan uploads appear here. Approve to publish, reject spam, or
            permanently delete any submission.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "approved", "rejected"] as Tab[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border min-h-10 ${
                tab === id
                  ? "border-brass text-brass bg-brass/10"
                  : "border-border text-muted"
              }`}
            >
              {id}
              <span className="ml-2 text-brass/80">{counts[id]}</span>
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="text-sm text-ethio-red">{error}</p> : null}

      {!items.length ? (
        <p className="text-muted">
          {tab === "all"
            ? "No fan photos have been submitted yet."
            : `No ${tab} submissions.`}
        </p>
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
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-display text-xl text-ivory">{item.name}</p>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-brass border border-brass/30 px-2 py-1">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted">{item.email}</p>
                <p className="mt-3 text-sm text-ivory/85 leading-relaxed">
                  {item.caption || "No caption provided."}
                </p>
                <p className="mt-2 text-xs text-muted">
                  Submitted {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {item.status === "pending" ? (
                    <>
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
                    </>
                  ) : null}

                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => void moderate(item.id, "delete")}
                    className="min-h-10 px-4 border border-ethio-red/50 text-sm uppercase tracking-wide text-ethio-red hover:bg-ethio-red/10 disabled:opacity-60"
                  >
                    Delete permanently
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
