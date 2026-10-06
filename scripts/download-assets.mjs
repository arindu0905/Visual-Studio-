// Downloads every media file referenced through `asset("...")` in src/ into
// public/images, so the site can be served without the old WordPress install.
// Usage: npm run assets:download   then set NEXT_PUBLIC_ASSET_BASE=/images
import { readdir, readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "public", "images");
const REMOTE = "https://visualstudiosplus.com/wp-content/uploads/2024/09";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat();
}

const files = (await walk(SRC)).filter((f) => /\.(ts|tsx)$/.test(f));
const names = new Set();
for (const f of files) {
  const text = await readFile(f, "utf8");
  for (const m of text.matchAll(/asset\(\s*"([^"]+)"\s*\)/g)) names.add(m[1]);
  for (const m of text.matchAll(/\["([^"]+\.(?:webp|jpe?g|png))",\s*\d+/g)) names.add(m[1]);
}

await mkdir(OUT, { recursive: true });
let ok = 0;
for (const name of names) {
  const dest = path.join(OUT, name);
  try {
    await access(dest);
    ok++;
    continue;
  } catch {}
  const res = await fetch(`${REMOTE}/${name}`);
  if (!res.ok) {
    console.warn(`✗ ${name} (${res.status})`);
    continue;
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  ok++;
  console.log(`✓ ${name}`);
}
console.log(`\n${ok}/${names.size} files in public/images. Now set NEXT_PUBLIC_ASSET_BASE=/images in .env.local`);
