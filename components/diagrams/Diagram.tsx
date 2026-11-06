import { useId } from "react";
import {
  edgeLabelWidth,
  edgeLine,
  groupBox,
  nodeBox,
  viewBox,
  type DiagramEdgeStyle,
  type DiagramNodeKind,
  type DiagramSpec,
} from "@/lib/diagram";

const nodeStyle: Record<DiagramNodeKind, { box: string; dash?: string; rx: number }> = {
  service: { box: "fill-surface-2 stroke-line-strong", rx: 8 },
  control: { box: "fill-accent-soft stroke-accent", rx: 8 },
  store: { box: "fill-surface-2 stroke-accent-2", rx: 16 },
  queue: { box: "fill-surface-2 stroke-accent-2", rx: 8, dash: "6 3" },
  external: { box: "fill-surface stroke-subtle", rx: 8, dash: "4 4" },
  actor: { box: "fill-surface stroke-line-strong", rx: 29 },
};

const edgeStyle: Record<DiagramEdgeStyle, { line: string; dash?: string; head: string }> = {
  sync: { line: "stroke-subtle", head: "fill-subtle" },
  async: { line: "stroke-accent-2", dash: "6 4", head: "fill-accent-2" },
  failure: { line: "stroke-rose-500", dash: "3 3", head: "fill-rose-500" },
};

const kindText: Record<DiagramNodeKind, string> = {
  service: "service",
  control: "control point",
  store: "data store",
  queue: "queue or worker",
  external: "external system",
  actor: "input or output",
};

const legend: { label: string; style: DiagramEdgeStyle }[] = [
  { label: "Request / call", style: "sync" },
  { label: "Asynchronous", style: "async" },
  { label: "Failure path", style: "failure" },
];

/**
 * Accessible, theme-aware architecture diagram. The SVG has a title and
 * description; the same graph is also available as a text list.
 */
export default function Diagram({ spec }: { spec: DiagramSpec }) {
  const uid = useId().replace(/:/g, "");
  const { width, height } = viewBox(spec.nodes);
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const label = (id: string) => byId.get(id)?.label ?? id;
  const usedStyles = new Set(spec.edges.map((e) => e.style ?? "sync"));

  return (
    <figure className="rounded-xl border border-line bg-surface p-3 sm:p-5">
      <p className="mb-2 text-xs text-subtle md:hidden" aria-hidden="true">
        Scroll sideways to see the whole diagram, or open the text version below.
      </p>
      <div className="overflow-x-auto" tabIndex={0} aria-label={`${spec.title} (scrolls horizontally)`}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${uid}-t ${uid}-d`}
          className="h-auto w-full min-w-[680px]"
        >
          <title id={`${uid}-t`}>{spec.title}</title>
          <desc id={`${uid}-d`}>{spec.description}</desc>
          <defs>
            {(Object.keys(edgeStyle) as DiagramEdgeStyle[]).map((s) => (
              <marker
                key={s}
                id={`${uid}-arrow-${s}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10z" className={edgeStyle[s].head} />
              </marker>
            ))}
          </defs>

          {spec.groups?.map((g) => {
            const b = groupBox(g.nodes.flatMap((id) => (byId.has(id) ? [nodeBox(byId.get(id)!)] : [])));
            return (
              <g key={g.label}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} className="fill-none stroke-line-strong" strokeDasharray="5 5" />
                <text x={b.x + 12} y={b.y + 15} className="fill-subtle font-mono text-[11px] uppercase tracking-wider">
                  {g.label}
                </text>
              </g>
            );
          })}

          {spec.edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const s = edgeStyle[e.style ?? "sync"];
            const { start, end } = edgeLine(nodeBox(a), nodeBox(b));
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                className={s.line}
                strokeWidth={1.5}
                strokeDasharray={s.dash}
                markerEnd={`url(#${uid}-arrow-${e.style ?? "sync"})`}
              />
            );
          })}

          {spec.nodes.map((n) => {
            const b = nodeBox(n);
            const s = nodeStyle[n.kind ?? "service"];
            const cx = b.x + b.w / 2;
            return (
              <g key={n.id}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={s.rx} className={s.box} strokeWidth={1.5} strokeDasharray={s.dash} />
                <text x={cx} y={n.sub ? b.y + 25 : b.y + b.h / 2 + 5} textAnchor="middle" className="fill-fg text-[13px] font-medium">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={cx} y={b.y + 42} textAnchor="middle" className="fill-subtle text-[11px]">
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}

          {/* Edge labels last so they sit above lines */}
          {spec.edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b || !e.label) return null;
            const { mid } = edgeLine(nodeBox(a), nodeBox(b));
            const w = edgeLabelWidth(e.label);
            return (
              <g key={`${e.from}-${e.to}-label`}>
                <rect x={mid.x - w / 2} y={mid.y - 9} width={w} height={18} rx={4} className="fill-surface" />
                <text x={mid.x} y={mid.y + 4} textAnchor="middle" className="fill-muted text-[11px]">
                  {e.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
          {legend
            .filter((l) => usedStyles.has(l.style))
            .map((l) => (
              <li key={l.style} className="flex items-center gap-2">
                <svg width="28" height="8" aria-hidden="true">
                  <line x1="0" y1="4" x2="28" y2="4" className={edgeStyle[l.style].line} strokeWidth={1.5} strokeDasharray={edgeStyle[l.style].dash} />
                </svg>
                {l.label}
              </li>
            ))}
        </ul>
        <span>Illustrative</span>
      </figcaption>

      <details className="mt-4 rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm print:hidden">
        <summary className="font-medium text-fg">Diagram as text</summary>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-medium text-fg">Components</p>
            <ul className="mt-2 space-y-1.5 text-muted">
              {spec.nodes.map((n) => (
                <li key={n.id}>
                  <span className="text-fg">{n.label}</span> ({kindText[n.kind ?? "service"]}){n.sub && `: ${n.sub}`}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-fg">Connections</p>
            <ul className="mt-2 space-y-1.5 text-muted">
              {spec.edges.map((e) => (
                <li key={`${e.from}-${e.to}`}>
                  {label(e.from)} → {label(e.to)}
                  {(e.label || e.style === "async" || e.style === "failure") &&
                    ` (${[e.style === "async" && "asynchronous", e.style === "failure" && "failure path", e.label]
                      .filter(Boolean)
                      .join(", ")})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </figure>
  );
}
