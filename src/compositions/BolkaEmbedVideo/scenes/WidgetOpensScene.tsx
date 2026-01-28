import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon
const MicIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
    <path
      d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Keyboard icon
const KeyboardIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="5" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="8" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="11" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="14" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="17" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="6" y="13" width="12" height="2" rx="0.5" fill="#94A3B8" />
  </svg>
);

// Voice waveform animation
const Waveform: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
  const bars = 12;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", height: 40 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = active ? 8 : 4;
        const maxHeight = active ? 35 : 6;
        const height = active
          ? baseHeight + Math.abs(Math.sin((frame * 0.2 + i * 0.5))) * (maxHeight - baseHeight)
          : baseHeight;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              backgroundColor: active ? "#8B5CF6" : "#475569",
              borderRadius: 2,
              transition: "height 0.1s ease",
            }}
          />
        );
      })}
    </div>
  );
};

export const WidgetOpensScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor moves to click icon (0-25 frames)
  const cursorProgress = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Click animation (25-35 frames)
  const clickScale = frame >= 25 && frame < 35
    ? interpolate(frame, [25, 28, 35], [1, 0.9, 1])
    : 1;

  // Widget expand animation (35-70 frames)
  const expandSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const widgetHeight = interpolate(expandSpring, [0, 1], [65, 350]);
  const widgetWidth = interpolate(expandSpring, [0, 1], [65, 380]);
  const widgetBorderRadius = interpolate(expandSpring, [0, 1], [32.5, 24]);

  // Content fade in (after widget expands)
  const contentOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Mic button glow pulse
  const glowPulse = Math.sin(frame * 0.15) * 0.5 + 0.5;

  // Text overlay
  const textOpacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Waveform activation (after 120 frames)
  const waveformActive = frame > 120;

  // "Your choice" highlight
  const choiceHighlight = spring({
    frame: frame - 130,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Website Browser (dimmed background) */}
      <div
        style={{
          width: 850,
          height: 550,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          position: "relative",
          opacity: 0.7,
        }}
      >
        {/* Browser Chrome */}
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
        </div>

        {/* Blurred website content */}
        <div style={{ padding: 30, filter: "blur(3px)", opacity: 0.5 }}>
          <div style={{ display: "flex", gap: 25, marginBottom: 30 }}>
            <div style={{ width: 100, height: 28, backgroundColor: "#475569", borderRadius: 6 }} />
            <div style={{ width: 60, height: 18, backgroundColor: "#475569", borderRadius: 4 }} />
            <div style={{ width: 70, height: 18, backgroundColor: "#475569", borderRadius: 4 }} />
          </div>
          <div style={{ width: "75%", height: 36, backgroundColor: "#475569", borderRadius: 8, marginBottom: 12 }} />
          <div style={{ width: "55%", height: 22, backgroundColor: "#334155", borderRadius: 6 }} />
        </div>
      </div>

      {/* Bolka Widget - Expanding */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          right: 180,
          width: widgetWidth,
          height: widgetHeight,
          background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: widgetBorderRadius,
          boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139, 92, 246, 0.2)`,
          border: "1px solid rgba(139, 92, 246, 0.3)",
          transform: `scale(${clickScale})`,
          overflow: "hidden",
        }}
      >
        {/* Collapsed state - just mic icon */}
        {frame < 35 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            }}
          >
            <MicIcon size={32} />
          </div>
        )}

        {/* Expanded content */}
        {frame >= 35 && (
          <div
            style={{
              padding: 20,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: contentOpacity,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MicIcon size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#F8FAFC",
                  }}
                >
                  Bolka Assistant
                </div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 12,
                    color: "#10B981",
                  }}
                >
                  ● Online
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div style={{ flex: 1, marginBottom: 15 }}>
              <div
                style={{
                  backgroundColor: "#334155",
                  borderRadius: 12,
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 14, color: "#E2E8F0" }}>
                  Hi! How can I help you today?
                </span>
              </div>

              {/* Waveform visualization */}
              {waveformActive && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Waveform frame={frame} active={waveformActive} />
                </div>
              )}
            </div>

            {/* Dual Input Mode */}
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              {/* Text input */}
              <div
                style={{
                  flex: 1,
                  height: 48,
                  backgroundColor: "#334155",
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 15px",
                  gap: 10,
                  border: "1px solid #475569",
                }}
              >
                <KeyboardIcon />
                <span style={{ fontFamily: "system-ui", fontSize: 14, color: "#64748B" }}>
                  Type a message...
                </span>
              </div>

              {/* Voice button with glow */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 ${20 + glowPulse * 15}px rgba(139, 92, 246, ${0.4 + glowPulse * 0.4})`,
                  cursor: "pointer",
                }}
              >
                <MicIcon size={24} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cursor animation */}
      {frame < 30 && (
        <div
          style={{
            position: "absolute",
            bottom: interpolate(cursorProgress, [0, 1], [300, 160]),
            right: interpolate(cursorProgress, [0, 1], [100, 190]),
            width: 20,
            height: 24,
            pointerEvents: "none",
          }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M1 1L1 17L5.5 12.5L9 20L12 18.5L8.5 11.5L14 11.5L1 1Z"
              fill="white"
              stroke="#1E293B"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {/* Text + Voice. Your choice. */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 52,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          Text + Voice.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: `scale(${1 + choiceHighlight * 0.05})`,
              display: "inline-block",
            }}
          >
            Your choice.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
