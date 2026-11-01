"use client";

import Link from "next/link";
import { AdminGate } from "@/components/admin/AdminGate";
import { FanGalleryPanel } from "@/components/admin/FanGalleryPanel";

export default function AdminGalleryPage() {
  return (
    <AdminGate
      title="Gallery moderation"
      description="Enter the admin secret from GALLERY_ADMIN_SECRET to review fan photo submissions."
    >
      {(secret, lock) => (
        <main className="min-h-screen bg-background text-ivory px-4 py-12 sm:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/admin"
                className="text-sm text-brass hover:text-brass/80"
              >
                ← Admin home
              </Link>
              <button
                type="button"
                onClick={lock}
                className="min-h-10 border border-border px-4 text-xs uppercase tracking-[0.16em] text-muted hover:text-ivory"
              >
                Lock
              </button>
            </div>
            <FanGalleryPanel secret={secret} />
          </div>
        </main>
      )}
    </AdminGate>
  );
}
