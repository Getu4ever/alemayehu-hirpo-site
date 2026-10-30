"use client";

import { FormEvent, useState } from "react";
import { Upload } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full min-h-11 px-4 py-3 bg-surface border border-border text-ivory placeholder:text-muted focus:outline-none focus:border-brass transition-colors";

export function FanPhotoSubmit() {
  const { locale } = useLanguage();
  const am = locale === "am";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [caption, setCaption] = useState("");
  const [consent, setConsent] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onFileChange(file: File | null) {
    setPhoto(file);
    setError(null);
    setSuccess(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !photo || !consent) {
      setError(
        am
          ? "እባክዎ ስም፣ ኢሜይል፣ ፎቶ እና ፈቃድ ያረጋግጡ።"
          : "Please add your name, email, photo, and consent.",
      );
      return;
    }

    const body = new FormData();
    body.set("name", name);
    body.set("email", email);
    body.set("caption", caption);
    body.set("consent", "true");
    body.set("photo", photo);

    setPending(true);
    try {
      const res = await fetch("/api/gallery/submit", {
        method: "POST",
        body,
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error || (am ? "ማስገባት አልተሳካም።" : "Upload failed."));
        return;
      }
      setSuccess(
        data.message ||
          (am
            ? "አመሰግናለሁ። ፎቶዎ ተቀብሏል፤ ከአስተዳዳሪ ማረጋገጫ በኋላ በጋለሪ ይታያል።"
            : "Thank you. Your photo was received and will appear after admin approval."),
      );
      setName("");
      setEmail("");
      setCaption("");
      setConsent(false);
      onFileChange(null);
    } catch {
      setError(am ? "የአውታረ መረብ ስህተት። እንደገና ይሞክሩ።" : "Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mt-16 border border-brass/25 bg-surface/40 p-6 sm:p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brass mb-3">
            {am ? "ከደጋፊዎች" : "Community"}
          </p>
          <h2 className="font-display text-3xl text-ivory mb-4">
            {am ? "ፎቶዎን ያጋሩ" : "Share a Photo with Alex"}
          </h2>
          <p className="text-muted leading-relaxed max-w-xl">
            {am
              ? "ከአለማየሁ ሂርጶ ጋር የተነሳፉ፣ የድሮ ትውስታዎች ወይም የመድረክ ፎቶዎች ካሉዎት እዚህ ይላኩ። ከአስተዳዳሪ ማረጋገጫ በኋላ በጋለሪው «ከደጋፊዎች» ክፍል ይታያሉ።"
              : "Have an old photo with Alemayehu Hirpo — a meet-and-greet, concert memory, or family keepsake? Share it here. After admin approval, it will be posted in the From Fans gallery."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.16em] text-brass mb-2">
                {am ? "ስም" : "Your name"} *
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                autoComplete="name"
                required
              />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.16em] text-brass mb-2">
                {am ? "ኢሜይል" : "Email"} *
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.16em] text-brass mb-2">
              {am ? "መግለጫ / ታሪክ" : "Caption / story"}
            </span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className={`${inputClass} min-h-[6rem] resize-y`}
              placeholder={
                am
                  ? "ይህ ፎቶ የተነሳው መቼ ነው? ታሪኩን ያጋሩ…"
                  : "When was this taken? Tell the story…"
              }
            />
          </label>

          <div>
            <span className="block text-xs uppercase tracking-[0.16em] text-brass mb-2">
              {am ? "ፎቶ" : "Photo"} *
            </span>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-border bg-charcoal/40 px-4 py-8 text-center transition-colors hover:border-brass/50">
              <Upload className="text-brass" size={22} />
              <span className="text-sm text-ivory/80">
                {photo
                  ? photo.name
                  : am
                    ? "JPG, PNG, WEBP ወይም GIF (እስከ 6MB)"
                    : "JPG, PNG, WEBP, or GIF (max 6MB)"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              />
            </label>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="mt-4 max-h-48 w-auto border border-border object-contain"
              />
            ) : null}
          </div>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
              required
            />
            <span>
              {am
                ? "ይህን ፎቶ ለማጋራት ፈቃድ አለኝ፤ በይፋዊ ጋለሪ ላይ እንዲታይ እስማማለሁ።"
                : "I have the right to share this photo and agree it may be shown in the official gallery after approval."}
            </span>
          </label>

          {error ? <p className="text-sm text-ethio-red">{error}</p> : null}
          {success ? <p className="text-sm text-brass">{success}</p> : null}

          <Button type="submit" disabled={pending} className="min-w-44">
            {pending
              ? am
                ? "በመላክ ላይ…"
                : "Sending…"
              : am
                ? "ለማረጋገጫ ላክ"
                : "Submit for approval"}
          </Button>
        </form>
      </div>
    </section>
  );
}
