import { NextResponse } from "next/server";
import { MAX_FAN_PHOTOS } from "@/lib/fan-gallery-constants";
import { createFanSubmissions, validateFanUpload } from "@/lib/fan-gallery";

function collectPhotos(form: FormData): File[] {
  const files: File[] = [];
  for (const value of form.getAll("photos")) {
    if (value instanceof File && value.size > 0) files.push(value);
  }
  // Backward-compatible single-file field
  const single = form.get("photo");
  if (single instanceof File && single.size > 0) files.push(single);
  return files;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const caption = String(form.get("caption") ?? "");
    const consent = String(form.get("consent") ?? "");
    const files = collectPhotos(form);

    if (!name.trim() || !email.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }
    if (consent !== "on" && consent !== "true") {
      return NextResponse.json(
        { error: "Please confirm you have permission to share this photo." },
        { status: 400 },
      );
    }
    if (!files.length) {
      return NextResponse.json(
        { error: "Please choose at least one photo to upload." },
        { status: 400 },
      );
    }
    if (files.length > MAX_FAN_PHOTOS) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_FAN_PHOTOS} photos at once.` },
        { status: 400 },
      );
    }

    for (const file of files) {
      const uploadError = validateFanUpload(file);
      if (uploadError) {
        return NextResponse.json(
          { error: `${file.name}: ${uploadError}` },
          { status: 400 },
        );
      }
    }

    const submissions = await createFanSubmissions({
      name,
      email,
      caption,
      files,
    });

    const count = submissions.length;
    return NextResponse.json({
      ok: true,
      ids: submissions.map((s) => s.id),
      count,
      message:
        count === 1
          ? "Thank you. Your photo was received and will appear in the gallery after admin approval."
          : `Thank you. ${count} photos were received and will appear in the gallery after admin approval.`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit photo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
