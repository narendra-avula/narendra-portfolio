import { ImageResponse } from "next/og";

export const alt = "Narendra Avula — Software Engineer · Cloud · AI";
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
          background: "#09090b",
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
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>narendraavula.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>Narendra Avula</div>
          <div style={{ marginTop: 16, fontSize: 40, color: "#c4b5fd" }}>
            Software Engineer · Cloud · AI
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#d4d4d8" }}>
          {["11+ years", "Python · Django", "Resiliency Engineering", "GenAI & RAG"].map((t) => (
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
