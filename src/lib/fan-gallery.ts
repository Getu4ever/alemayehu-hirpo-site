import { randomUUID } from "crypto";
import { put, list, del } from "@vercel/blob";
import type { GalleryItem } from "@/data/gallery";
import { MAX_FAN_PHOTOS } from "@/lib/fan-gallery-constants";

export { MAX_FAN_PHOTOS } from "@/lib/fan-gallery-constants";

export type FanSubmissionStatus = "pending" | "approved" | "rejected";

export type FanSubmission = {
  id: string;
  status: FanSubmissionStatus;
  name: string;
  email: string;
  caption: string;
  originalName: string;
  mimeType: string;
  createdAt: string;
  reviewedAt?: string;
  /** Blob pathname for pending image */
  pendingPath?: string;
  /** Public URL for pending image (admin preview) */
  pendingUrl?: string;
  /** Public URL once approved */
  publicSrc?: string;
  width?: number;
  height?: number;
};

const INDEX_PATH = "fan-gallery/index.json";
const APPROVED_PATH = "fan-gallery/approved.json";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_BYTES = 6 * 1024 * 1024;

function blobConfigured() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.BLOB_STORE_ID?.trim(),
  );
}

function assertBlobConfigured() {
  if (!blobConfigured()) {
    throw new Error(
      "Blob storage is not configured. Add a Vercel Blob store (BLOB_READ_WRITE_TOKEN) to enable fan gallery submissions.",
    );
  }
}

async function readJsonBlob<T>(pathname: string, fallback: T): Promise<T> {
  assertBlobConfigured();
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  const match = blobs.find((b) => b.pathname === pathname);
  if (!match) return fallback;
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return fallback;
  try {
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonBlob(pathname: string, data: unknown) {
  assertBlobConfigured();
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readIndex(): Promise<FanSubmission[]> {
  return readJsonBlob<FanSubmission[]>(INDEX_PATH, []);
}

async function writeIndex(items: FanSubmission[]) {
  await writeJsonBlob(INDEX_PATH, items);
}

export async function readApprovedFanGallery(): Promise<GalleryItem[]> {
  if (!blobConfigured()) return [];
  try {
    return await readJsonBlob<GalleryItem[]>(APPROVED_PATH, []);
  } catch {
    return [];
  }
}

async function writeApprovedFanGallery(items: GalleryItem[]) {
  await writeJsonBlob(APPROVED_PATH, items);
}

function extensionFor(mime: string, originalName: string) {
  const fromName = originalName.includes(".")
    ? `.${originalName.split(".").pop()!.toLowerCase()}`
    : "";
  if (fromName && [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fromName)) {
    return fromName === ".jpeg" ? ".jpg" : fromName;
  }
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/gif") return ".gif";
  return ".jpg";
}

export function validateFanUpload(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Please upload a JPG, PNG, WEBP, or GIF image.";
  }
  if (file.size > MAX_BYTES) {
    return "Images must be 6MB or smaller.";
  }
  return null;
}

export async function createFanSubmission(input: {
  name: string;
  email: string;
  caption: string;
  file: File;
}): Promise<FanSubmission> {
  const [submission] = await createFanSubmissions({
    ...input,
    files: [input.file],
  });
  return submission;
}

export async function createFanSubmissions(input: {
  name: string;
  email: string;
  caption: string;
  files: File[];
}): Promise<FanSubmission[]> {
  if (!input.files.length) {
    throw new Error("Please choose at least one photo to upload.");
  }
  if (input.files.length > MAX_FAN_PHOTOS) {
    throw new Error(`You can upload up to ${MAX_FAN_PHOTOS} photos at once.`);
  }

  for (const file of input.files) {
    const error = validateFanUpload(file);
    if (error) throw new Error(`${file.name}: ${error}`);
  }

  assertBlobConfigured();

  const created: FanSubmission[] = [];
  for (const file of input.files) {
    const id = randomUUID();
    const ext = extensionFor(file.type, file.name);
    const pendingPath = `fan-gallery/pending/${id}${ext}`;
    const blob = await put(pendingPath, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });

    created.push({
      id,
      status: "pending",
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      caption: input.caption.trim(),
      originalName: file.name,
      mimeType: file.type,
      createdAt: new Date().toISOString(),
      pendingPath,
      pendingUrl: blob.url,
      width: 1200,
      height: 1600,
    });
  }

  const items = await readIndex();
  items.unshift(...created);
  await writeIndex(items);
  return created;
}

export async function listFanSubmissions(status?: FanSubmissionStatus) {
  const items = await readIndex();
  if (!status) return items;
  return items.filter((item) => item.status === status);
}

export async function getFanSubmission(id: string) {
  const items = await readIndex();
  return items.find((item) => item.id === id) ?? null;
}

export async function approveFanSubmission(id: string) {
  const items = await readIndex();
  const submission = items.find((item) => item.id === id);
  if (!submission) throw new Error("Submission not found.");
  if (submission.status === "approved") return submission;

  const sourceUrl = submission.pendingUrl;
  if (!sourceUrl && !submission.pendingPath) {
    throw new Error("Missing image file.");
  }

  assertBlobConfigured();
  const ext = extensionFor(
    submission.mimeType,
    submission.pendingPath || submission.originalName,
  );
  const approvedPath = `fan-gallery/approved/${submission.id}${ext}`;

  let publicSrc = submission.pendingUrl;
  if (sourceUrl) {
    const imageRes = await fetch(sourceUrl);
    if (!imageRes.ok) throw new Error("Unable to read pending image.");
    const buffer = Buffer.from(await imageRes.arrayBuffer());
    const blob = await put(approvedPath, buffer, {
      access: "public",
      contentType: submission.mimeType || "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    publicSrc = blob.url;
  }

  submission.status = "approved";
  submission.reviewedAt = new Date().toISOString();
  submission.publicSrc = publicSrc;
  await writeIndex(items);

  if (submission.pendingPath) {
    try {
      await del(submission.pendingPath);
    } catch {
      // Pending blob may already be gone
    }
  }

  const approved = await readApprovedFanGallery();
  const galleryItem: GalleryItem = {
    id: `fan-${submission.id}`,
    src: publicSrc!,
    alt: {
      en: submission.caption
        ? `${submission.caption} — shared by ${submission.name}`
        : `Fan photo shared by ${submission.name}`,
      am: submission.caption
        ? `${submission.caption} — በ${submission.name} የተጋራ`
        : `በ${submission.name} የተጋራ የደጋፊ ፎቶ`,
    },
    category: "fans",
    width: submission.width ?? 1200,
    height: submission.height ?? 1600,
  };

  if (!approved.some((item) => item.id === galleryItem.id)) {
    approved.unshift(galleryItem);
    await writeApprovedFanGallery(approved);
  }

  return submission;
}

export async function rejectFanSubmission(id: string) {
  const items = await readIndex();
  const submission = items.find((item) => item.id === id);
  if (!submission) throw new Error("Submission not found.");
  submission.status = "rejected";
  submission.reviewedAt = new Date().toISOString();
  await writeIndex(items);
  return submission;
}

export async function deleteFanSubmission(id: string) {
  const items = await readIndex();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Submission not found.");
  const submission = items[index]!;

  assertBlobConfigured();

  const pathsToDelete = new Set<string>();
  if (submission.pendingPath) pathsToDelete.add(submission.pendingPath);
  if (submission.pendingUrl) pathsToDelete.add(submission.pendingUrl);
  if (submission.publicSrc) pathsToDelete.add(submission.publicSrc);

  // Approved copies use a predictable pathname even if only the URL is stored.
  const ext = extensionFor(
    submission.mimeType,
    submission.pendingPath || submission.originalName,
  );
  pathsToDelete.add(`fan-gallery/approved/${submission.id}${ext}`);

  for (const target of pathsToDelete) {
    try {
      await del(target);
    } catch {
      // Blob may already be gone
    }
  }

  items.splice(index, 1);
  await writeIndex(items);

  const approved = await readApprovedFanGallery();
  const nextApproved = approved.filter((item) => item.id !== `fan-${id}`);
  if (nextApproved.length !== approved.length) {
    await writeApprovedFanGallery(nextApproved);
  }

  return { ok: true as const, id };
}

export function assertAdminAuthorized(request: Request) {
  const secret = process.env.GALLERY_ADMIN_SECRET;
  if (!secret) {
    throw new Error(
      "GALLERY_ADMIN_SECRET is not set. Add it to .env.local to enable moderation.",
    );
  }
  const header = request.headers.get("x-gallery-admin-secret");
  const url = new URL(request.url);
  const query = url.searchParams.get("secret");
  if (header !== secret && query !== secret) {
    throw new Error("Unauthorized");
  }
}
