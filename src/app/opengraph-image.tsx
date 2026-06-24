import { ImageResponse } from "next/og";

export const alt =
  "Anders Ljungstedt — Applied AI Engineer for proptech · zavian.ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #ffffff 0%, #f1f5f9 55%, #e8f0fe 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#2563EB",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -1,
              boxShadow: "0 12px 32px rgba(37, 99, 235, 0.35)",
            }}
          >
            AI
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#2563EB" }}>
            zavian.ai
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 58,
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.12,
            letterSpacing: -1.5,
            maxWidth: 920,
          }}
        >
          <div style={{ display: "flex" }}>
            Real estate AI that ships in production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#64748b",
            lineHeight: 1.4,
          }}
        >
          Luxury listings · vacation-rental portals · Florida permit intelligence
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 22,
            color: "#334155",
            fontWeight: 500,
          }}
        >
          Anders Ljungstedt · Applied AI Engineer · Oslo
        </div>
      </div>
    ),
    { ...size },
  );
}
