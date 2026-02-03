import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Clickable link mockup for Bolka Share
const BolkaShareLink: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const hoverPulse = Math.sin(frame * 0.1) * 0.02 + 1;
  const linkGlow = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Link card */}
      <div
        style={{
          width: 500,
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: 24,
          padding: 40,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 ${40 * linkGlow}px rgba(139, 92, 246, 0.2)`,
          border: "2px solid rgba(139, 92, 246, 0.3)",
          transform: `scale(${hoverPulse})`,
        }}
      >
        {/* Link icon */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 30px",
            boxShadow: `0 0 ${30 * linkGlow}px rgba(139, 92, 246, 0.5)`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Link URL */}
        <div
          style={{
            backgroundColor: "#0F172A",
            borderRadius: 12,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              color: "#8B5CF6",
              letterSpacing: "0.02em",
            }}
          >
            bolka.ai/share/demo
          </span>
        </div>

        {/* Click indicator */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#22C55E",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
            }}
          />
          <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
            Click to talk instantly
          </span>
        </div>
      </div>
    </div>
  );
};

// Website with mic button for Bolka Embed
const BolkaEmbedWebsite: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const micPulse = Math.sin(frame * 0.12) * 0.1 + 1;
  const micGlow = Math.sin(frame * 0.1) * 0.4 + 0.6;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Browser mockup */}
      <div
        style={{
          width: 500,
          height: 380,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "2px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        {/* Browser header */}
        <div
          style={{
            height: 40,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 16,
              height: 24,
              backgroundColor: "#1E293B",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
              yourwebsite.com
            </span>
          </div>
        </div>

        {/* Website content */}
        <div
          style={{
            padding: 24,
            position: "relative",
            height: "calc(100% - 40px)",
          }}
        >
          {/* Fake content */}
          <div style={{ width: "70%", height: 16, backgroundColor: "#334155", borderRadius: 4, marginBottom: 12 }} />
          <div style={{ width: "50%", height: 12, backgroundColor: "#2D3748", borderRadius: 3, marginBottom: 20 }} />
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 100, height: 60, backgroundColor: "#334155", borderRadius: 8 }} />
            <div style={{ width: 100, height: 60, backgroundColor: "#334155", borderRadius: 8 }} />
          </div>
          <div style={{ width: "80%", height: 10, backgroundColor: "#2D3748", borderRadius: 3, marginBottom: 8 }} />
          <div style={{ width: "60%", height: 10, backgroundColor: "#2D3748", borderRadius: 3 }} />

          {/* Bolka Embed mic button */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              width: 70,
              height: 70,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 8px 30px rgba(139, 92, 246, 0.5), 0 0 ${40 * micGlow}px rgba(139, 92, 246, 0.4)`,
              transform: `scale(${micPulse})`,
              cursor: "pointer",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
              <path
                d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene3TwoProducts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split screen animation
  const splitSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Left side entrance
  const leftSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  // Right side entrance
  const rightSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12 },
  });

  // Left label entrance
  const leftLabelSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14 },
  });

  // Right label entrance
  const rightLabelSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  // Center divider line
  const dividerHeight = interpolate(splitSpring, [0, 1], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Background gradients for each side */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 3,
          height: `${dividerHeight}%`,
          background: "linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
        }}
      />

      {/* Left side - Bolka Share */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(leftSpring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(leftSpring, [0, 1], [-80, 0])}px)`,
        }}
      >
        <BolkaShareLink frame={frame} fps={fps} />

        {/* Label */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            opacity: interpolate(leftLabelSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(leftLabelSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 42,
              fontWeight: 700,
              color: "#F8FAFC",
              marginBottom: 8,
            }}
          >
            Bolka Share
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 24,
              color: "#8B5CF6",
              fontWeight: 500,
            }}
          >
            Voice AI Links
          </div>
        </div>
      </div>

      {/* Right side - Bolka Embed */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(rightSpring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(rightSpring, [0, 1], [80, 0])}px)`,
        }}
      >
        <BolkaEmbedWebsite frame={frame} fps={fps} />

        {/* Label */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            opacity: interpolate(rightLabelSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(rightLabelSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 42,
              fontWeight: 700,
              color: "#F8FAFC",
              marginBottom: 8,
            }}
          >
            Bolka Embed
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 24,
              color: "#6366F1",
              fontWeight: 500,
            }}
          >
            Website Voice AI
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
