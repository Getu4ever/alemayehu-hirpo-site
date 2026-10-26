"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  inquiryType: "booking",
  message: "",
};

const inputClass =
  "w-full min-h-11 px-4 py-3 bg-surface border border-border text-ivory placeholder:text-muted focus:outline-none focus:border-gold transition-colors";

export function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t.formError);
      return;
    }
    // Integration-ready: POST to /api/contact or a form service.
    setSuccess(true);
    setForm(initial);
  }

  const inquiryOptions = Object.entries(t.inquiryTypes) as [string, string][];

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={t.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="email" label={t.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="inquiryType" label={t.inquiryType} required>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          value={form.inquiryType}
          onChange={(e) => update("inquiryType", e.target.value)}
          className={cn(inputClass, "bg-charcoal")}
        >
          {inquiryOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label={t.message} required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputClass, "resize-y min-h-32")}
        />
      </Field>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-sm text-gold" role="status">
          {t.formSuccess}
        </p>
      ) : (
        <p className="text-xs text-muted">
          Form is integration-ready. Connect a backend or email service before
          production use. See README for details.
        </p>
      )}

      <Button type="submit">{t.sendMessage}</Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.16em] text-gold mb-2"
      >
        {label}
        {required ? <span className="text-muted"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
