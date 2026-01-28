import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Mic Icon with glow
const BolkaMicIcon: React.FC<{ glowIntensity: number }> = ({ glowIntensity }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation={2 + glowIntensity * 2} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="9" y="2" width="6" height="11" rx="3" fill="url(#micGradient)" filter="url(#glow)" />
    <path
      d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
      stroke="url(#micGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      filter="url(#glow)"
    />
    <path d="M12 18V22M8 22H16" stroke="url(#micGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
  </svg>
);

// Glitch line component
const GlitchLine: React.FC<{ top: number; delay: number; frame: number }> = ({ top, delay, frame }) => {
  const glitchFrame = frame - delay;
  if (glitchFrame < 0 || glitchFrame > 8) return null;

  const offset = Math.sin(glitchFrame * 3) * 30;
  const height = 2 + Math.random() * 6;

  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: 0,
        right: 0,
        height,
        backgroundColor: `rgba(${Math.random() > 0.5 ? "139, 92, 246" : "99, 102, 241"}, 0.8)`,
        transform: `translateX(${offset}px)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

export const EnterBolkaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glitch effect timing (first 20 frames)
  const isGlitching = frame < 20;
  const glitchIntensity = isGlitching ? interpolate(frame, [0, 10, 20], [1, 0.8, 0]) : 0;

  // Screen distortion during glitch
  const skewX = isGlitching ? Math.sin(frame * 2) * 3 * glitchIntensity : 0;
  const translateX = isGlitching ? Math.sin(frame * 5) * 10 * glitchIntensity : 0;

  // Website refresh/clean appearance
  const cleanOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bolka icon entrance
  const iconSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const iconScale = interpolate(iconSpring, [0, 1], [0, 1]);
  const iconOpacity = frame >= 35 ? 1 : 0;

  // Glow pulse animation
  const glowPulse = Math.sin(frame * 0.2) * 0.5 + 0.5;

  // Text overlay fade
  const textOpacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // RGB split effect during glitch
  const rgbOffset = isGlitching ? 4 * glitchIntensity : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        transform: `skewX(${skewX}deg) translateX(${translateX}px)`,
      }}
    >
      {/* Glitch lines */}
      {isGlitching && (
        <>
          <GlitchLine top={15} delay={2} frame={frame} />
          <GlitchLine top={35} delay={5} frame={frame} />
          <GlitchLine top={55} delay={8} frame={frame} />
          <GlitchLine top={75} delay={3} frame={frame} />
          <GlitchLine top={88} delay={10} frame={frame} />
        </>
      )}

      {/* Refreshed Website Browser */}
      <div
        style={{
          width: 850,
          height: 550,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 100px rgba(139, 92, 246, 0.1)",
          position: "relative",
          opacity: cleanOpacity,
        }}
      >
        {/* Browser Chrome - cleaner */}
        <div
          style={{
            height: 40,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 20,
              flex: 1,
              height: 24,
              backgroundColor: "#1E293B",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              color: "#94A3B8",
              fontSize: 12,
              fontFamily: "system-ui",
            }}
          >
            <span style={{ color: "#10B981", marginRight: 4 }}>🔒</span>
            www.your-website.com
          </div>
        </div>

        {/* Cleaner Website Content */}
        <div style={{ padding: 30, position: "relative", height: "calc(100% - 40px)" }}>
          {/* Modern nav */}
          <div style={{ display: "flex", gap: 25, marginBottom: 30, alignItems: "center" }}>
            <div
              style={{
                width: 100,
                height: 28,
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                borderRadius: 6,
              }}
            />
            <div style={{ width: 60, height: 18, backgroundColor: "#475569", borderRadius: 4 }} />
            <div style={{ width: 70, height: 18, backgroundColor: "#475569", borderRadius: 4 }} />
            <div style={{ width: 55, height: 18, backgroundColor: "#475569", borderRadius: 4 }} />
          </div>

          {/* Hero section placeholder */}
          <div style={{ width: "75%", height: 36, backgroundColor: "#475569", borderRadius: 8, marginBottom: 12 }} />
          <div style={{ width: "55%", height: 22, backgroundColor: "#334155", borderRadius: 6, marginBottom: 35 }} />

          {/* Product cards */}
          <div style={{ display: "flex", gap: 20 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 200,
                  height: 160,
                  backgroundColor: "#334155",
                  borderRadius: 12,
                  border: "1px solid #475569",
                  padding: 15,
                }}
              >
                <div style={{ width: "100%", height: 80, backgroundColor: "#475569", borderRadius: 8, marginBottom: 10 }} />
                <div style={{ width: "80%", height: 14, backgroundColor: "#475569", borderRadius: 4, marginBottom: 6 }} />
                <div style={{ width: "60%", height: 12, backgroundColor: "#3B4557", borderRadius: 4 }} />
              </div>
            ))}
          </div>

          {/* Bolka Widget Icon - Bottom Right */}
          <div
            style={{
              position: "absolute",
              bottom: 25,
              right: 25,
              opacity: iconOpacity,
              transform: `scale(${iconScale})`,
            }}
          >
            <div
              style={{
                width: 65,
                height: 65,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 4px 20px rgba(139, 92, 246, 0.4), 0 0 ${30 + glowPulse * 20}px rgba(139, 92, 246, ${0.3 + glowPulse * 0.3})`,
              }}
            >
              <BolkaMicIcon glowIntensity={glowPulse} />
            </div>
          </div>
        </div>
      </div>

      {/* "Meet Bolka Embed" text */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 48,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          Meet{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bolka Embed
          </span>
        </span>
      </div>

      {/* RGB split overlay during glitch */}
      {isGlitching && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, rgba(255,0,0,${0.1 * glitchIntensity}) 0%, transparent 33%, rgba(0,255,0,${0.1 * glitchIntensity}) 66%, rgba(0,0,255,${0.1 * glitchIntensity}) 100%)`,
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
