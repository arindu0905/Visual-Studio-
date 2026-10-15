/**
 * Builds the WordPress theme in wordpress/visualstudiosplus and packages it as
 * wordpress/dist/visualstudiosplus.zip (upload via Appearance → Themes → Add New).
 *
 *   npm run wp:build            CSS + assets + zip
 *   npm run wp:css              CSS only
 *   npm run wp:build -- --no-media   zip without the bundled photos/showreel
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { crc32, deflateRawSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wp = join(root, "wordpress");
const theme = join(wp, "visualstudiosplus");
const args = new Set(process.argv.slice(2));

function step(label) {
  console.log(`\n▸ ${label}`);
}

// 1. Tailwind → assets/css/theme.css (scans the theme's PHP and JS for classes).
step("Compiling CSS");
const cli = join(root, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");
const css = spawnSync(process.execPath, [cli, "-i", join(wp, "src", "theme.css"), "-o", join(theme, "assets", "css", "theme.css"), "--minify"], {
  cwd: wp,
  stdio: "inherit",
});
if (css.status !== 0) process.exit(css.status ?? 1);
if (args.has("--css-only")) process.exit(0);

// 2. Vendor scripts.
step("Copying vendor scripts");
mkdirSync(join(theme, "assets", "vendor"), { recursive: true });
copyFileSync(join(root, "node_modules", "lenis", "dist", "lenis.min.js"), join(theme, "assets", "vendor", "lenis.min.js"));

// 3. Media (photos, logos, showreel) from the Next.js public folder.
step("Copying media");
const media = join(theme, "assets", "media");
rmSync(media, { recursive: true, force: true });
mkdirSync(media, { recursive: true });
cpSync(join(root, "public", "images"), media, { recursive: true });
copyFileSync(join(root, "public", "images", "Cover.jpeg"), join(theme, "screenshot.jpg"));
console.log(`  ${readdirSync(media).length} files`);

// 4. Zip (forward-slash paths, so it installs on Linux hosts too).
step("Packaging");
const skipMedia = args.has("--no-media");
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === ".DS_Store" || name === "Thumbs.db") continue;
    if (skipMedia && p.startsWith(media + sep)) continue;
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(theme);

const STORED = /\.(webp|png|jpe?g|gif|mp4|woff2?|zip)$/i;
const now = new Date();
const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
const locals = [];
const centrals = [];
let offset = 0;

for (const file of files) {
  const name = Buffer.from("visualstudiosplus/" + relative(theme, file).split(sep).join("/"));
  const data = readFileSync(file);
  const method = STORED.test(file) ? 0 : 8;
  const body = method ? deflateRawSync(data, { level: 9 }) : data;
  const crc = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(dosTime, 10);
  local.writeUInt16LE(dosDate, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  locals.push(local, name, body);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(method, 10);
  central.writeUInt16LE(dosTime, 12);
  central.writeUInt16LE(dosDate, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE(offset, 42);
  centrals.push(central, name);

  offset += local.length + name.length + body.length;
}

const centralSize = centrals.reduce((n, b) => n + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);

const dist = join(wp, "dist");
mkdirSync(dist, { recursive: true });
const out = join(dist, skipMedia ? "visualstudiosplus-no-media.zip" : "visualstudiosplus.zip");
writeFileSync(out, Buffer.concat([...locals, ...centrals, end]));
console.log(`  ${files.length} files → ${relative(root, out)} (${(statSync(out).size / 1048576).toFixed(1)} MB)`);
if (!existsSync(out)) process.exit(1);
