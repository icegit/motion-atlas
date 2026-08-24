import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SPORT_META } from "../src/sportConfig.js";

const referencePath = fileURLToPath(new URL("../ACTIVITY_TYPES.md", import.meta.url));
const source = await readFile(referencePath, "utf8");

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
console.log(`Updated icon references for ${Object.keys(SPORT_META).length} activity types`);
