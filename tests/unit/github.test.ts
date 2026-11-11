import { describe, expect, it } from "vitest";
import { parseContributions } from "@/lib/github";

const cell = (row: number, col: number, date: string, level: number) =>
  `<td data-date="${date}" id="contribution-day-component-${row}-${col}" data-level="${level}"></td>` +
  `<tool-tip for="contribution-day-component-${row}-${col}">${level} contributions on ${date}.</tool-tip>`;

describe("parseContributions", () => {
  it("reads total, levels and labels", () => {
    const html = `<h2>\n 1,234\n contributions\n in the last year</h2>${cell(0, 0, "2026-01-04", 2)}${cell(3, 1, "2026-01-14", 4)}`;
    const data = parseContributions(html)!;
    expect(data.total).toBe(1234);
    expect(data.weeks).toHaveLength(2);
    expect(data.weeks[0][0]).toMatchObject({ date: "2026-01-04", level: 2 });
    expect(data.weeks[1][3]?.label).toBe("4 contributions on 2026-01-14.");
    expect(data.weeks[0][1]).toBeNull();
  });

  it("returns null when the markup has no calendar", () => {
    expect(parseContributions("<html>changed</html>")).toBeNull();
  });
});
