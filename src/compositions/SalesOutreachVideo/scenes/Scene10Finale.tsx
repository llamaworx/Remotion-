import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Animated voice wave - mobile optimized
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
        gap: 4,
        height: 60,
      }}
    >
      {Array.from({ length: 16 }).map((_, i) => {
        // Create flowing wave pattern
        const baseHeight = 8;
        const waveHeight = Math.sin(waveProgress * 0.12 + i * 0.4) * 18 + 22;
        const secondWave = Math.sin(waveProgress * 0.08 + i * 0.3) * 10;
        const height = waveProgress > 0 ? baseHeight + waveHeight + secondWave : baseHeight;

        // Gradient color based on position
        const hue = interpolate(i, [0, 15], [270, 190]); // Purple to cyan

        return (
          <div
            key={i}
            style={{
              width: 5,
              height: Math.max(6, height),
              backgroundColor: `hsl(${hue}, 80%, 60%)`,
              borderRadius: 3,
              boxShadow: `0 0 10px hsla(${hue}, 80%, 60%, 0.5)`,
            }}
          />
        );
      })}
    </div>
  );
};

// Particle effect - mobile optimized
const Particle: React.FC<{
  index: number;
  frame: number;
  delay: number;
}> = ({ index, frame, delay }) => {
  const particleFrame = frame - delay;
  if (particleFrame < 0) return null;

  const angle = (index / 16) * Math.PI * 2;
  const radius = 100 + particleFrame * 1.5;
  const x = Math.cos(angle + particleFrame * 0.02) * radius;
  const y = Math.sin(angle + particleFrame * 0.02) * radius;
  const opacity = interpolate(particleFrame, [0, 100], [0.8, 0], { extrapolateRight: "clamp" });
  const size = 3 + Math.sin(particleFrame * 0.1 + index) * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: index % 2 === 0 ? "#8B5CF6" : "#06B6D4",
        transform: `translate(${x}px, ${y}px)`,
        opacity,
        boxShadow: `0 0 8px ${index % 2 === 0 ? "#8B5CF6" : "#06B6D4"}`,
      }}
    />
  );
};

// Bolka Logo SVG - mobile optimized
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
          0 0 ${40 * glow}px rgba(139, 92, 246, 0.6),
          0 0 ${80 * glow}px rgba(6, 182, 212, 0.4),
          0 20px 60px rgba(0, 0, 0, 0.4)
        `,
      }}
    >
      {/* Mic icon inside logo */}
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="white">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Ring animation - mobile optimized
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
  const opacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.6, 0.2]);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid",
        borderImage: "linear-gradient(135deg, #8B5CF6, #06B6D4) 1",
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
};

export const Scene10Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entry animation
  const logoEntry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Text animations
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

  // Final fade/zoom for dramatic ending
  const finalZoom = interpolate(
    frame,
    [180, 210],
    [1, 1.05],
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
            radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 60%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Particle effects */}
      {Array.from({ length: 16 }).map((_, i) => (
        <Particle key={i} index={i} frame={frame} delay={50 + i * 3} />
      ))}

      {/* Animated rings */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedRing delay={20} frame={frame} fps={fps} size={200} />
        <AnimatedRing delay={40} frame={frame} fps={fps} size={280} />
        <AnimatedRing delay={60} frame={frame} fps={fps} size={360} />
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
          padding: "50px 30px",
          gap: 24,
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
          <BolkaLogo size={120} frame={frame} />
        </div>

        {/* Bolka.ai text */}
        <div
          style={{
            opacity: interpolate(bolkaTextSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(bolkaTextSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #8B5CF6 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 60px rgba(139, 92, 246, 0.5)",
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
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [15, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
              fontWeight: 600,
              color: "#F8FAFC",
              letterSpacing: "0.08em",
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
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#1E293B50",
              border: "1px solid #334155",
              borderRadius: 30,
              padding: "12px 24px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="2" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#06B6D4" strokeWidth="2" />
            </svg>
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 18,
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
            bottom: 60,
            opacity: interpolate(
              spring({ frame: frame - 120, fps, config: { damping: 14 } }),
              [0, 1],
              [0, 0.7]
            ),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 14,
              fontWeight: 500,
              color: "#64748B",
            }}
          >
            Sales without calling.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
