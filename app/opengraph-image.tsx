import { ImageResponse } from "next/og";
import { profile, yearsLabel } from "@/content/profile";
import { SITE_URL } from "@/lib/site";

export const alt = `${profile.name} — ${profile.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            NA
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>{new URL(SITE_URL).host}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{profile.name}</div>
          <div style={{ marginTop: 16, fontSize: 34, color: "#9db8ff" }}>
            {profile.positioning}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#d4d4d8" }}>
          {[`${yearsLabel} years`, profile.designation, profile.employer, "AWS Certified"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
