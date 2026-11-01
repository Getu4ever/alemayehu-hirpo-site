import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/lib/admin-auth";
import { getFanSubmission } from "@/lib/fan-gallery";

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

    const target = submission.publicSrc || submission.pendingUrl;
    if (!target) {
      return NextResponse.json({ error: "No image" }, { status: 404 });
    }

    return NextResponse.redirect(target);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
