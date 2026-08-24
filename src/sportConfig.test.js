import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { __iconNode as car4wdNode } from "@tabler/icons-react/dist/esm/icons/IconCar4wd.mjs";
import { __iconNode as dumbbellNode } from "@tabler/icons-react/dist/esm/icons/IconDumbbell.mjs";
import { __iconNode as kayakNode } from "@tabler/icons-react/dist/esm/icons/IconKayak.mjs";
import { __iconNode as pingPongNode } from "@tabler/icons-react/dist/esm/icons/IconPingPong.mjs";
import { __iconNode as sailboatNode } from "@tabler/icons-react/dist/esm/icons/IconSailboat.mjs";
import { __iconNode as scubaMaskNode } from "@tabler/icons-react/dist/esm/icons/IconScubaMask.mjs";
import { __iconNode as skiJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconSkiJumping.mjs";
import { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import { __iconNode as yogaNode } from "@tabler/icons-react/dist/esm/icons/IconYoga.mjs";
import { SPORT_META, sportIconNode } from "./sportConfig.js";

describe("activity icon catalog", () => {
  it("uses activity-specific icons for the categories that previously mismatched", () => {
    expect(sportIconNode("strength")).toEqual(dumbbellNode);
    expect(sportIconNode("excursion")).toEqual(car4wdNode);
    expect(sportIconNode("yoga")).toEqual(yogaNode);
    expect(sportIconNode("table_tennis")).toEqual(pingPongNode);
    expect(sportIconNode("snorkeling")).toEqual(scubaMaskNode);
    expect(sportIconNode("sailing")).toEqual(sailboatNode);
    expect(sportIconNode("kayaking")).toEqual(kayakNode);
    expect(sportIconNode("skiing")).toEqual(skiJumpingNode);
    expect(sportIconNode("snowboarding")).toEqual(snowboardingNode);
  });

  it("publishes labels in Proper Case", () => {
    expect(SPORT_META.trail_running.label).toBe("Trail Running");
    expect(SPORT_META.table_tennis.label).toBe("Table Tennis");
    expect(SPORT_META.stand_up_paddling.label).toBe("Stand-Up Paddling");
    expect(SPORT_META.hot_air_balloon.label).toBe("Hot-Air Balloon");
    expect(SPORT_META.martial_arts.label).toBe("Martial Arts");
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
      const row = reference.split("\n").find((line) => line.includes(`| \`${type}\` |`));
      expect(row, type).toContain(`docs/activity-icons/${meta.iconAsset}`);
      const iconPath = fileURLToPath(new URL(`../docs/activity-icons/${meta.iconAsset}`, import.meta.url));
      expect(() => readFileSync(iconPath, "utf8")).not.toThrow();
    }
  });
});
