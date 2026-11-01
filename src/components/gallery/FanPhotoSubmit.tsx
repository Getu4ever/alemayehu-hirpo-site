"use client";

import { FormEvent, useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { MAX_FAN_PHOTOS } from "@/lib/fan-gallery-constants";

const inputClass =
  "w-full min-h-11 px-4 py-3 bg-surface border border-border text-ivory placeholder:text-muted focus:outline-none focus:border-brass transition-colors";

type PreviewItem = {
  file: File;
  url: string;
};

export function FanPhotoSubmit() {
  const { locale } = useLanguage();
  const am = locale === "am";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [caption, setCaption] = useState("");
  const [consent, setConsent] = useState(false);
  const [photos, setPhotos] = useState<PreviewItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // Only revoke on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    setError(null);
    setSuccess(null);

    const incoming = Array.from(list);
    setPhotos((prev) => {
      const room = MAX_FAN_PHOTOS - prev.length;
      if (room <= 0) {
        setError(
          am
            ? `እስከ ${MAX_FAN_PHOTOS} ፎቶዎች ብቻ ማከል ይችላሉ።`
            : `You can add up to ${MAX_FAN_PHOTOS} photos.`,
        );
        return prev;
      }
      const nextFiles = incoming.slice(0, room);
      if (incoming.length > room) {
        setError(
          am
            ? `እስከ ${MAX_FAN_PHOTOS} ፎቶዎች ብቻ። ተጨማሪዎቹ ተትተዋል።`
            : `Only ${MAX_FAN_PHOTOS} photos allowed. Extra files were skipped.`,
        );
      }
      return [
        ...prev,
        ...nextFiles.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        })),
      ];
    });
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
    setError(null);
    setSuccess(null);
  }

  function clearPhotos() {
    setPhotos((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !photos.length || !consent) {
      setError(
        am
          ? "እባክዎ ስም፣ ኢሜይል፣ ቢያንስ አንድ ፎቶ እና ፈቃድ ያረጋግጡ።"
          : "Please add your name, email, at least one photo, and consent.",
      );
      return;
    }

    const body = new FormData();
    body.set("name", name);
    body.set("email", email);
    body.set("caption", caption);
    body.set("consent", "true");
    photos.forEach((p) => body.append("photos", p.file));

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
            ? "አመሰግናለሁ። ፎቶዎችዎ ተቀብለዋል፤ ከአስተዳዳሪ ማረጋገጫ በኋላ በጋለሪ ይታያሉ።"
            : "Thank you. Your photos were received and will appear after admin approval."),
      );
      setName("");
      setEmail("");
      setCaption("");
      setConsent(false);
      clearPhotos();
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
              ? "ከአለማየሁ ሂርጶ ጋር የተነሳፉ፣ የድሮ ትውስታዎች ወይም የመድረክ ፎቶዎች ካሉዎት እዚህ ይላኩ። እስከ አስር ፎቶዎች በአንድ ጊዜ ማከል ይችላሉ። ከአስተዳዳሪ ማረጋገጫ በኋላ በጋለሪው «ከደጋፊዎች» ክፍል ይታያሉ።"
              : "Have old photos with Alemayehu Hirpo — meet-and-greets, concert memories, or family keepsakes? Share up to ten at once. After admin approval, they will be posted in the From Fans gallery."}
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
                  ? "እነዚህ ፎቶዎች የተነሱት መቼ ነው? ታሪኩን ያጋሩ…"
                  : "When were these taken? Tell the story…"
              }
            />
          </label>

          <div>
            <span className="block text-xs uppercase tracking-[0.16em] text-brass mb-2">
              {am
                ? `ፎቶዎች (እስከ ${MAX_FAN_PHOTOS}) *`
                : `Photos (up to ${MAX_FAN_PHOTOS}) *`}
            </span>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-border bg-charcoal/40 px-4 py-8 text-center transition-colors hover:border-brass/50">
              <Upload className="text-brass" size={22} />
              <span className="text-sm text-ivory/80">
                {photos.length
                  ? am
                    ? `${photos.length} / ${MAX_FAN_PHOTOS} ተመርጠዋል — ተጨማሪ ለማከል ይጫኑ`
                    : `${photos.length} / ${MAX_FAN_PHOTOS} selected — click to add more`
                  : am
                    ? "JPG, PNG, WEBP ወይም GIF (እያንዳንዱ እስከ 6MB)"
                    : "JPG, PNG, WEBP, or GIF (max 6MB each)"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
            {photos.length ? (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((item, index) => (
                  <li
                    key={`${item.file.name}-${item.file.size}-${index}`}
                    className="relative border border-border bg-charcoal/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-charcoal/85 text-ivory hover:text-brass"
                      aria-label={am ? "ፎቶ አስወግድ" : "Remove photo"}
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
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
                ? "እነዚህን ፎቶዎች ለማጋራት ፈቃድ አለኝ፤ በይፋዊ ጋለሪ ላይ እንዲታዩ እስማማለሁ።"
                : "I have the right to share these photos and agree they may be shown in the official gallery after approval."}
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
