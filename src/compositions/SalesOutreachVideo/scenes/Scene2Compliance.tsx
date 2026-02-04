import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Large law card for mobile
const LawCard: React.FC<{
  title: string;
  region: string;
  penalty: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ title, region, penalty, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-50, 0])}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: 32,
          border: `3px solid ${color}`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 40px ${color}30`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
          {/* Shield icon */}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 18,
              backgroundColor: `${color}20`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                stroke={color}
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "system-ui",
                fontSize: 36,
                fontWeight: 800,
                color,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "system-ui",
                fontSize: 20,
                color: "#94A3B8",
              }}
            >
              {region}
            </div>
          </div>
        </div>

        {/* Penalty */}
        <div
          style={{
            backgroundColor: `${color}15`,
            borderRadius: 14,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
            <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
          </svg>
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 18,
              fontWeight: 600,
              color,
            }}
          >
            {penalty}
          </span>
        </div>
      </div>
    </div>
  );
};

// Warning banner
const WarningBanner: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const pulse = Math.sin((frame - delay) * 0.1) * 0.03 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#FEF3C7",
          borderRadius: 20,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          border: "3px solid #F59E0B",
          boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 26,
              fontWeight: 800,
              color: "#92400E",
              marginBottom: 4,
            }}
          >
            Consent Required
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 18,
              color: "#B45309",
            }}
          >
            Cold calls without consent = legal risk
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene2Compliance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14 },
  });

  const textSpring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(6, 182, 212, 0.08) 0%, transparent 30%)
          `,
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "80px 50px",
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 600,
              color: "#94A3B8",
            }}
          >
            Global Privacy Laws
          </span>
        </div>

        {/* Law cards */}
        <LawCard
          title="DPDP Act"
          region="India 2023"
          penalty="Fines up to ₹250 Crore"
          color="#8B5CF6"
          delay={15}
          frame={frame}
          fps={fps}
        />
        <LawCard
          title="GDPR"
          region="European Union"
          penalty="Fines up to €20 Million"
          color="#3B82F6"
          delay={35}
          frame={frame}
          fps={fps}
        />
        <LawCard
          title="TCPA"
          region="United States"
          penalty="$500-$1,500 per violation"
          color="#06B6D4"
          delay={55}
          frame={frame}
          fps={fps}
        />

        {/* Warning banner */}
        <WarningBanner delay={80} frame={frame} fps={fps} />

        {/* Main text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 52,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Privacy laws{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              changed
            </span>
            <br />
            everything.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
