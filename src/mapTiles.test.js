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
  it("defaults to a no-key standard map and offers alternative map types", () => {
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
    expect(MAP_STYLES.satellite.url).toContain("server.arcgisonline.com");
    for (const style of Object.values(MAP_STYLES)) {
      expect(style.url).not.toContain("cartocdn");
      expect(style.attribution).not.toContain("CARTO");
    }
  });

  it("keeps a keyless fallback layer behind every selectable style", () => {
    expect(FALLBACK_BASEMAP_TILE_URL).toBe("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    for (const style of Object.values(MAP_STYLES)) {
      expect(style.opacity).toBeLessThanOrEqual(0.5);
      expect(style.attribution).toBeTruthy();
    }
  });

  it("does not reference CARTO from the map setup", () => {
    const mapSource = readFileSync(new URL("./main.jsx", import.meta.url), "utf8");
    expect(mapSource).not.toMatch(/carto/i);
  });

  it("preloads a generous tile buffer without pane-wide rendering filters", () => {
    expect(MOBILE_TILE_OPTIONS.updateWhenIdle).toBe(false);
    expect(MOBILE_TILE_OPTIONS.updateWhenZooming).toBe(false);
    expect(MOBILE_TILE_OPTIONS.keepBuffer).toBeGreaterThanOrEqual(4);

    const stylesPath = fileURLToPath(new URL("./styles.css", import.meta.url));
    const styles = readFileSync(stylesPath, "utf8");
    expect(styles).not.toMatch(/leaflet-(?:tile|basemap|mapstyle)[^{]*\{[^}]*filter:/s);
  });

  it("keeps activity legend icons and labels comfortably legible", () => {
    const stylesPath = fileURLToPath(new URL("./styles.css", import.meta.url));
    const styles = readFileSync(stylesPath, "utf8");
    expect(styles).toMatch(/\.sport-filters \{[^}]*grid-template-columns: 1fr;/s);
    expect(styles).toMatch(/\.sport-filter__icon \{[^}]*width: 34px;[^}]*height: 34px;/s);
    expect(styles).toMatch(/\.sport-filter__icon svg \{[^}]*width: 23px;[^}]*height: 23px;/s);
    expect(styles).toMatch(/\.sport-filter__label \{[^}]*font-size: 0\.875rem;/s);
  });
});
