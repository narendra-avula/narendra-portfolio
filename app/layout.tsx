import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Narendra Avula | Software Engineer · Cloud · AI",
  description:
    "Personal portfolio of Narendra Avula — Software Engineer with 11+ years of experience in Python, Django, cloud, resiliency engineering, and AI/GenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}