import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Ad Card - mobile optimized
const AdCard: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
            Sponsored Ad
          </span>
        </div>

        <div style={{ padding: 16 }}>
          <div
            style={{
              width: "100%",
              height: 80,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 24, fontWeight: 700, color: "white" }}>
              50% OFF
            </span>
          </div>
          <div style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 600, color: "#F8FAFC", marginBottom: 10 }}>
            Limited Time Offer!
          </div>
          <div
            style={{
              backgroundColor: "#3B82F6",
              padding: "12px 16px",
              borderRadius: 8,
              textAlign: "center",
              fontFamily: "system-ui",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
            }}
          >
            Learn More →
          </div>
        </div>
      </div>
    </div>
  );
};

// Down Arrow
const DownArrow: React.FC<{
  delay: number;
  frame: number;
}> = ({ delay, frame }) => {
  const progress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px 0", opacity: progress }}>
      <svg width="40" height="50" viewBox="0 0 40 50">
        <defs>
          <linearGradient id="arrowGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M 20 5 L 20 35" stroke="url(#arrowGradV)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 12 28 L 20 40 L 28 28" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// Landing Page with Form - mobile optimized
const LandingPage: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  const formFields = ["Full Name", "Email", "Phone", "Company", "Message"];

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1E293B",
              borderRadius: 4,
              padding: "4px 12px",
              fontFamily: "monospace",
              fontSize: 11,
              color: "#64748B",
            }}
          >
            example.com/contact
          </div>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 700, color: "#F8FAFC", marginBottom: 14 }}>
            Contact Us
          </div>

          {formFields.map((field, i) => {
            const fieldDelay = delay + 15 + i * 8;
            const fieldOpacity = interpolate(frame - fieldDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div key={field} style={{ marginBottom: 8, opacity: fieldOpacity }}>
                <div
                  style={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #334155",
                    borderRadius: 6,
                    padding: "10px 12px",
                    fontFamily: "system-ui",
                    fontSize: 13,
                    color: "#64748B",
                  }}
                >
                  {field}
                </div>
              </div>
            );
          })}

          <div
            style={{
              backgroundColor: "#475569",
              padding: "12px",
              borderRadius: 8,
              textAlign: "center",
              fontFamily: "system-ui",
              fontSize: 14,
              fontWeight: 600,
              color: "#94A3B8",
              marginTop: 8,
            }}
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

// Bouncing Users - mobile optimized
const BouncingUsers: React.FC<{
  delay: number;
  frame: number;
}> = ({ delay, frame }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const users = [0, 1, 2];

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
      {users.map((i) => {
        const userDelay = i * 20;
        const userFrame = localFrame - userDelay;
        if (userFrame < 0 || userFrame > 60) return null;

        const progress = userFrame / 60;
        const opacity = interpolate(progress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
        const y = interpolate(progress, [0, 0.3, 1], [0, -20, 60]);
        const rotation = interpolate(progress, [0, 1], [0, 30]);

        return (
          <div
            key={i}
            style={{
              transform: `translateY(${y}px) rotate(${rotation}deg)`,
              opacity,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#EF444420",
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid #EF4444",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#EF4444" strokeWidth="2" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "system-ui", fontSize: 13, fontWeight: 600, color: "#EF4444" }}>
                Bounced
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Bounce Rate Indicator - mobile optimized
const BounceRate: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const localFrame = frame - delay;
  const rate = interpolate(localFrame, [0, 60], [0, 87], { extrapolateRight: "clamp" });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 24,
          border: "2px solid #EF444440",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "system-ui", fontSize: 16, color: "#64748B", marginBottom: 8 }}>
          Bounce Rate
        </div>
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 72,
            fontWeight: 800,
            color: "#EF4444",
          }}
        >
          {Math.floor(rate)}%
        </div>
        <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#EF4444", marginTop: 4 }}>
          Users leave without engaging
        </div>
      </div>
    </div>
  );
};

export const Scene3DigitalNotTalking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - 180,
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
            radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 70%, rgba(239, 68, 68, 0.08) 0%, transparent 40%)
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
          gap: 10,
        }}
      >
        {/* Ad Card */}
        <AdCard delay={10} frame={frame} fps={fps} />

        {/* Arrow */}
        <DownArrow delay={35} frame={frame} />

        {/* Landing Page */}
        <LandingPage delay={50} frame={frame} fps={fps} />

        {/* Bouncing Users */}
        <div style={{ marginTop: 20 }}>
          <BouncingUsers delay={100} frame={frame} />
        </div>

        {/* Bounce Rate */}
        <div style={{ width: "100%", marginTop: 20 }}>
          <BounceRate frame={frame} fps={fps} delay={130} />
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
            Ads talk.{" "}
            <span style={{ color: "#EF4444" }}>Websites don't.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
