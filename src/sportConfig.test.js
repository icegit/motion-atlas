import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { __iconNode as deerNode } from "@tabler/icons-react/dist/esm/icons/IconDeer.mjs";
import { __iconNode as dogNode } from "@tabler/icons-react/dist/esm/icons/IconDog.mjs";
import { GARMIN_ACTIVITY_PATHS } from "./garminActivityIcons.js";
import { SPORT_META, sportIconNode } from "./sportConfig.js";

const CUSTOM_FALLBACK_TYPES = [
  "bungee_jumping",
  "cliff_jumping",
  "dog_sledding",
  "dune_bashing",
  "helicopter_tour",
  "hot_air_balloon",
  "reindeer_sledding",
  "safari",
  "sandboarding",
  "sledding",
  "submarine",
  "ziplining",
];

describe("activity icon catalog", () => {
  it("uses Garmin glyphs for every standard Garmin activity", () => {
    expect(SPORT_META.strength.glyph).toBe("activity-fitness-equipment");
    expect(SPORT_META.excursion.glyph).toBe("activity-motorcycle");

    for (const [type, meta] of Object.entries(SPORT_META)) {
      if (CUSTOM_FALLBACK_TYPES.includes(type)) continue;
      expect(meta.iconSource, type).toBe("garmin");
      expect(GARMIN_ACTIVITY_PATHS[meta.glyph], type).toBeTruthy();
    }
  });

  it("limits custom icons to name-derived Other/Custom activities", () => {
    const fallbackTypes = Object.entries(SPORT_META)
      .filter(([, meta]) => meta.iconSource !== "garmin")
      .map(([type]) => type)
      .sort();

    expect(fallbackTypes).toEqual([...CUSTOM_FALLBACK_TYPES].sort());
    expect(sportIconNode("dog_sledding")).toEqual(dogNode);
    expect(sportIconNode("reindeer_sledding")).toEqual(deerNode);
  });

  it("publishes Proper Case labels and only one swimming category", () => {
    expect(SPORT_META.trail_running.label).toBe("Trail Running");
    expect(SPORT_META.table_tennis.label).toBe("Table Tennis");
    expect(SPORT_META.dog_sledding.label).toBe("Dog Sledding");
    expect(SPORT_META.reindeer_sledding.label).toBe("Reindeer Sledding");
    expect(SPORT_META.swimming).toBeDefined();
    expect(SPORT_META.open_water_swimming).toBeUndefined();
    expect(SPORT_META.lap_swimming).toBeUndefined();
  });

  it("documents every configured icon with the exact checked-in SVG", () => {
    const referencePath = fileURLToPath(new URL("../ACTIVITY_TYPES.md", import.meta.url));
    const reference = readFileSync(referencePath, "utf8");

    for (const [type, meta] of Object.entries(SPORT_META)) {
      const filename = meta.iconSource === "garmin" ? `garmin-${meta.glyph}.svg` : meta.iconAsset;
      const row = reference.split("\n").find((line) => line.includes(`| \`${type}\` |`));
      expect(row, type).toContain(`docs/activity-icons/${filename}`);
      const iconPath = fileURLToPath(new URL(`../docs/activity-icons/${filename}`, import.meta.url));
      expect(() => readFileSync(iconPath, "utf8")).not.toThrow();
    }
  });
});
