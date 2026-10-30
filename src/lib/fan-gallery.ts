import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { GalleryItem } from "@/data/gallery";

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
  /** Relative path under data/fan-submissions/files when pending */
  pendingFile?: string;
  /** Public URL once approved */
  publicSrc?: string;
  width?: number;
  height?: number;
};

const ROOT = process.cwd();
const SUBMISSIONS_DIR = path.join(ROOT, "data", "fan-submissions");
const FILES_DIR = path.join(SUBMISSIONS_DIR, "files");
const INDEX_PATH = path.join(SUBMISSIONS_DIR, "index.json");
const APPROVED_JSON = path.join(ROOT, "src", "data", "fan-gallery.json");
const PUBLIC_FANS_DIR = path.join(ROOT, "public", "images", "gallery", "fans");

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_BYTES = 6 * 1024 * 1024;

async function ensureDirs() {
  await fs.mkdir(FILES_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_FANS_DIR, { recursive: true });
  try {
    await fs.access(INDEX_PATH);
  } catch {
    await fs.writeFile(INDEX_PATH, "[]", "utf8");
  }
  try {
    await fs.access(APPROVED_JSON);
  } catch {
    await fs.writeFile(APPROVED_JSON, "[]", "utf8");
  }
}

async function readIndex(): Promise<FanSubmission[]> {
  await ensureDirs();
  const raw = await fs.readFile(INDEX_PATH, "utf8");
  try {
    return JSON.parse(raw) as FanSubmission[];
  } catch {
    return [];
  }
}

async function writeIndex(items: FanSubmission[]) {
  await ensureDirs();
  await fs.writeFile(INDEX_PATH, JSON.stringify(items, null, 2), "utf8");
}

export async function readApprovedFanGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(APPROVED_JSON, "utf8");
    return JSON.parse(raw) as GalleryItem[];
  } catch {
    return [];
  }
}

async function writeApprovedFanGallery(items: GalleryItem[]) {
  await fs.writeFile(APPROVED_JSON, JSON.stringify(items, null, 2), "utf8");
}

function extensionFor(mime: string, originalName: string) {
  const fromName = path.extname(originalName).toLowerCase();
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
  const error = validateFanUpload(input.file);
  if (error) throw new Error(error);

  await ensureDirs();
  const id = randomUUID();
  const ext = extensionFor(input.file.type, input.file.name);
  const pendingFile = `${id}${ext}`;
  const buffer = Buffer.from(await input.file.arrayBuffer());
  await fs.writeFile(path.join(FILES_DIR, pendingFile), buffer);

  const submission: FanSubmission = {
    id,
    status: "pending",
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    caption: input.caption.trim(),
    originalName: input.file.name,
    mimeType: input.file.type,
    createdAt: new Date().toISOString(),
    pendingFile,
    width: 1200,
    height: 1600,
  };

  const items = await readIndex();
  items.unshift(submission);
  await writeIndex(items);
  return submission;
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

export async function getPendingFilePath(submission: FanSubmission) {
  if (!submission.pendingFile) return null;
  return path.join(FILES_DIR, submission.pendingFile);
}

export async function approveFanSubmission(id: string) {
  const items = await readIndex();
  const submission = items.find((item) => item.id === id);
  if (!submission) throw new Error("Submission not found.");
  if (submission.status === "approved") return submission;
  if (!submission.pendingFile) throw new Error("Missing image file.");

  await ensureDirs();
  const ext = path.extname(submission.pendingFile);
  const publicName = `${submission.id}${ext}`;
  const from = path.join(FILES_DIR, submission.pendingFile);
  const to = path.join(PUBLIC_FANS_DIR, publicName);
  await fs.copyFile(from, to);

  const publicSrc = `/images/gallery/fans/${publicName}`;
  submission.status = "approved";
  submission.reviewedAt = new Date().toISOString();
  submission.publicSrc = publicSrc;
  await writeIndex(items);

  const approved = await readApprovedFanGallery();
  const galleryItem: GalleryItem = {
    id: `fan-${submission.id}`,
    src: publicSrc,
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
