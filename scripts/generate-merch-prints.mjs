#!/usr/bin/env node
/**
 * Generate Printify-ready transparent wordmark PNGs from shop merch branding.
 *
 * Isolates design/text only (no garment silhouettes or background fills).
 * Output: public/images/merch/printify/*.png (4000×4000)
 *
 * Usage: npm run generate:merch-prints
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const script = path.join(__dirname, "generate-merch-prints.py");
const venvPy = path.join(ROOT, ".venv-merch", "bin", "python3");

console.log("Isolating merch print artwork → public/images/merch/printify/\n");

const result = spawnSync(venvPy, [script], {
  cwd: ROOT,
  stdio: "inherit",
});

if (result.status !== 0) {
  const fallback = spawnSync("python3", [script], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (fallback.status !== 0) {
    console.error(`
Failed to rasterize. Ensure Pillow is available:
  python3 -m venv .venv-merch && .venv-merch/bin/pip install Pillow
Then: npm run generate:merch-prints
`);
    process.exit(fallback.status ?? 1);
  }
}
