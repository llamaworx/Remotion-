import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon - LARGER
const MicIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
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

// Keyboard icon - LARGER
const KeyboardIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="5" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="8" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="11" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="14" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="17" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="6" y="13" width="12" height="2" rx="0.5" fill="#94A3B8" />
  </svg>
);

// Voice waveform animation - LARGER
const Waveform: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
  const bars = 14;
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", height: 50 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = active ? 10 : 5;
        const maxHeight = active ? 45 : 8;
        const height = active
          ? baseHeight + Math.abs(Math.sin((frame * 0.2 + i * 0.5))) * (maxHeight - baseHeight)
          : baseHeight;
        return (
          <div
            key={i}
            style={{
              width: 5,
              height,
              backgroundColor: active ? "#8B5CF6" : "#475569",
              borderRadius: 3,
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

  // Cursor moves to click icon (0-30 frames - slower)
  const cursorProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Click animation (30-42 frames)
  const clickScale = frame >= 30 && frame < 42
    ? interpolate(frame, [30, 34, 42], [1, 0.88, 1])
    : 1;

  // Widget expand animation (42-85 frames - slower for impact)
  const expandSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const widgetHeight = interpolate(expandSpring, [0, 1], [85, 420]);
  const widgetWidth = interpolate(expandSpring, [0, 1], [85, 450]);
  const widgetBorderRadius = interpolate(expandSpring, [0, 1], [42, 28]);

  // Content fade in (after widget expands - slower)
  const contentOpacity = interpolate(frame, [75, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Mic button glow pulse
  const glowPulse = Math.sin(frame * 0.15) * 0.5 + 0.5;

  // Text overlay (delayed for reading time)
  const textOpacity = interpolate(frame, [110, 125], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Waveform activation (after 140 frames - more pause)
  const waveformActive = frame > 145;

  // "Your choice" highlight with zoom
  const choiceHighlight = spring({
    frame: frame - 135,
    fps,
    config: { damping: 12 },
  });
  const choiceScale = interpolate(choiceHighlight, [0, 1], [0.9, 1.05]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Website Browser (dimmed background) - LARGER */}
      <div
        style={{
          width: 920,
          height: 580,
          backgroundColor: "#1E293B",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          position: "relative",
          opacity: 0.6,
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            height: 48,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: 10,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
        </div>

        {/* Blurred website content */}
        <div style={{ padding: 35, filter: "blur(4px)", opacity: 0.4 }}>
          <div style={{ display: "flex", gap: 28, marginBottom: 35 }}>
            <div style={{ width: 110, height: 32, backgroundColor: "#475569", borderRadius: 8 }} />
            <div style={{ width: 70, height: 22, backgroundColor: "#475569", borderRadius: 5 }} />
            <div style={{ width: 80, height: 22, backgroundColor: "#475569", borderRadius: 5 }} />
          </div>
          <div style={{ width: "75%", height: 42, backgroundColor: "#475569", borderRadius: 10, marginBottom: 14 }} />
          <div style={{ width: "55%", height: 26, backgroundColor: "#334155", borderRadius: 8 }} />
        </div>
      </div>

      {/* Bolka Widget - Expanding - MUCH LARGER */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          right: 150,
          width: widgetWidth,
          height: widgetHeight,
          background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: widgetBorderRadius,
          boxShadow: `0 15px 50px rgba(0,0,0,0.6), 0 0 80px rgba(139, 92, 246, 0.25)`,
          border: "2px solid rgba(139, 92, 246, 0.4)",
          transform: `scale(${clickScale})`,
          overflow: "hidden",
        }}
      >
        {/* Collapsed state - just mic icon - LARGER */}
        {frame < 42 && (
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
            <MicIcon size={42} />
          </div>
        )}

        {/* Expanded content */}
        {frame >= 42 && (
          <div
            style={{
              padding: 25,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: contentOpacity,
            }}
          >
            {/* Header - LARGER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MicIcon size={24} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#F8FAFC",
                  }}
                >
                  Bolka Assistant
                </div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 14,
                    color: "#10B981",
                  }}
                >
                  ● Online
                </div>
              </div>
            </div>

            {/* Chat area - LARGER */}
            <div style={{ flex: 1, marginBottom: 20 }}>
              <div
                style={{
                  backgroundColor: "#334155",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 15,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#E2E8F0" }}>
                  Hi! How can I help you today?
                </span>
              </div>

              {/* Waveform visualization */}
              {waveformActive && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 25,
                  }}
                >
                  <Waveform frame={frame} active={waveformActive} />
                </div>
              )}
            </div>

            {/* Dual Input Mode - LARGER */}
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              {/* Text input */}
              <div
                style={{
                  flex: 1,
                  height: 58,
                  backgroundColor: "#334155",
                  borderRadius: 29,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: 12,
                  border: "1px solid #475569",
                }}
              >
                <KeyboardIcon />
                <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#64748B" }}>
                  Type a message...
                </span>
              </div>

              {/* Voice button with glow - LARGER */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 ${25 + glowPulse * 20}px rgba(139, 92, 246, ${0.5 + glowPulse * 0.4})`,
                  cursor: "pointer",
                }}
              >
                <MicIcon size={30} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cursor animation - LARGER */}
      {frame < 35 && (
        <div
          style={{
            position: "absolute",
            bottom: interpolate(cursorProgress, [0, 1], [320, 145]),
            right: interpolate(cursorProgress, [0, 1], [80, 165]),
            width: 26,
            height: 32,
            pointerEvents: "none",
          }}
        >
          <svg width="26" height="32" viewBox="0 0 20 24" fill="none">
            <path
              d="M1 1L1 17L5.5 12.5L9 20L12 18.5L8.5 11.5L14 11.5L1 1Z"
              fill="white"
              stroke="#1E293B"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}

      {/* Text + Voice. Your choice. - BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 64,
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
              transform: `scale(${choiceScale})`,
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
