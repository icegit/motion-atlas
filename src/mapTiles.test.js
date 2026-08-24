import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_MAP_STYLE,
  FALLBACK_BASEMAP_TILE_URL,
  MAP_STYLES,
  MOBILE_TILE_OPTIONS,
} from "./mapTiles.js";

describe("map styles and mobile tiles", () => {
  it("defaults to Standard and offers the requested alternative map types", () => {
    expect(DEFAULT_MAP_STYLE).toBe("standard");
    expect(Object.keys(MAP_STYLES)).toEqual([
      "standard",
      "minimal",
      "cycle",
      "topo",
      "satellite",
    ]);
    expect(MAP_STYLES.cycle.url).toContain("cyclosm");
    expect(MAP_STYLES.topo.url).toContain("opentopomap");
  });

  it("keeps a light fallback layer behind every selectable style", () => {
    expect(FALLBACK_BASEMAP_TILE_URL).toContain("cartocdn.com/light_all");
    for (const style of Object.values(MAP_STYLES)) {
      expect(style.opacity).toBeLessThanOrEqual(0.5);
      expect(style.attribution).toBeTruthy();
    }
  });

  it("preloads a generous tile buffer without pane-wide rendering filters", () => {
    expect(MOBILE_TILE_OPTIONS.updateWhenIdle).toBe(false);
    expect(MOBILE_TILE_OPTIONS.updateWhenZooming).toBe(false);
    expect(MOBILE_TILE_OPTIONS.keepBuffer).toBeGreaterThanOrEqual(4);

    const stylesPath = fileURLToPath(new URL("./styles.css", import.meta.url));
    const styles = readFileSync(stylesPath, "utf8");
    expect(styles).not.toMatch(/leaflet-(?:tile|basemap|mapstyle)[^{]*\{[^}]*filter:/s);
  });
});
