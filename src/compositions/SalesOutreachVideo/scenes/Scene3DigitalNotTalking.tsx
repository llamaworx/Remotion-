import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Ad Card
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
      }}
    >
      <div
        style={{
          width: 280,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
        }}
      >
        {/* Ad header */}
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
            }}
          />
          <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
            Sponsored Ad
          </span>
        </div>

        {/* Ad content */}
        <div style={{ padding: 16 }}>
          <div
            style={{
              width: "100%",
              height: 100,
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
          <div style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 600, color: "#F8FAFC", marginBottom: 8 }}>
            Limited Time Offer!
          </div>
          <div
            style={{
              backgroundColor: "#3B82F6",
              padding: "10px 16px",
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

// Arrow connector
const FlowArrow: React.FC<{
  delay: number;
  frame: number;
}> = ({ delay, frame }) => {
  const progress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        opacity: progress,
      }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40">
        <defs>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path
          d="M 10 20 L 50 20"
          stroke="url(#arrowGrad)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={40}
          strokeDashoffset={40 * (1 - progress)}
          strokeLinecap="round"
        />
        <path
          d="M 45 12 L 60 20 L 45 28"
          stroke="#3B82F6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={progress}
        />
      </svg>
    </div>
  );
};

// Landing Page with Form
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

  const formFields = ["Full Name", "Email Address", "Phone Number", "Company", "Job Title", "Message"];

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
      }}
    >
      <div
        style={{
          width: 320,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
        }}
      >
        {/* Browser bar */}
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

        {/* Form */}
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 700, color: "#F8FAFC", marginBottom: 16 }}>
            Contact Us
          </div>

          {formFields.map((field, i) => {
            const fieldDelay = delay + 20 + i * 10;
            const fieldOpacity = interpolate(frame - fieldDelay, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={field}
                style={{
                  marginBottom: 10,
                  opacity: fieldOpacity,
                }}
              >
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

// Bouncing User
const BouncingUser: React.FC<{
  delay: number;
  frame: number;
  fps: number;
  startX: number;
  startY: number;
}> = ({ delay, frame, fps, startX, startY }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 90) return null;

  const progress = localFrame / 90;

  // Bounce away animation
  const x = interpolate(progress, [0, 1], [startX, startX + 300]);
  const y = interpolate(progress, [0, 0.3, 1], [startY, startY - 50, startY + 200]);
  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotation = interpolate(progress, [0, 1], [0, 45]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#EF444420",
          padding: "8px 16px",
          borderRadius: 20,
          border: "1px solid #EF4444",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#EF4444" strokeWidth="2" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: "system-ui", fontSize: 14, fontWeight: 600, color: "#EF4444" }}>
          Bounced
        </span>
      </div>
    </div>
  );
};

// Bounce Rate Indicator
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
        position: "absolute",
        right: 100,
        top: 120,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #EF444440",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#64748B", marginBottom: 8 }}>
          Bounce Rate
        </div>
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 56,
            fontWeight: 800,
            color: "#EF4444",
          }}
        >
          {Math.floor(rate)}%
        </div>
        <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#EF4444", marginTop: 4 }}>
          Users leave without engaging
        </div>
      </div>
    </div>
  );
};

export const Scene3DigitalNotTalking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text animation
  const textSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 14 },
  });

  // Bouncing users
  const bouncingUsers = [
    { delay: 100, startX: 800, startY: 300 },
    { delay: 120, startX: 850, startY: 400 },
    { delay: 140, startX: 780, startY: 500 },
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
            radial-gradient(circle at 20% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(239, 68, 68, 0.06) 0%, transparent 40%)
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

      {/* Flow: Ad → Arrow → Landing Page */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 100,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <AdCard delay={10} frame={frame} fps={fps} />
        <FlowArrow delay={40} frame={frame} />
        <LandingPage delay={60} frame={frame} fps={fps} />
      </div>

      {/* Bouncing users */}
      {bouncingUsers.map((user, i) => (
        <BouncingUser
          key={i}
          delay={user.delay}
          frame={frame}
          fps={fps}
          startX={user.startX}
          startY={user.startY}
        />
      ))}

      {/* Bounce rate indicator */}
      <BounceRate frame={frame} fps={fps} delay={80} />

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
          Ads talk.{" "}
          <span style={{ color: "#EF4444" }}>Websites don't.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
