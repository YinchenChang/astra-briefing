import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist-offline");

const files = readdirSync(dist, { recursive: true })
  .map(String)
  .filter((rel) => statSync(join(dist, rel)).isFile());

const htmlName = files.find((f) => f.endsWith(".html") && !f.endsWith("Astra-briefing-offline.html"));
if (!htmlName) throw new Error("no html in dist-offline");

let html = readFileSync(join(dist, htmlName), "utf8");
const cssParts = [];
const jsParts = [];

for (const rel of files) {
  if (rel === htmlName || rel.endsWith("Astra-briefing-offline.html")) continue;
  const posix = rel.replaceAll("\\", "/");
  const abs = join(dist, rel);
  if (posix.endsWith(".css")) {
    cssParts.push(readFileSync(abs, "utf8"));
  } else if (posix.endsWith(".js")) {
    jsParts.push(readFileSync(abs, "utf8"));
  } else if (posix.endsWith(".html")) {
    continue;
  } else {
    throw new Error(`offline build left external file: ${posix}`);
  }
}

html = html.replace(/<link\s+rel="stylesheet"[^>]*>/g, "");
html = html.replace(/<link\s+rel="modulepreload"[^>]*>/g, "");
html = html.replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/g, "");

if (!html.includes("</head>") || !html.includes("</body>")) {
  throw new Error("offline HTML missing head/body");
}

const css = cssParts.join("\n");
const js = jsParts.join("\n");
// Function replacers: JS/CSS contain `$` which String.replace would interpolate.
html = html.replace("</head>", () => `<style>${css}</style>\n</head>`);
html = html.replace("</body>", () => `<script type="module">${js}</script>\n</body>`);

if (/<(script|link)[^>]+(?:src|href)="\.\.?\//.test(html)) {
  throw new Error(`offline HTML still references external assets:\n${html.slice(0, 800)}`);
}

const outName = "Astra-briefing-offline.html";
mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(dist, outName), html);
copyFileSync(join(dist, outName), join(root, "public", outName));
copyFileSync(join(dist, outName), join(root, outName));
console.log(`offline html ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB → ${outName}`);
