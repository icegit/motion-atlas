import { describe, expect, it } from "vitest";
import { markerOffsetMap } from "./markerLayout.js";

const group = (id, type, latitude = 52.3, longitude = 4.8) => ({
  id,
  type,
  latitude,
  longitude,
});

describe("overlapping marker layout", () => {
  it("keeps a lone marker on its published location", () => {
    expect(markerOffsetMap([group("one", "walking")]).get("one")).toEqual({ x: 0, y: 0 });
  });

  it("spreads markers that share a rounded privacy location", () => {
    const groups = [
      group("walk", "walking"),
      group("cycle", "cycling"),
      group("swim", "swimming"),
      group("yoga", "yoga"),
    ];
    const offsets = markerOffsetMap(groups);
    const positions = groups.map(({ id }) => `${offsets.get(id).x}:${offsets.get(id).y}`);

    expect(new Set(positions)).toHaveLength(groups.length);
    positions.forEach((position) => expect(position).not.toBe("0:0"));
  });

  it("does not move markers at different published locations", () => {
    const offsets = markerOffsetMap([
      group("amsterdam", "walking", 52.3, 4.8),
      group("rotterdam", "cycling", 51.9, 4.5),
    ]);

    expect(offsets.get("amsterdam")).toEqual({ x: 0, y: 0 });
    expect(offsets.get("rotterdam")).toEqual({ x: 0, y: 0 });
  });
});
