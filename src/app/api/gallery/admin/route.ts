import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/lib/admin-auth";
import {
  approveFanSubmission,
  deleteFanSubmission,
  listFanSubmissions,
  rejectFanSubmission,
} from "@/lib/fan-gallery";

export async function GET(request: Request) {
  try {
    assertAdminAuthorized(request);
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");
    const status =
      statusParam === "pending" ||
      statusParam === "approved" ||
      statusParam === "rejected"
        ? statusParam
        : undefined;

    const all = await listFanSubmissions();
    const items = status ? all.filter((item) => item.status === status) : all;
    const counts = {
      all: all.length,
      pending: all.filter((item) => item.status === "pending").length,
      approved: all.filter((item) => item.status === "approved").length,
      rejected: all.filter((item) => item.status === "rejected").length,
    };

    return NextResponse.json({ items, counts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    assertAdminAuthorized(request);
    const body = (await request.json()) as {
      id?: string;
      action?: "approve" | "reject" | "delete";
    };
    if (!body.id || !body.action) {
      return NextResponse.json(
        { error: "id and action are required." },
        { status: 400 },
      );
    }

    if (body.action === "delete") {
      const result = await deleteFanSubmission(body.id);
      return NextResponse.json(result);
    }

    const submission =
      body.action === "approve"
        ? await approveFanSubmission(body.id)
        : await rejectFanSubmission(body.id);

    return NextResponse.json({ ok: true, submission });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
