export type ContributionDay = {
  date: string;
  level: number; // 0–4, GitHub's intensity bucket
  label: string; // e.g. "3 contributions on March 4th."
};

export type Contributions = {
  total: number;
  weeks: (ContributionDay | null)[][]; // columns of 7 (Sun–Sat)
};

/**
 * Reads the public contribution calendar from GitHub's profile page.
 * Cached for a day; returns null if GitHub is unreachable or the markup
 * changes, so the page can simply hide the graph.
 */
export async function getContributions(username: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "User-Agent": "portfolio-site" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return parseContributions(await res.text());
  } catch {
    return null;
  }
}

/** Parses GitHub's contributions calendar markup. Exported for tests. */
export function parseContributions(html: string): Contributions | null {
  const labels = new Map<string, string>();
  for (const m of html.matchAll(/<tool-tip[^>]*for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    labels.set(m[1], m[2].trim());
  }

  const weeks: (ContributionDay | null)[][] = [];
  const cell =
    /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-(\d+)-(\d+))"[^>]*data-level="(\d)"/g;
  for (const m of html.matchAll(cell)) {
    const [, date, id, row, col, level] = m;
    const c = Number(col);
    const r = Number(row);
    weeks[c] ??= Array(7).fill(null);
    weeks[c][r] = { date, level: Number(level), label: labels.get(id) ?? date };
  }

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

  if (weeks.length === 0) return null;
  return { total, weeks: weeks.map((w) => w ?? Array(7).fill(null)) };
}
