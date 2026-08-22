import { describe, expect, it } from "vitest";
import { escapeHtml, formatActivityCount, popupMarkup } from "./mapUtils";

describe("map presentation helpers", () => {
  it("pluralizes activity counts", () => {
    expect(formatActivityCount(1)).toBe("1 activity");
    expect(formatActivityCount(12)).toBe("12 activities");
  });

  it("escapes public labels before placing them in popup markup", () => {
    expect(escapeHtml('<script>alert("x")</script>')).not.toContain("<script>");
  });

  it("shows years newest first", () => {
    const markup = popupMarkup({
      label: "Running",
      activityCount: 3,
      clusterRadiusKm: 100,
      years: { 2024: 1, 2026: 2 },
    });
    expect(markup.indexOf("2026")).toBeLessThan(markup.indexOf("2024"));
  });

  it("prioritizes the sport name without repeating the grouping explanation", () => {
    const markup = popupMarkup({
      label: "Walking",
      activityCount: 1,
      clusterRadiusKm: 100,
      years: { 2026: 1 },
    });

    expect(markup).toContain("<h2>Walking</h2>");
    expect(markup).toContain('<p class="popup-card__total">1 activity</p>');
    expect(markup).not.toContain("Grouped activity starts");
  });
});
