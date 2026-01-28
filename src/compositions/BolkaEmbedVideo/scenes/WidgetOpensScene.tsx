import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon - MUCH LARGER
const MicIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
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
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="5" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="8" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="11" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="14" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="17" y="9" width="2" height="2" rx="0.5" fill="#94A3B8" />
    <rect x="6" y="13" width="12" height="2" rx="0.5" fill="#94A3B8" />
  </svg>
);

// Voice waveform animation - MUCH LARGER
const Waveform: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
  const bars = 16;
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", height: 65 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = active ? 12 : 6;
        const maxHeight = active ? 55 : 10;
        const height = active
          ? baseHeight + Math.abs(Math.sin((frame * 0.2 + i * 0.5))) * (maxHeight - baseHeight)
          : baseHeight;
        return (
          <div
            key={i}
            style={{
              width: 7,
              height,
              backgroundColor: active ? "#8B5CF6" : "#475569",
              borderRadius: 4,
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

  const widgetHeight = interpolate(expandSpring, [0, 1], [110, 520]);
  const widgetWidth = interpolate(expandSpring, [0, 1], [110, 550]);
  const widgetBorderRadius = interpolate(expandSpring, [0, 1], [55, 32]);

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
          width: 950,
          height: 620,
          backgroundColor: "#1E293B",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          position: "relative",
          opacity: 0.55,
        }}
      >
        {/* Browser Chrome */}
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
        </div>

        {/* Blurred website content */}
        <div style={{ padding: 40, filter: "blur(5px)", opacity: 0.35 }}>
          <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
            <div style={{ width: 130, height: 38, backgroundColor: "#475569", borderRadius: 10 }} />
            <div style={{ width: 85, height: 28, backgroundColor: "#475569", borderRadius: 6 }} />
            <div style={{ width: 95, height: 28, backgroundColor: "#475569", borderRadius: 6 }} />
          </div>
          <div style={{ width: "75%", height: 50, backgroundColor: "#475569", borderRadius: 12, marginBottom: 18 }} />
          <div style={{ width: "55%", height: 32, backgroundColor: "#334155", borderRadius: 10 }} />
        </div>
      </div>

      {/* Bolka Widget - Expanding - MUCH LARGER */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          right: 130,
          width: widgetWidth,
          height: widgetHeight,
          background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: widgetBorderRadius,
          boxShadow: `0 20px 70px rgba(0,0,0,0.65), 0 0 100px rgba(139, 92, 246, 0.3)`,
          border: "3px solid rgba(139, 92, 246, 0.45)",
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
            <MicIcon size={55} />
          </div>
        )}

        {/* Expanded content */}
        {frame >= 42 && (
          <div
            style={{
              padding: 32,
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
                gap: 18,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 62,
                  height: 62,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MicIcon size={32} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 28,
                    fontWeight: 600,
                    color: "#F8FAFC",
                  }}
                >
                  Bolka Assistant
                </div>
                <div
                  style={{
                    fontFamily: "system-ui",
                    fontSize: 18,
                    color: "#10B981",
                  }}
                >
                  ● Online
                </div>
              </div>
            </div>

            {/* Chat area - LARGER */}
            <div style={{ flex: 1, marginBottom: 26 }}>
              <div
                style={{
                  backgroundColor: "#334155",
                  borderRadius: 22,
                  padding: 26,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 24, color: "#E2E8F0" }}>
                  Hi! How can I help you today?
                </span>
              </div>

              {/* Waveform visualization */}
              {waveformActive && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 30,
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
                gap: 18,
                alignItems: "center",
              }}
            >
              {/* Text input */}
              <div
                style={{
                  flex: 1,
                  height: 72,
                  backgroundColor: "#334155",
                  borderRadius: 36,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 26px",
                  gap: 16,
                  border: "2px solid #475569",
                }}
              >
                <KeyboardIcon />
                <span style={{ fontFamily: "system-ui", fontSize: 22, color: "#64748B" }}>
                  Type a message...
                </span>
              </div>

              {/* Voice button with glow - LARGER */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 ${30 + glowPulse * 25}px rgba(139, 92, 246, ${0.55 + glowPulse * 0.45})`,
                  cursor: "pointer",
                }}
              >
                <MicIcon size={42} />
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
            bottom: interpolate(cursorProgress, [0, 1], [350, 125]),
            right: interpolate(cursorProgress, [0, 1], [60, 145]),
            width: 32,
            height: 40,
            pointerEvents: "none",
          }}
        >
          <svg width="32" height="40" viewBox="0 0 20 24" fill="none">
            <path
              d="M1 1L1 17L5.5 12.5L9 20L12 18.5L8.5 11.5L14 11.5L1 1Z"
              fill="white"
              stroke="#1E293B"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      )}

      {/* Text + Voice. Your choice. - MUCH BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 82,
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
