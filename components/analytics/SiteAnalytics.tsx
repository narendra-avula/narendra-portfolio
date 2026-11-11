"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";
import { eventForLink } from "@/lib/analytics";

/**
 * Page views (cookieless) plus click events for resume, GitHub and LinkedIn
 * links, via one delegated listener. The Vercel script only exists on Vercel
 * deployments, so it is not loaded elsewhere (avoids a 404 in local builds).
 */
export default function SiteAnalytics({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const event = eventForLink(link.getAttribute("href")!);
      if (event) track(event, { page: pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled, pathname]);

  return enabled ? <Analytics /> : null;
}
