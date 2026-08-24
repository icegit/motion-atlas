import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { __iconNode as deerNode } from "@tabler/icons-react/dist/esm/icons/IconDeer.mjs";
import { __iconNode as dogNode } from "@tabler/icons-react/dist/esm/icons/IconDog.mjs";
import { __iconNode as barbellNode } from "@tabler/icons-react/dist/esm/icons/IconBarbell.mjs";
import { __iconNode as camperNode } from "@tabler/icons-react/dist/esm/icons/IconCamper.mjs";
import { __iconNode as rippleNode } from "@tabler/icons-react/dist/esm/icons/IconRipple.mjs";
import { __iconNode as scubaMaskNode } from "@tabler/icons-react/dist/esm/icons/IconScubaMask.mjs";
import { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import { __iconNode as yogaNode } from "@tabler/icons-react/dist/esm/icons/IconYoga.mjs";
import { camelNode } from "./customActivityIcons.js";
import { GARMIN_ACTIVITY_PATHS } from "./garminActivityIcons.js";
import { SPORT_META, sportIconNode } from "./sportConfig.js";

const CUSTOM_FALLBACK_TYPES = [
  "bungee_jumping",
  "cliff_jumping",
  "camel_riding",
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
  it("keeps exact Garmin glyphs for core Garmin categories", () => {
    expect(SPORT_META.walking.glyph).toBe("activity-walking");
    expect(SPORT_META.cycling.glyph).toBe("activity-cycling");
    expect(SPORT_META.swimming.glyph).toBe("activity-swimming");
    for (const [type, meta] of Object.entries(SPORT_META)) {
      if (meta.iconSource !== "garmin") continue;
      expect(GARMIN_ACTIVITY_PATHS[meta.glyph], type).toBeTruthy();
    }
  });

  it("limits custom icons to name-derived Other/Custom activities", () => {
    const fallbackTypes = Object.entries(SPORT_META)
      .filter(([, meta]) => meta.iconSource === "custom-fallback")
      .map(([type]) => type)
      .sort();

    expect(fallbackTypes).toEqual([...CUSTOM_FALLBACK_TYPES].sort());
    expect(sportIconNode("dog_sledding")).toEqual(dogNode);
    expect(sportIconNode("reindeer_sledding")).toEqual(deerNode);
    expect(sportIconNode("camel_riding")).toEqual(camelNode);
  });

  it("replaces misleading Garmin parent glyphs with precise sport icons", () => {
    expect(SPORT_META.surfing.iconSource).toBe("semantic");
    expect(sportIconNode("surfing")).toEqual(rippleNode);
    expect(sportIconNode("snorkeling")).toEqual(scubaMaskNode);
    expect(sportIconNode("snowboarding")).toEqual(snowboardingNode);
    expect(sportIconNode("yoga")).toEqual(yogaNode);
    expect(sportIconNode("strength")).toEqual(barbellNode);
    expect(SPORT_META.strength.iconAsset).toBe("tabler-barbell.svg");
    expect(sportIconNode("excursion")).toEqual(camperNode);
  });

  it("publishes Proper Case labels and only one swimming category", () => {
    expect(SPORT_META.trail_running.label).toBe("Trail Running");
    expect(SPORT_META.table_tennis.label).toBe("Table Tennis");
    expect(SPORT_META.dog_sledding.label).toBe("Dog Sledding");
    expect(SPORT_META.reindeer_sledding.label).toBe("Reindeer Sledding");
    expect(SPORT_META.camel_riding.label).toBe("Camel Riding");
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
