import { NextResponse } from "next/server";
import { createFanSubmission, validateFanUpload } from "@/lib/fan-gallery";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const caption = String(form.get("caption") ?? "");
    const consent = String(form.get("consent") ?? "");
    const file = form.get("photo");

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
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Please choose a photo to upload." },
        { status: 400 },
      );
    }

    const uploadError = validateFanUpload(file);
    if (uploadError) {
      return NextResponse.json({ error: uploadError }, { status: 400 });
    }

    const submission = await createFanSubmission({
      name,
      email,
      caption,
      file,
    });

    return NextResponse.json({
      ok: true,
      id: submission.id,
      message:
        "Thank you. Your photo was received and will appear in the gallery after admin approval.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit photo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
