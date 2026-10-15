/**
 * Writes src/data/image-colors.json: the average colour of every image in
 * public/images. Frames show this colour while the photo loads, so the page
 * never shows empty boxes. Runs automatically before `npm run build`.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "images");
const out = {};

for (const file of readdirSync(dir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort()) {
  const { data, info } = await sharp(join(dir, file)).flatten({ background: "#0c0e0c" }).resize(1, 1, { fit: "cover" }).raw().toBuffer({ resolveWithObject: true });
  if (info.channels >= 3) out[file] = "#" + [data[0], data[1], data[2]].map((v) => v.toString(16).padStart(2, "0")).join("");
}

writeFileSync(join(root, "src", "data", "image-colors.json"), JSON.stringify(out, null, 0) + "\n");
console.log(`image colours: ${Object.keys(out).length} images`);
