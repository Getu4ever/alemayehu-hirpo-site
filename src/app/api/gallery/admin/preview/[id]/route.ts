import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import {
  assertAdminAuthorized,
  getFanSubmission,
  getPendingFilePath,
} from "@/lib/fan-gallery";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    assertAdminAuthorized(request);
    const { id } = await context.params;
    const submission = await getFanSubmission(id);
    if (!submission) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (submission.publicSrc) {
      return NextResponse.redirect(new URL(submission.publicSrc, request.url));
    }

    const filePath = await getPendingFilePath(submission);
    if (!filePath) {
      return NextResponse.json({ error: "No image" }, { status: 404 });
    }

    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": submission.mimeType || "image/jpeg",
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
