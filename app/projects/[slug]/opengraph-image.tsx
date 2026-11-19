import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0d14",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(124,58,237,0.45), transparent 45%), radial-gradient(circle at 10% 95%, rgba(37,99,235,0.45), transparent 45%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>{new URL(SITE_URL).host}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#9db8ff" }}>{project.category}</div>
          <div style={{ marginTop: 18, fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>{project.title}</div>
          <div style={{ marginTop: 20, fontSize: 28, color: "#d4d4d8" }}>{project.summary}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#d4d4d8" }}>
          <div style={{ padding: "10px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)" }}>
            Project case study
          </div>
        </div>
      </div>
    ),
    size,
  );
}
