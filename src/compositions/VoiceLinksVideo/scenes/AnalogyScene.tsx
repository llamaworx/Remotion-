import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const CreditCardIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CalendarIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MicIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const AnalogyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comparisons = [
    {
      Icon: CreditCardIcon,
      label: "Payment Links",
      desc: "Share & Get Paid",
      color: "#4CAF50",
    },
    {
      Icon: CalendarIcon,
      label: "Meeting Links",
      desc: "Share & Get Booked",
      color: "#2196F3",
    },
    {
      Icon: MicIcon,
      label: "Voice Links",
      desc: "Share & Get Conversations",
      color: "#FF6B35",
      highlight: true,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          You already know how these work...
        </h2>
      </div>

      {/* Comparison cards */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          marginTop: 60,
        }}
      >
        {comparisons.map((item, i) => {
          const delay = i * 30 + 35;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const isVoiceLink = item.highlight;
          const glowPulse = isVoiceLink ? Math.sin(frame * 0.1) * 0.4 + 0.6 : 0;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 30,
                  padding: isVoiceLink ? "60px 70px" : "50px 60px",
                  background: isVoiceLink
                    ? "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 140, 66, 0.08) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  borderRadius: 36,
                  border: `3px solid ${isVoiceLink ? item.color : "rgba(255, 255, 255, 0.1)"}`,
                  transform: `scale(${cardSpring}) ${isVoiceLink ? "scale(1.08)" : ""}`,
                  opacity: cardSpring,
                  boxShadow: isVoiceLink
                    ? `0 0 ${50 + glowPulse * 40}px rgba(255, 107, 53, ${0.25 + glowPulse * 0.25})`
                    : "none",
                }}
              >
                {/* Icon container */}
                <div
                  style={{
                    width: isVoiceLink ? 100 : 85,
                    height: isVoiceLink ? 100 : 85,
                    borderRadius: "50%",
                    background: `${item.color}20`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <item.Icon size={isVoiceLink ? 50 : 42} color={item.color} />
                </div>

                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isVoiceLink ? 34 : 30,
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 22,
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                  }}
                >
                  {item.desc}
                </span>
              </div>

              {/* Arrow between cards */}
              {i < comparisons.length - 1 && (
                <div
                  style={{
                    opacity: interpolate(frame, [delay + 20, delay + 35], [0, 1]),
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          opacity: interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 40,
            fontWeight: 600,
            color: "#FF6B35",
            margin: 0,
          }}
        >
          A first of its kind. Anywhere in the world.
        </p>
      </div>
    </AbsoluteFill>
  );
};
