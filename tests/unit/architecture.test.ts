import { describe, expect, it } from "vitest";
import { architectures, getArchitecture } from "@/content/architecture";
import { getProject } from "@/content/projects";
import { clipToBox, edgeLine, nodeBox, validateDiagram, viewBox, GRID, type DiagramSpec } from "@/lib/diagram";

describe("diagram geometry", () => {
  const box = { x: 0, y: 0, w: 100, h: 50 };

  it("clips a horizontal ray to the box's right edge", () => {
    expect(clipToBox(box, { x: 500, y: 25 })).toEqual({ x: 100, y: 25 });
  });

  it("clips a vertical ray to the bottom edge, plus the gap", () => {
    expect(clipToBox(box, { x: 50, y: 400 }, 4)).toEqual({ x: 50, y: 54 });
  });

  it("edges between neighbouring cells start and end outside both boxes", () => {
    const a = nodeBox({ col: 0, row: 0 });
    const b = nodeBox({ col: 1, row: 0 });
    const { start, end } = edgeLine(a, b);
    expect(start.x).toBeGreaterThan(a.x + a.w);
    expect(end.x).toBeLessThan(b.x);
    expect(start.y).toBe(end.y);
  });

  it("sizes the view box from the grid", () => {
    const nodes = [
      { id: "a", label: "A", col: 0, row: 0 },
      { id: "b", label: "B", col: 2, row: 1 },
    ];
    const { width, height } = viewBox(nodes);
    expect(width).toBe(GRID.margin * 2 + 3 * GRID.cellW);
    // Below the last row there is room for a group outline
    const lastBottom = GRID.margin + GRID.cellH + (GRID.cellH + GRID.nodeH) / 2;
    expect(height).toBeGreaterThanOrEqual(lastBottom + GRID.groupPad);
  });

  it("reports broken specs", () => {
    const bad: DiagramSpec = {
      title: "t",
      description: "d",
      nodes: [
        { id: "a", label: "A", col: 0, row: 0 },
        { id: "b", label: "B", col: 1, row: 0 },
        { id: "c", label: "C", col: 2, row: 0 },
      ],
      edges: [
        { from: "a", to: "c" },
        { from: "a", to: "missing" },
      ],
      groups: [{ label: "g", nodes: ["a", "c"] }],
    };
    const errors = validateDiagram(bad);
    expect(errors).toContain("edge a→c crosses b");
    expect(errors).toContain("edge to unknown node missing");
    expect(errors).toContain("group g overlaps b");
  });

  it("rejects a label on an edge too short to show it", () => {
    const spec: DiagramSpec = {
      title: "t",
      description: "d",
      nodes: [
        { id: "a", label: "A", col: 0, row: 0 },
        { id: "b", label: "B", col: 1, row: 0 },
      ],
      edges: [{ from: "a", to: "b", label: "a long label" }],
    };
    expect(validateDiagram(spec)).toEqual(["edge a→b too short for its label"]);
  });
});

describe("architecture content", () => {
  it("has the four planned pages with unique slugs", () => {
    expect(architectures.map((a) => a.slug)).toEqual([
      "rag-pipeline",
      "ai-code-review-pipeline",
      "event-driven-microservices",
      "chaos-engineering-platform",
    ]);
    expect(getArchitecture("rag-pipeline")?.title).toMatch(/Retrieval-Augmented/);
    expect(getArchitecture("nope")).toBeUndefined();
  });

  it.each(architectures.map((a) => [a.slug, a] as const))("%s diagram renders cleanly", (_, a) => {
    expect(validateDiagram(a.diagram)).toEqual([]);
  });

  it.each(architectures.map((a) => [a.slug, a] as const))("%s has every section filled", (_, a) => {
    expect(a.flow.length).toBeGreaterThanOrEqual(4);
    expect(a.boundaries.length).toBeGreaterThan(0);
    expect(a.failureHandling.length).toBeGreaterThan(0);
    expect(a.tradeoffs.length).toBeGreaterThan(0);
    for (const slug of a.relatedProjects) expect(getProject(slug), slug).toBeDefined();
  });

  it("contains no numeric claims (no invented metrics)", () => {
    const text = JSON.stringify(architectures.map(({ diagram, ...rest }) => ({ ...rest, d: diagram.description })));
    expect(text).not.toMatch(/\d+\s?(%|ms|x\b|k\b|users|requests)/i);
  });
});
