import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Privacy Law Card - mobile optimized
const LawCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  delay: number;
  frame: number;
  fps: number;
  color: string;
}> = ({ title, subtitle, icon, delay, frame, fps, color }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = Math.sin((frame - delay) * 0.08) * 0.03 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        transform: `scale(${entrySpring * pulse})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 18,
          border: `2px solid ${color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 30px ${color}20`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: `${color}20`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 24,
              fontWeight: 700,
              color,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 14,
              color: "#64748B",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

// Warning Badge - mobile optimized
const WarningBadge: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const shake = Math.sin((frame - delay) * 0.4) * 2;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        transform: `scale(${entrySpring}) translateX(${shake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          backgroundColor: "#FEF3C7",
          border: "2px solid #F59E0B",
          borderRadius: 10,
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 16,
            fontWeight: 600,
            color: "#92400E",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// Blocked List Item
const BlockedItem: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14 },
  });

  if (entrySpring <= 0) return null;

  const phoneNumber = `+1 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [30, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#EF444420",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 15, color: "#94A3B8" }}>
        {phoneNumber}
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: "system-ui",
          fontSize: 12,
          color: "#EF4444",
          backgroundColor: "#EF444420",
          padding: "4px 10px",
          borderRadius: 4,
        }}
      >
        DND
      </span>
    </div>
  );
};

// Icons
const ShieldIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke={color} strokeWidth="2" fill="none" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocumentIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={color} strokeWidth="2" fill="none" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LockIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Scene2Compliance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14 },
  });

  const laws = [
    { title: "DPDP Act", subtitle: "India 2023", icon: <ShieldIcon color="#8B5CF6" />, delay: 10, color: "#8B5CF6" },
    { title: "GDPR", subtitle: "European Union", icon: <DocumentIcon color="#3B82F6" />, delay: 25, color: "#3B82F6" },
    { title: "TCPA", subtitle: "United States", icon: <LockIcon color="#06B6D4" />, delay: 40, color: "#06B6D4" },
  ];

  const warnings = [
    { text: "Consent Required", delay: 55 },
    { text: "Heavy Fines", delay: 70 },
    { text: "Legal Risk", delay: 85 },
  ];

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
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 30%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 40px",
        }}
      >
        {/* Law cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", marginBottom: 30 }}>
          {laws.map((law, i) => (
            <LawCard
              key={i}
              title={law.title}
              subtitle={law.subtitle}
              icon={law.icon}
              delay={law.delay}
              frame={frame}
              fps={fps}
              color={law.color}
            />
          ))}
        </div>

        {/* Warning badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 30 }}>
          {warnings.map((warning, i) => (
            <WarningBadge key={i} text={warning.text} delay={warning.delay} frame={frame} fps={fps} />
          ))}
        </div>

        {/* Blocked list panel */}
        <div
          style={{
            width: "100%",
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: "#1E293B",
              borderRadius: 16,
              padding: 20,
              border: "1px solid #334155",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                paddingBottom: 12,
                borderBottom: "1px solid #334155",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                <path d="M4.93 4.93l14.14 14.14" stroke="#EF4444" strokeWidth="2" />
              </svg>
              <span style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "#F8FAFC" }}>
                DND Blocked List
              </span>
            </div>

            {[0, 1, 2, 3].map((i) => (
              <BlockedItem key={i} delay={90 + i * 12} frame={frame} fps={fps} />
            ))}

            <div
              style={{
                marginTop: 14,
                textAlign: "center",
                fontFamily: "system-ui",
                fontSize: 14,
                color: "#64748B",
              }}
            >
              +2,847 more blocked
            </div>
          </div>
        </div>

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
              fontSize: 44,
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
              changed everything.
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
