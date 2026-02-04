import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Animated voice wave for mobile
const VoiceWave: React.FC<{
  frame: number;
  delay: number;
}> = ({ frame, delay }) => {
  const waveProgress = Math.max(0, frame - delay);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 80,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const baseHeight = 12;
        const waveHeight = Math.sin(waveProgress * 0.12 + i * 0.4) * 25 + 30;
        const height = waveProgress > 0 ? baseHeight + waveHeight : baseHeight;
        const hue = interpolate(i, [0, 11], [270, 190]);

        return (
          <div
            key={i}
            style={{
              width: 8,
              height: Math.max(10, height),
              backgroundColor: `hsl(${hue}, 80%, 60%)`,
              borderRadius: 4,
              boxShadow: `0 0 15px hsla(${hue}, 80%, 60%, 0.5)`,
            }}
          />
        );
      })}
    </div>
  );
};

// Large Bolka Logo for mobile
const BolkaLogo: React.FC<{
  size: number;
  frame: number;
}> = ({ size, frame }) => {
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const glow = Math.sin(frame * 0.06) * 0.3 + 0.7;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${pulse})`,
        boxShadow: `
          0 0 ${60 * glow}px rgba(139, 92, 246, 0.6),
          0 0 ${120 * glow}px rgba(6, 182, 212, 0.4),
          0 30px 80px rgba(0, 0, 0, 0.4)
        `,
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="white">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Ring animation
const AnimatedRing: React.FC<{
  delay: number;
  frame: number;
  fps: number;
  size: number;
}> = ({ delay, frame, fps, size }) => {
  const ringProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 30, stiffness: 40 },
  });

  if (ringProgress <= 0) return null;

  const scale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const opacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.5, 0.15]);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "3px solid #8B5CF6",
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
};

export const Scene10Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEntry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const bolkaTextSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14 },
  });

  const taglineSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  const waveSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14 },
  });

  const finalZoom = interpolate(
    frame,
    [180, 210],
    [1, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Deep gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 60%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated rings */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedRing delay={20} frame={frame} fps={fps} size={280} />
        <AnimatedRing delay={40} frame={frame} fps={fps} size={400} />
        <AnimatedRing delay={60} frame={frame} fps={fps} size={520} />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 50px",
          gap: 32,
          transform: `scale(${finalZoom})`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: interpolate(logoEntry, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoEntry, [0, 1], [0.5, 1])})`,
          }}
        >
          <BolkaLogo size={180} frame={frame} />
        </div>

        {/* Bolka.ai text */}
        <div
          style={{
            opacity: interpolate(bolkaTextSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(bolkaTextSpring, [0, 1], [25, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #8B5CF6 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bolka.ai
          </span>
        </div>

        {/* Voice wave */}
        <div
          style={{
            opacity: interpolate(waveSpring, [0, 1], [0, 1]),
            transform: `scaleX(${interpolate(waveSpring, [0, 1], [0.5, 1])})`,
          }}
        >
          <VoiceWave frame={frame} delay={90} />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(taglineSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 36,
              fontWeight: 600,
              color: "#F8FAFC",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Voice AI Anywhere
          </span>
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 100, fps, config: { damping: 14 } }),
              [0, 1],
              [0, 1]
            ),
            marginTop: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: "#1E293B80",
              border: "2px solid #334155",
              borderRadius: 40,
              padding: "18px 36px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="2" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#06B6D4" strokeWidth="2" />
            </svg>
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 24,
                fontWeight: 500,
                color: "#94A3B8",
              }}
            >
              www.bolka.ai
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            opacity: interpolate(
              spring({ frame: frame - 120, fps, config: { damping: 14 } }),
              [0, 1],
              [0, 0.6]
            ),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 18,
              fontWeight: 500,
              color: "#64748B",
            }}
          >
            Sales without cold calling.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
