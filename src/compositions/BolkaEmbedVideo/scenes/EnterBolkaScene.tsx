import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Mic Icon with glow - MUCH LARGER
const BolkaMicIcon: React.FC<{ glowIntensity: number }> = ({ glowIntensity }) => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
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
  const height = 4 + Math.random() * 10;

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

  // Glitch effect timing (first 15 frames - quicker)
  const isGlitching = frame < 15;
  const glitchIntensity = isGlitching ? interpolate(frame, [0, 8, 15], [1, 0.8, 0]) : 0;

  // Screen distortion during glitch
  const skewX = isGlitching ? Math.sin(frame * 2) * 3 * glitchIntensity : 0;
  const translateX = isGlitching ? Math.sin(frame * 5) * 10 * glitchIntensity : 0;

  // Website refresh/clean appearance
  const cleanOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bolka icon entrance (earlier and with zoom)
  const iconSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const iconScale = interpolate(iconSpring, [0, 1], [0, 1]);
  const iconOpacity = frame >= 30 ? 1 : 0;

  // Glow pulse animation
  const glowPulse = Math.sin(frame * 0.2) * 0.5 + 0.5;

  // Text overlay fade with ZOOM effect on "Bolka Embed"
  const textOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Zoom effect on product name
  const productZoom = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const productScale = interpolate(productZoom, [0, 1], [0.8, 1]);

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
          <GlitchLine top={35} delay={4} frame={frame} />
          <GlitchLine top={55} delay={6} frame={frame} />
          <GlitchLine top={75} delay={3} frame={frame} />
          <GlitchLine top={88} delay={8} frame={frame} />
        </>
      )}

      {/* Refreshed Website Browser - MUCH LARGER */}
      <div
        style={{
          width: 950,
          height: 620,
          backgroundColor: "#1E293B",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 120px rgba(139, 92, 246, 0.15)",
          position: "relative",
          opacity: cleanOpacity,
        }}
      >
        {/* Browser Chrome - cleaner */}
        <div
          style={{
            height: 55,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            gap: 12,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 30,
              flex: 1,
              height: 34,
              backgroundColor: "#1E293B",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              paddingLeft: 18,
              color: "#94A3B8",
              fontSize: 18,
              fontFamily: "system-ui",
            }}
          >
            <span style={{ color: "#10B981", marginRight: 8 }}>🔒</span>
            www.your-website.com
          </div>
        </div>

        {/* Cleaner Website Content */}
        <div style={{ padding: 40, position: "relative", height: "calc(100% - 55px)" }}>
          {/* Modern nav */}
          <div style={{ display: "flex", gap: 35, marginBottom: 40, alignItems: "center" }}>
            <div
              style={{
                width: 130,
                height: 40,
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                borderRadius: 10,
              }}
            />
            <div style={{ width: 85, height: 26, backgroundColor: "#475569", borderRadius: 6 }} />
            <div style={{ width: 95, height: 26, backgroundColor: "#475569", borderRadius: 6 }} />
            <div style={{ width: 80, height: 26, backgroundColor: "#475569", borderRadius: 6 }} />
          </div>

          {/* Hero section placeholder */}
          <div style={{ width: "75%", height: 50, backgroundColor: "#475569", borderRadius: 12, marginBottom: 18 }} />
          <div style={{ width: "55%", height: 32, backgroundColor: "#334155", borderRadius: 10, marginBottom: 45 }} />

          {/* Product cards */}
          <div style={{ display: "flex", gap: 30 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 250,
                  height: 195,
                  backgroundColor: "#334155",
                  borderRadius: 18,
                  border: "1px solid #475569",
                  padding: 22,
                }}
              >
                <div style={{ width: "100%", height: 105, backgroundColor: "#475569", borderRadius: 14, marginBottom: 15 }} />
                <div style={{ width: "80%", height: 20, backgroundColor: "#475569", borderRadius: 6, marginBottom: 10 }} />
                <div style={{ width: "60%", height: 16, backgroundColor: "#3B4557", borderRadius: 6 }} />
              </div>
            ))}
          </div>

          {/* Bolka Widget Icon - Bottom Right - MUCH LARGER */}
          <div
            style={{
              position: "absolute",
              bottom: 35,
              right: 35,
              opacity: iconOpacity,
              transform: `scale(${iconScale})`,
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 8px 35px rgba(139, 92, 246, 0.55), 0 0 ${50 + glowPulse * 35}px rgba(139, 92, 246, ${0.45 + glowPulse * 0.4})`,
              }}
            >
              <BolkaMicIcon glowIntensity={glowPulse} />
            </div>
          </div>
        </div>
      </div>

      {/* "Meet Bolka Embed" text - MUCH BIGGER with ZOOM */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 85,
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
              display: "inline-block",
              transform: `scale(${productScale})`,
              textShadow: "0 0 60px rgba(139, 92, 246, 0.6)",
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
