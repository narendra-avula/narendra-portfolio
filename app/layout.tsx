import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://narendraavula.com"),
  title: "Narendra Avula | Software Engineer · Cloud · AI",
  description:
    "Personal portfolio of Narendra Avula — Software Engineer with 11+ years of experience in Python, Django, cloud, resiliency engineering, and AI/GenAI.",
  openGraph: {
    type: "website",
    url: "https://narendraavula.com",
    siteName: "Narendra Avula",
    title: "Narendra Avula | Software Engineer · Cloud · AI",
    description:
      "Software Engineer with 11+ years of experience in Python, Django, cloud, resiliency engineering, and AI/GenAI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narendra Avula | Software Engineer · Cloud · AI",
    description:
      "Software Engineer with 11+ years of experience in Python, Django, cloud, resiliency engineering, and AI/GenAI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
