import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { __iconNode as airBalloonNode } from "@tabler/icons-react/dist/esm/icons/IconAirBalloon.mjs";
import { __iconNode as carNode } from "@tabler/icons-react/dist/esm/icons/IconCar.mjs";
import { __iconNode as dumbbellNode } from "@tabler/icons-react/dist/esm/icons/IconDumbbell.mjs";
import { __iconNode as submarineNode } from "@tabler/icons-react/dist/esm/icons/IconSubmarine.mjs";
import { SPORT_META, sportIconNode } from "./sportConfig";

describe("activity icon catalog", () => {
  it("uses the requested icons for strength, excursion, and custom travel types", () => {
    expect(sportIconNode("strength")).toEqual(dumbbellNode);
    expect(sportIconNode("excursion")).toEqual(carNode);
    expect(sportIconNode("hot_air_balloon")).toEqual(airBalloonNode);
    expect(sportIconNode("submarine")).toEqual(submarineNode);
  });

  it("publishes only one swimming category", () => {
    expect(SPORT_META.swimming).toBeDefined();
    expect(SPORT_META.open_water_swimming).toBeUndefined();
    expect(SPORT_META.lap_swimming).toBeUndefined();
  });

  it("documents every configured icon with a checked-in SVG", () => {
    const referencePath = fileURLToPath(new URL("../ACTIVITY_TYPES.md", import.meta.url));
    const reference = readFileSync(referencePath, "utf8");
    for (const type of Object.keys(SPORT_META)) {
      expect(reference).toContain(`\`${type}\``);
    }

    const iconSources = [...reference.matchAll(/<img src="([^"]+\.svg)"/g)].map((match) => match[1]);
    expect(iconSources.length).toBeGreaterThanOrEqual(Object.keys(SPORT_META).length);
    for (const source of new Set(iconSources)) {
      const iconPath = fileURLToPath(new URL(`../${source}`, import.meta.url));
      expect(() => readFileSync(iconPath, "utf8")).not.toThrow();
    }
  });
});
