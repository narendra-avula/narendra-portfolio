/** Heading text to a URL fragment: "Pattern 1: a key" -> "pattern-1-a-key" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
