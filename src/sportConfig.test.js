import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { __iconNode as airBalloonNode } from "@tabler/icons-react/dist/esm/icons/IconAirBalloon.mjs";
import { __iconNode as submarineNode } from "@tabler/icons-react/dist/esm/icons/IconSubmarine.mjs";
import { GARMIN_ACTIVITY_PATHS } from "./garminActivityIcons.js";
import { SPORT_META, sportIconNode } from "./sportConfig.js";

describe("activity icon catalog", () => {
  it("uses Garmin glyphs for every standard activity", () => {
    expect(SPORT_META.strength.glyph).toBe("activity-fitness-equipment");
    expect(SPORT_META.excursion.glyph).toBe("activity-motorcycle");

    for (const [type, meta] of Object.entries(SPORT_META)) {
      if (type === "submarine" || type === "hot_air_balloon") continue;
      expect(meta.iconSource, type).toBe("garmin");
      expect(GARMIN_ACTIVITY_PATHS[meta.glyph], type).toBeTruthy();
    }
  });

  it("uses non-Garmin fallbacks only for named Other/Custom submarine and balloon activities", () => {
    const fallbackTypes = Object.entries(SPORT_META)
      .filter(([, meta]) => meta.iconSource !== "garmin")
      .map(([type]) => type)
      .sort();

    expect(fallbackTypes).toEqual(["hot_air_balloon", "submarine"]);
    expect(sportIconNode("hot_air_balloon")).toEqual(airBalloonNode);
    expect(sportIconNode("submarine")).toEqual(submarineNode);
  });

  it("publishes only one swimming category", () => {
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
