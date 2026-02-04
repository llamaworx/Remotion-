import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Privacy Law Card
const LawCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  color: string;
}> = ({ title, subtitle, icon, x, y, delay, frame, fps, color }) => {
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
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${entrySpring * pulse})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          width: 280,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 20,
          border: `2px solid ${color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 30px ${color}20`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: `${color}20`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
          <div>
            <div
              style={{
                fontFamily: "system-ui",
                fontSize: 22,
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
    </div>
  );
};

// Warning Badge
const WarningBadge: React.FC<{
  text: string;
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, x, y, delay, frame, fps }) => {
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
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${entrySpring}) translateX(${shake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          backgroundColor: "#FEF3C7",
          border: "2px solid #F59E0B",
          borderRadius: 8,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 14,
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
  y: number;
}> = ({ delay, frame, fps, y }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14 },
  });

  if (entrySpring <= 0) return null;

  const phoneNumber = `+91 ${Math.floor(Math.random() * 90000 + 10000)} ${Math.floor(Math.random() * 90000 + 10000)}`;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [50, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 0",
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
      <span style={{ fontFamily: "monospace", fontSize: 16, color: "#94A3B8" }}>
        {phoneNumber}
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: "system-ui",
          fontSize: 12,
          color: "#EF4444",
          backgroundColor: "#EF444420",
          padding: "4px 8px",
          borderRadius: 4,
        }}
      >
        DND
      </span>
    </div>
  );
};

// Shield icon
const ShieldIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Document icon
const DocumentIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Lock icon
const LockIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Scene2Compliance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text animation
  const textSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 14 },
  });

  // Privacy laws data
  const laws = [
    { title: "DPDP Act", subtitle: "India 2023", icon: <ShieldIcon color="#8B5CF6" />, x: 100, y: 120, delay: 10, color: "#8B5CF6" },
    { title: "GDPR", subtitle: "European Union", icon: <DocumentIcon color="#3B82F6" />, x: 420, y: 180, delay: 25, color: "#3B82F6" },
    { title: "TCPA", subtitle: "United States", icon: <LockIcon color="#06B6D4" />, x: 740, y: 140, delay: 40, color: "#06B6D4" },
  ];

  // Warning badges
  const warnings = [
    { text: "Consent Required", x: 150, y: 320, delay: 55 },
    { text: "Heavy Fines", x: 450, y: 350, delay: 70 },
    { text: "Legal Risk", x: 750, y: 310, delay: 85 },
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
            radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
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
          backgroundSize: "60px 60px",
        }}
      />

      {/* Law cards */}
      {laws.map((law, i) => (
        <LawCard
          key={i}
          title={law.title}
          subtitle={law.subtitle}
          icon={law.icon}
          x={law.x}
          y={law.y}
          delay={law.delay}
          frame={frame}
          fps={fps}
          color={law.color}
        />
      ))}

      {/* Warning badges */}
      {warnings.map((warning, i) => (
        <WarningBadge
          key={i}
          text={warning.text}
          x={warning.x}
          y={warning.y}
          delay={warning.delay}
          frame={frame}
          fps={fps}
        />
      ))}

      {/* Blocked list panel */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 320,
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
              marginBottom: 16,
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

          {/* Blocked numbers */}
          {[0, 1, 2, 3, 4].map((i) => (
            <BlockedItem key={i} delay={80 + i * 15} frame={frame} fps={fps} y={i * 50} />
          ))}

          <div
            style={{
              marginTop: 16,
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
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 72,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
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
    </AbsoluteFill>
  );
};
