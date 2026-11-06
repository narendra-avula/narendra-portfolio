/**
 * Canonical site URL. narendraavula.com is not connected yet, so the Vercel
 * URL is the default. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain works.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://narendra-portfolio-woad.vercel.app"
).replace(/\/$/, "");

export type NavItem = {
  label: string;
  href: string;
  /** Hidden until the route exists, so the nav never links to a 404 */
  enabled: boolean;
  /** Homepage section that also marks this item active */
  section?: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/#top", enabled: true },
  { label: "About", href: "/#about", enabled: true },
  { label: "Experience", href: "/#experience", enabled: true },
  { label: "Projects", href: "/projects", enabled: true, section: "projects" },
  { label: "Architecture", href: "/architecture", enabled: true },
  { label: "Insights", href: "/insights", enabled: true, section: "insights" },
  { label: "Contact", href: "/#contact", enabled: true },
];
