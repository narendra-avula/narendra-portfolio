import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${profile.name} | ${profile.positioning}`;
const description = `${profile.name} is a software engineer with ${profile.yearsExperience}+ years of experience in Python and Django backends, cloud and resiliency engineering at ${profile.employer}, and AI/GenAI developer tooling.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d14" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
  ],
};

// Dark by default; a saved choice from the toggle wins. Runs before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </MotionProvider>
        <SiteAnalytics enabled={process.env.VERCEL === "1"} />
      </body>
    </html>
  );
}
