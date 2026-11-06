"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import type { AnalyticsEvent } from "@/lib/analytics";

/** Sends one custom event when a page mounts (e.g. a case study or the recruiter page) */
export default function TrackView({ event, properties }: { event: AnalyticsEvent; properties?: Record<string, string> }) {
  const key = JSON.stringify(properties ?? {});
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
