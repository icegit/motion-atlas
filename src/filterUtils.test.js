import { describe, expect, it } from "vitest";
import { areAllSportsActive, toggleAllSports, toggleSportSelection } from "./filterUtils.js";

const sportTypes = ["running", "swimming", "cycling"];

describe("activity filter selection", () => {
  it("toggles Show all to Hide all and back", () => {
    const all = toggleAllSports(new Set(), sportTypes);
    expect(areAllSportsActive(all, sportTypes)).toBe(true);
    expect([...toggleAllSports(all, sportTypes)]).toEqual([]);
  });

  it("switches from all activities to only the clicked activity", () => {
    const selected = toggleSportSelection(new Set(sportTypes), "swimming", sportTypes);
    expect([...selected]).toEqual(["swimming"]);
  });

  it("hides the only selected activity on its second click", () => {
    const selected = toggleSportSelection(new Set(["swimming"]), "swimming", sportTypes);
    expect([...selected]).toEqual([]);
  });

  it("adds an inactive activity when not in Show all mode", () => {
    const selected = toggleSportSelection(new Set(["running"]), "swimming", sportTypes);
    expect([...selected]).toEqual(["running", "swimming"]);
  });
});
