import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/lib/admin-auth";
import {
  createNewsArticle,
  deleteNewsArticle,
  listAdminNewsArticles,
  uploadNewsCover,
  type CreateNewsInput,
} from "@/lib/news-store";
import { NEWS_CATEGORIES, type NewsCategory } from "@/data/news";

export async function GET(request: Request) {
  try {
    assertAdminAuthorized(request);
    const data = await listAdminNewsArticles();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    assertAdminAuthorized(request);
    const contentType = request.headers.get("content-type") || "";

    // Cover upload
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const action = String(form.get("action") ?? "create");

      if (action === "upload-cover") {
        const file = form.get("cover");
        if (!(file instanceof File) || file.size === 0) {
          return NextResponse.json(
            { error: "Choose a cover image to upload." },
            { status: 400 },
          );
        }
        const url = await uploadNewsCover(file);
        return NextResponse.json({ ok: true, url });
      }

      const category = String(form.get("category") ?? "announcement");
      if (!NEWS_CATEGORIES.includes(category as NewsCategory)) {
        return NextResponse.json({ error: "Invalid category." }, { status: 400 });
      }

      const input: CreateNewsInput = {
        titleEn: String(form.get("titleEn") ?? ""),
        titleAm: String(form.get("titleAm") ?? ""),
        excerptEn: String(form.get("excerptEn") ?? ""),
        excerptAm: String(form.get("excerptAm") ?? ""),
        bodyEn: String(form.get("bodyEn") ?? ""),
        bodyAm: String(form.get("bodyAm") ?? ""),
        category: category as NewsCategory,
        coverImage: String(form.get("coverImage") ?? ""),
        featured: String(form.get("featured") ?? "") === "true",
        publishedAt: String(form.get("publishedAt") ?? "") || null,
      };

      const coverFile = form.get("coverFile");
      if (coverFile instanceof File && coverFile.size > 0) {
        input.coverImage = await uploadNewsCover(coverFile);
      }

      const article = await createNewsArticle(input);
      return NextResponse.json({ ok: true, article });
    }

    const body = (await request.json()) as CreateNewsInput & {
      action?: "delete";
      id?: string;
    };

    if (body.action === "delete") {
      if (!body.id) {
        return NextResponse.json({ error: "id is required." }, { status: 400 });
      }
      const result = await deleteNewsArticle(body.id);
      return NextResponse.json(result);
    }

    if (!NEWS_CATEGORIES.includes(body.category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const article = await createNewsArticle(body);
    return NextResponse.json({ ok: true, article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
