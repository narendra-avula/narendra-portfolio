/**
 * Layout maths for grid-based architecture diagrams. Nodes sit on a
 * column/row grid; edges are straight lines clipped to the node boxes.
 * Pure functions so they can be unit tested without rendering.
 */

export type DiagramNodeKind = "service" | "store" | "external" | "actor" | "queue" | "control";
export type DiagramEdgeStyle = "sync" | "async" | "failure";

export type DiagramNode = {
  id: string;
  label: string;
  /** Short second line */
  sub?: string;
  col: number;
  row: number;
  kind?: DiagramNodeKind;
};

export type DiagramEdge = { from: string; to: string; label?: string; style?: DiagramEdgeStyle };

/** Dashed box drawn around a set of nodes, e.g. a trust boundary */
export type DiagramGroup = { label: string; nodes: string[] };

export type DiagramSpec = {
  title: string;
  /** One-sentence summary used as the SVG <desc> */
  description: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
};

export const GRID = {
  cellW: 210,
  cellH: 130,
  nodeW: 168,
  nodeH: 58,
  /** Outer margin, leaves room for group labels */
  margin: 40,
  groupPad: 14,
  groupLabel: 18,
} as const;

/** Text limits so labels fit inside a node box at the rendered font sizes */
export const LABEL_MAX = 22;
export const SUB_MAX = 28;

export type Box = { x: number; y: number; w: number; h: number };
export type Point = { x: number; y: number };

export function nodeBox(n: Pick<DiagramNode, "col" | "row">): Box {
  return {
    x: GRID.margin + n.col * GRID.cellW + (GRID.cellW - GRID.nodeW) / 2,
    y: GRID.margin + n.row * GRID.cellH + (GRID.cellH - GRID.nodeH) / 2,
    w: GRID.nodeW,
    h: GRID.nodeH,
  };
}

export function viewBox(nodes: DiagramNode[]) {
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  // The bottom only needs room for a group outline, not a group label
  const bottom = GRID.groupPad + 16 - (GRID.cellH - GRID.nodeH) / 2;
  return { width: GRID.margin * 2 + cols * GRID.cellW, height: GRID.margin + rows * GRID.cellH + bottom };
}

const center = (b: Box): Point => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/** Where the ray from the box centre towards `toward` leaves the box, plus a gap */
export function clipToBox(b: Box, toward: Point, gap = 0): Point {
  const c = center(b);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const tx = dx === 0 ? Infinity : b.w / 2 / Math.abs(dx);
  const ty = dy === 0 ? Infinity : b.h / 2 / Math.abs(dy);
  const t = Math.min(tx, ty);
  const len = Math.hypot(dx, dy);
  return { x: c.x + dx * t + (dx / len) * gap, y: c.y + dy * t + (dy / len) * gap };
}

/** Start and end points of an edge between two node boxes */
export function edgeLine(a: Box, b: Box, gap = 4): { start: Point; end: Point; mid: Point } {
  const start = clipToBox(a, center(b), gap);
  const end = clipToBox(b, center(a), gap);
  return { start, end, mid: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 } };
}

export function groupBox(boxes: Box[]): Box {
  const x = Math.min(...boxes.map((b) => b.x)) - GRID.groupPad;
  const y = Math.min(...boxes.map((b) => b.y)) - GRID.groupPad - GRID.groupLabel;
  const right = Math.max(...boxes.map((b) => b.x + b.w)) + GRID.groupPad;
  const bottom = Math.max(...boxes.map((b) => b.y + b.h)) + GRID.groupPad;
  return { x, y, w: right - x, h: bottom - y };
}

export const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/** Approximate rendered width of an edge label at 11px */
export const edgeLabelWidth = (label: string) => label.length * 6.1 + 12;

/** Problems that would make a diagram render wrongly; empty when valid */
export function validateDiagram(spec: DiagramSpec): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const cells = new Set<string>();
  for (const n of spec.nodes) {
    if (ids.has(n.id)) errors.push(`duplicate node id ${n.id}`);
    ids.add(n.id);
    const cell = `${n.col},${n.row}`;
    if (cells.has(cell)) errors.push(`two nodes in cell ${cell}`);
    cells.add(cell);
    if (n.label.length > LABEL_MAX) errors.push(`label too long: ${n.label}`);
    if (n.sub && n.sub.length > SUB_MAX) errors.push(`sub too long: ${n.sub}`);
  }
  for (const e of spec.edges) {
    if (!ids.has(e.from)) errors.push(`edge from unknown node ${e.from}`);
    if (!ids.has(e.to)) errors.push(`edge to unknown node ${e.to}`);
  }
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  // An edge must not pass through a node it doesn't connect
  for (const e of spec.edges) {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) continue;
    const { start, end } = edgeLine(nodeBox(a), nodeBox(b));
    // A label needs visible line on both sides, or it hides the arrow
    if (e.label) {
      const len = Math.hypot(end.x - start.x, end.y - start.y);
      // How much of the line the label box covers, measured along the line
      const covered = (Math.abs(end.x - start.x) / len) * edgeLabelWidth(e.label) + (Math.abs(end.y - start.y) / len) * 18;
      if (len < covered + 24) errors.push(`edge ${e.from}→${e.to} too short for its label`);
    }
    for (const n of spec.nodes) {
      if (n === a || n === b) continue;
      const box = nodeBox(n);
      for (let i = 0; i <= 50; i++) {
        const p = { x: start.x + ((end.x - start.x) * i) / 50, y: start.y + ((end.y - start.y) * i) / 50 };
        if (overlaps(box, { x: p.x, y: p.y, w: 0.01, h: 0.01 })) {
          errors.push(`edge ${e.from}→${e.to} crosses ${n.id}`);
          break;
        }
      }
    }
  }
  const groupBoxes = (spec.groups ?? []).map((g) => {
    const members = g.nodes.map((id) => byId.get(id));
    if (members.some((m) => !m)) errors.push(`group ${g.label} has an unknown node`);
    const boxes = members.filter((m): m is DiagramNode => Boolean(m)).map(nodeBox);
    const box = boxes.length ? groupBox(boxes) : null;
    // A group must not swallow a node that isn't in it
    if (box)
      for (const n of spec.nodes)
        if (!g.nodes.includes(n.id) && overlaps(box, nodeBox(n))) errors.push(`group ${g.label} overlaps ${n.id}`);
    return box;
  });
  groupBoxes.forEach((a, i) =>
    groupBoxes.slice(i + 1).forEach((b) => {
      if (a && b && overlaps(a, b)) errors.push(`groups overlap: ${spec.groups![i].label}`);
    })
  );
  return errors;
}
