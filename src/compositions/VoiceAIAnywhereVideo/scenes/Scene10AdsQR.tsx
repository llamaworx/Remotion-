import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Facebook Ad mockup
const FacebookAd: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const buttonPulse = Math.sin(frame * 0.12) * 0.05 + 1;
  const buttonGlow = Math.sin(frame * 0.1) * 0.3 + 0.7;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-100, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 480,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Facebook header */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #334155",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 600, color: "#F8FAFC" }}>
              Bolka Voice AI
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
              Sponsored · <span style={{ color: "#3B82F6" }}>🌐</span>
            </div>
          </div>
        </div>

        {/* Ad content */}
        <div style={{ padding: 20 }}>
          <p style={{ fontFamily: "system-ui", fontSize: 16, color: "#CBD5E1", lineHeight: 1.5, margin: 0 }}>
            Tired of forms and wait times? Click to talk to our AI expert instantly. No downloads, no sign-ups.
          </p>
        </div>

        {/* Ad image */}
        <div
          style={{
            height: 260,
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          {/* Mic icon */}
          <div
            style={{
              width: 100,
              height: 100,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 0 ${40 * buttonGlow}px rgba(139, 92, 246, 0.5)`,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
              <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 700, color: "white" }}>
            Talk to an Expert Now
          </span>
        </div>

        {/* CTA Button */}
        <div style={{ padding: 16, backgroundColor: "#0F172A" }}>
          <div
            style={{
              backgroundColor: "#8B5CF6",
              borderRadius: 8,
              padding: "14px 24px",
              textAlign: "center",
              transform: `scale(${buttonPulse})`,
              boxShadow: `0 0 ${25 * buttonGlow}px rgba(139, 92, 246, 0.4)`,
              cursor: "pointer",
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "white" }}>
              🎤 Talk Now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// QR Code component
const QRCode: React.FC<{ size: number; frame: number }> = ({ size, frame }) => {
  const scanLine = (frame % 60) / 60;

  // Generate a simple QR-like pattern
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,0,1,1,0,0,1,1,0,0,1,0,0,1,1,0,0,1,1,0,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1],
  ];

  const cellSize = size / 21;

  return (
    <div style={{ position: "relative" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x="0" y="0" width={size} height={size} fill="white" rx="12" />
        {pattern.map((row, y) =>
          row.map((cell, x) =>
            cell === 1 ? (
              <rect
                key={`${x}-${y}`}
                x={x * cellSize + 4}
                y={y * cellSize + 4}
                width={cellSize - 1}
                height={cellSize - 1}
                fill="#0F172A"
                rx="1"
              />
            ) : null
          )
        )}
      </svg>
      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          top: scanLine * size,
          left: 0,
          width: size,
          height: 3,
          background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
        }}
      />
    </div>
  );
};

// Phone mockup with scanning
const PhoneScan: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Phone moves toward QR
  const phoneX = interpolate(entrySpring, [0, 1], [200, 0]);

  // Voice UI appears after scan
  const voiceUISpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const micPulse = Math.sin(frame * 0.15) * 0.1 + 1;
  const waveActive = frame > 180;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${phoneX}px)`,
      }}
    >
      <div
        style={{
          width: 280,
          height: 560,
          backgroundColor: "#1E293B",
          borderRadius: 40,
          padding: 12,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          border: "4px solid #334155",
        }}
      >
        {/* Phone screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0F172A",
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 28,
              backgroundColor: "#1E293B",
              borderRadius: 20,
            }}
          />

          {/* Screen content */}
          <div
            style={{
              paddingTop: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            {voiceUISpring > 0 ? (
              // Voice UI
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 30,
                  paddingTop: 60,
                  opacity: interpolate(voiceUISpring, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(voiceUISpring, [0, 1], [0.8, 1])})`,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8" }}>
                  Connected to
                </span>
                <span style={{ fontFamily: "system-ui", fontSize: 24, fontWeight: 700, color: "#F8FAFC" }}>
                  Bolka Expert
                </span>

                {/* Mic button */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `scale(${micPulse})`,
                    boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
                  }}
                >
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
                    <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Voice waveform */}
                <div style={{ display: "flex", gap: 3, alignItems: "center", height: 50 }}>
                  {Array.from({ length: 16 }).map((_, i) => {
                    const height = waveActive
                      ? 8 + Math.abs(Math.sin(frame * 0.2 + i * 0.4)) * 30
                      : 6;
                    return (
                      <div
                        key={i}
                        style={{
                          width: 4,
                          height,
                          backgroundColor: "#8B5CF6",
                          borderRadius: 2,
                        }}
                      />
                    );
                  })}
                </div>

                <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#22C55E" }}>
                  ● Listening...
                </span>
              </div>
            ) : (
              // Camera UI (scanning)
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  paddingTop: 40,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8" }}>
                  Scan QR Code
                </span>
                {/* Camera viewfinder */}
                <div
                  style={{
                    width: 200,
                    height: 200,
                    border: "3px solid #8B5CF6",
                    borderRadius: 16,
                    position: "relative",
                  }}
                >
                  {/* Corner markers */}
                  {[0, 1, 2, 3].map((corner) => (
                    <div
                      key={corner}
                      style={{
                        position: "absolute",
                        width: 30,
                        height: 30,
                        borderColor: "#8B5CF6",
                        borderStyle: "solid",
                        borderWidth: corner < 2 ? "4px 0 0 4px" : "0 4px 4px 0",
                        ...(corner === 0 ? { top: -2, left: -2 } : {}),
                        ...(corner === 1 ? { top: -2, right: -2, borderWidth: "4px 4px 0 0" } : {}),
                        ...(corner === 2 ? { bottom: -2, left: -2, borderWidth: "0 0 4px 4px" } : {}),
                        ...(corner === 3 ? { bottom: -2, right: -2 } : {}),
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene10AdsQR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // QR code entrance
  const qrSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12 },
  });

  // Text animation
  const textSpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Left side - Facebook Ad */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <FacebookAd frame={frame} fps={fps} />
      </div>

      {/* Center - QR Code */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(qrSpring, [0, 1], [0.5, 1])})`,
          opacity: interpolate(qrSpring, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            backgroundColor: "#1E293B",
            padding: 24,
            borderRadius: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <QRCode size={220} frame={frame} />
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
              bolka.ai/demo
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Phone scanning */}
      <div
        style={{
          position: "absolute",
          right: 150,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <PhoneScan frame={frame} fps={fps} />
      </div>

      {/* Connection arrows */}
      <svg
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Arrow from ad to QR */}
        <path
          d="M 600 540 L 750 540"
          stroke="url(#arrowGrad1)"
          strokeWidth="3"
          strokeDasharray={`${interpolate(frame, [30, 60], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 150`}
          fill="none"
        />
        {/* Arrow from QR to phone */}
        <path
          d="M 1050 540 L 1200 540"
          stroke="url(#arrowGrad1)"
          strokeWidth="3"
          strokeDasharray={`${interpolate(frame, [100, 130], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 150`}
          fill="none"
        />
      </svg>

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 72,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          Scan and{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            talk to an expert.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
