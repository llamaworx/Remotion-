import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon for voice mode
const MicIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = "white",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" fill={color} />
    <path
      d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 18V22M8 22H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Keyboard icon for text mode
const KeyboardIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = "white",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" />
    <rect x="5" y="9" width="2" height="2" rx="0.5" fill={color} />
    <rect x="8" y="9" width="2" height="2" rx="0.5" fill={color} />
    <rect x="11" y="9" width="2" height="2" rx="0.5" fill={color} />
    <rect x="14" y="9" width="2" height="2" rx="0.5" fill={color} />
    <rect x="17" y="9" width="2" height="2" rx="0.5" fill={color} />
    <rect x="6" y="13" width="12" height="2" rx="0.5" fill={color} />
  </svg>
);

// Animated waveform for voice
const VoiceWaveform: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
  const bars = 12;
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", height: 50 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const height = active
          ? 12 + Math.abs(Math.sin(frame * 0.25 + i * 0.5)) * 35
          : 8;
        return (
          <div
            key={i}
            style={{
              width: 5,
              height,
              backgroundColor: "#8B5CF6",
              borderRadius: 3,
              opacity: active ? 1 : 0.4,
            }}
          />
        );
      })}
    </div>
  );
};

// Typing cursor animation
const TypingCursor: React.FC<{ frame: number }> = ({ frame }) => {
  const blink = Math.sin(frame * 0.3) > 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: 28,
        backgroundColor: blink ? "#3B82F6" : "transparent",
        marginLeft: 2,
      }}
    />
  );
};

export const DualModeFeatureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "World's First" badge entrance
  const badgeSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Main title entrance
  const titleSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14 },
  });

  // Widget entrance
  const widgetSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12 },
  });

  // Mode toggle animation (voice -> text -> voice)
  const cycleFrame = (frame - 60) % 90; // 3-second cycle
  const isVoiceMode = cycleFrame < 45;

  // Mode switch animation
  const modeTransition = frame >= 60
    ? interpolate(
        cycleFrame < 45 ? cycleFrame : cycleFrame - 45,
        [0, 15],
        [0, 1],
        { extrapolateRight: "clamp" }
      )
    : 0;

  // "OR" pulse effect
  const orPulse = Math.sin(frame * 0.1) * 0.1 + 1;

  // Subtitle entrance
  const subtitleSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12 },
  });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.12) * 0.4 + 0.6;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.015) * 20}% ${50 + Math.cos(frame * 0.015) * 20}%, rgba(139, 92, 246, 0.25) 0%, transparent 60%)`,
        }}
      />

      {/* World's First Badge */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.5, 1])})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
            padding: "18px 50px",
            borderRadius: 50,
            boxShadow: `0 10px 40px rgba(139, 92, 246, ${0.4 + glowPulse * 0.3})`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            World's First
          </span>
        </div>
      </div>

      {/* Main Title: Voice AI Widget */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 95,
            fontWeight: 900,
            background: "linear-gradient(90deg, #F8FAFC, #E2E8F0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          Voice AI Widget
        </span>
      </div>

      {/* Interactive Widget Demo */}
      <div
        style={{
          opacity: interpolate(widgetSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(widgetSpring, [0, 1], [0.8, 1])})`,
          marginTop: 80,
        }}
      >
        <div
          style={{
            width: 700,
            background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
            borderRadius: 32,
            padding: 40,
            boxShadow: `0 30px 100px rgba(0,0,0,0.6), 0 0 ${80 + glowPulse * 40}px rgba(139, 92, 246, 0.25)`,
            border: "3px solid rgba(139, 92, 246, 0.4)",
          }}
        >
          {/* Mode Indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 60,
              marginBottom: 35,
            }}
          >
            {/* Voice Mode */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: isVoiceMode ? 1 : 0.4,
                transform: `scale(${isVoiceMode ? 1.1 : 0.95})`,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  background: isVoiceMode
                    ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
                    : "#334155",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: isVoiceMode
                    ? `0 0 ${30 + glowPulse * 20}px rgba(139, 92, 246, 0.6)`
                    : "none",
                }}
              >
                <MicIcon size={45} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 26,
                  fontWeight: 600,
                  color: isVoiceMode ? "#8B5CF6" : "#64748B",
                }}
              >
                Talk
              </span>
            </div>

            {/* OR Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                transform: `scale(${orPulse})`,
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 42,
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                OR
              </span>
            </div>

            {/* Text Mode */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: !isVoiceMode ? 1 : 0.4,
                transform: `scale(${!isVoiceMode ? 1.1 : 0.95})`,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  background: !isVoiceMode
                    ? "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                    : "#334155",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: !isVoiceMode
                    ? `0 0 ${30 + glowPulse * 20}px rgba(59, 130, 246, 0.6)`
                    : "none",
                }}
              >
                <KeyboardIcon size={42} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 26,
                  fontWeight: 600,
                  color: !isVoiceMode ? "#3B82F6" : "#64748B",
                }}
              >
                Type
              </span>
            </div>
          </div>

          {/* Active Mode Display */}
          <div
            style={{
              backgroundColor: "#1E293B",
              borderRadius: 20,
              padding: 28,
              minHeight: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isVoiceMode ? (
              <VoiceWaveform frame={frame} active={frame >= 60} />
            ) : (
              <div
                style={{
                  fontFamily: "system-ui",
                  fontSize: 28,
                  color: "#E2E8F0",
                }}
              >
                How can I help you today?
                <TypingCursor frame={frame} />
              </div>
            )}
          </div>

          {/* One Widget Badge */}
          <div
            style={{
              textAlign: "center",
              marginTop: 25,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 28,
                fontWeight: 600,
                color: "#94A3B8",
              }}
            >
              One Widget.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #8B5CF6, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Infinite Possibilities.
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(subtitleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 42,
            fontWeight: 600,
            color: "#94A3B8",
          }}
        >
          Your customers choose.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your website delivers.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
