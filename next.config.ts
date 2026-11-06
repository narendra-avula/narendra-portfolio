import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {};

// Articles are imported from content/insights/*.mdx rather than routed as pages,
// so pageExtensions stays at its default. No remark/rehype plugins: heading ids
// come from components/insights/mdx.tsx, which keeps the config Turbopack-safe.
const withMDX = createMDX({});

export default withMDX(nextConfig);
