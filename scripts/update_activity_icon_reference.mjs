import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SPORT_META } from "../src/sportConfig.js";

const referencePath = fileURLToPath(new URL("../ACTIVITY_TYPES.md", import.meta.url));
const iconDirectory = fileURLToPath(new URL("../docs/activity-icons/", import.meta.url));
const source = await readFile(referencePath, "utf8");

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const attributeName = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

function serializeNode([tag, attributes]) {
  const serializedAttributes = Object.entries(attributes)
    .filter(([name]) => name !== "key")
    .map(([name, value]) => `${attributeName(name)}="${escapeXml(value)}"`)
    .join(" ");
  return `  <${tag}${serializedAttributes ? ` ${serializedAttributes}` : ""} />`;
}

function serializeIcon(meta) {
  const body = meta.iconNode.map(serializeNode).join("\n");
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"',
    `  viewBox="${meta.iconViewBox}" fill="${meta.iconFill}" stroke="currentColor"`,
    '  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    body,
    "</svg>",
    "",
  ].join("\n");
}

await mkdir(iconDirectory, { recursive: true });
const uniqueAssets = new Map();
for (const meta of Object.values(SPORT_META)) {
  if (meta.iconSource === "garmin") continue;
  const previous = uniqueAssets.get(meta.iconAsset);
  const serialized = serializeIcon(meta);
  if (previous && previous !== serialized) {
    throw new Error(`Conflicting icon nodes for ${meta.iconAsset}`);
  }
  uniqueAssets.set(meta.iconAsset, serialized);
}
await Promise.all(
  [...uniqueAssets].map(([filename, svg]) => writeFile(`${iconDirectory}/${filename}`, svg, "utf8")),
);

const updated = source.replace(
  /<img src="docs\/activity-icons\/[^"]+\.svg"([^>]+)> \| `([^`]+)`/g,
  (row, imgAttributes, type) => {
    const meta = SPORT_META[type];
    if (!meta) throw new Error(`No icon metadata for documented type: ${type}`);
    const filename = meta.iconSource === "garmin" ? `garmin-${meta.glyph}.svg` : meta.iconAsset;
    return `<img src="docs/activity-icons/${filename}"${imgAttributes}> | \`${type}\``;
  },
);

await writeFile(referencePath, updated, "utf8");
console.log(
  `Updated ${Object.keys(SPORT_META).length} activity references and wrote ${uniqueAssets.size} custom icons`,
);
