import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Data source icons
const DocIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
    <polyline points="14,2 14,8 20,8" stroke="#3B82F6" strokeWidth="2"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke="#60A5FA" strokeWidth="1.5"/>
    <line x1="8" y1="17" x2="14" y2="17" stroke="#60A5FA" strokeWidth="1.5"/>
  </svg>
);

const PDFIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#EF4444" strokeWidth="2" fill="#5F1E1E"/>
    <polyline points="14,2 14,8 20,8" stroke="#EF4444" strokeWidth="2"/>
    <text x="8" y="17" fill="#F87171" fontSize="6" fontWeight="bold">PDF</text>
  </svg>
);

const WebsiteIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" fill="#1E3F2E"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#22C55E" strokeWidth="1.5"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#22C55E" strokeWidth="1.5" fill="none"/>
  </svg>
);

const CRMIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#F59E0B" strokeWidth="2" fill="#3F2E1E"/>
    <circle cx="9" cy="9" r="2" fill="#FBBF24"/>
    <circle cx="15" cy="9" r="2" fill="#FBBF24"/>
    <path d="M7 15c0-2 2-3 5-3s5 1 5 3" stroke="#FBBF24" strokeWidth="1.5" fill="none"/>
  </svg>
);

const DatabaseIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#A855F7" strokeWidth="2" fill="#2E1E3F"/>
    <path d="M21 5v6c0 1.66-4.03 3-9 3s-9-1.34-9-3V5" stroke="#A855F7" strokeWidth="2"/>
    <path d="M21 11v6c0 1.66-4.03 3-9 3s-9-1.34-9-3v-6" stroke="#A855F7" strokeWidth="2"/>
  </svg>
);

const APIIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#06B6D4" strokeWidth="2" fill="#1E3A3F"/>
    <text x="6" y="15" fill="#22D3EE" fontSize="7" fontWeight="bold">{`</>`}</text>
  </svg>
);

// Flowing data particle
const DataParticle: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  frame: number;
  color: string;
}> = ({ startX, startY, endX, endY, delay, frame, color }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 60) return null;

  const progress = interpolate(localFrame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);
  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const size = interpolate(progress, [0, 0.5, 1], [4, 8, 4]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        boxShadow: `0 0 ${size * 2}px ${color}`,
        opacity,
      }}
    />
  );
};

// Data source component with flowing animation
const DataSource: React.FC<{
  icon: React.ReactNode;
  label: string;
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  color: string;
}> = ({ icon, label, x, y, delay, frame, fps, color }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const pulse = Math.sin((frame - delay) * 0.1) * 0.05 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${interpolate(entrySpring, [0, 1], [0.5, 1]) * pulse})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#1E293B",
            borderRadius: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 20px ${color}40`,
            border: `2px solid ${color}60`,
          }}
        >
          {icon}
        </div>
        <span style={{ fontFamily: "system-ui", fontSize: 20, color: "#94A3B8", fontWeight: 500 }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// AI Brain/Core visualization
const AIBrain: React.FC<{ frame: number; fps: number; active: boolean }> = ({ frame, fps, active }) => {
  const pulse = Math.sin(frame * 0.08) * 0.1 + 1;
  const glow = active ? Math.sin(frame * 0.1) * 0.4 + 0.6 : 0.3;

  // Neural network nodes
  const nodes = [
    { x: 0, y: -40 },
    { x: 35, y: -20 },
    { x: 35, y: 20 },
    { x: 0, y: 40 },
    { x: -35, y: 20 },
    { x: -35, y: -20 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${pulse})`,
      }}
    >
      {/* Outer glow rings */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          style={{
            position: "absolute",
            width: 160 + ring * 40,
            height: 160 + ring * 40,
            borderRadius: "50%",
            border: `2px solid rgba(139, 92, 246, ${0.3 - ring * 0.08})`,
            boxShadow: active ? `0 0 ${20 + ring * 10}px rgba(139, 92, 246, ${0.2 - ring * 0.05})` : "none",
          }}
        />
      ))}

      {/* Core brain circle */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139, 92, 246, ${0.3 + glow * 0.3}) 0%, rgba(99, 102, 241, 0.1) 70%, transparent 100%)`,
          border: "3px solid rgba(139, 92, 246, 0.6)",
          boxShadow: `0 0 ${50 * glow}px rgba(139, 92, 246, 0.5), inset 0 0 40px rgba(139, 92, 246, 0.2)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Neural network visualization */}
        <svg width="100" height="100" viewBox="-50 -50 100 100" style={{ position: "absolute" }}>
          {/* Connections */}
          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((target, j) => (
              <line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={`rgba(139, 92, 246, ${active ? 0.4 + Math.sin(frame * 0.15 + i) * 0.2 : 0.2})`}
                strokeWidth="1"
              />
            ))
          )}
          {/* Nodes */}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={active ? 6 + Math.sin(frame * 0.2 + i) * 2 : 4}
              fill={`rgba(139, 92, 246, ${active ? 0.8 : 0.4})`}
            />
          ))}
          {/* Center node */}
          <circle cx="0" cy="0" r={active ? 12 : 8} fill="#8B5CF6" />
        </svg>

        {/* AI icon */}
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" style={{ position: "relative", zIndex: 1 }}>
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" fill="white" opacity="0.9"/>
          <circle cx="9" cy="13" r="1.5" fill="#8B5CF6"/>
          <circle cx="15" cy="13" r="1.5" fill="#8B5CF6"/>
        </svg>
      </div>
    </div>
  );
};

// Voice output waves
const VoiceOutput: React.FC<{ frame: number; opacity: number }> = ({ frame, opacity }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        opacity,
      }}
    >
      {/* Mic icon */}
      <div
        style={{
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 ${30 + Math.sin(frame * 0.1) * 10}px rgba(139, 92, 246, 0.5)`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
          <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Voice waves */}
      <div style={{ display: "flex", gap: 4, alignItems: "center", height: 50 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const height = 10 + Math.abs(Math.sin(frame * 0.18 + i * 0.35)) * 35;
          return (
            <div
              key={i}
              style={{
                width: 5,
                height,
                background: "linear-gradient(180deg, #8B5CF6, #6366F1)",
                borderRadius: 3,
              }}
            />
          );
        })}
      </div>

      <span style={{ fontFamily: "system-ui", fontSize: 28, color: "#A78BFA", fontWeight: 500 }}>
        Intelligent Response
      </span>
    </div>
  );
};

export const Scene5NotRecorded: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Data sources
  const dataSources = [
    { icon: <DocIcon size={36} />, label: "Docs", x: 100, y: 200, delay: 5, color: "#3B82F6" },
    { icon: <PDFIcon size={36} />, label: "PDFs", x: 200, y: 100, delay: 12, color: "#EF4444" },
    { icon: <WebsiteIcon size={36} />, label: "Website", x: 100, y: 400, delay: 8, color: "#22C55E" },
    { icon: <CRMIcon size={36} />, label: "CRM", x: 200, y: 500, delay: 18, color: "#F59E0B" },
    { icon: <DatabaseIcon size={36} />, label: "Database", x: 50, y: 300, delay: 15, color: "#A855F7" },
    { icon: <APIIcon size={36} />, label: "APIs", x: 180, y: 300, delay: 22, color: "#06B6D4" },
  ];

  // Particles flowing to brain
  const particleColors = ["#3B82F6", "#EF4444", "#22C55E", "#F59E0B", "#A855F7", "#06B6D4"];
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    startX: 100 + Math.random() * 150,
    startY: 100 + Math.random() * 450,
    endX: 540,
    endY: 300,
    delay: 40 + i * 4,
    color: particleColors[i % particleColors.length],
  }));

  // Brain activation
  const brainActive = frame > 80;

  // Voice output appears
  const voiceOutputOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text animations
  const text1Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 14 },
  });

  // Text positions shift when voice output appears
  const textShift = interpolate(frame, [180, 210], [0, -80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Data flow lines (decorative) */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.3 }}
        width="100%"
        height="100%"
      >
        {dataSources.map((source, i) => (
          <path
            key={i}
            d={`M ${source.x + 35} ${source.y + 35} Q ${300} ${source.y} 540 300`}
            stroke={source.color}
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            opacity={interpolate(frame, [source.delay, source.delay + 30], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
        ))}
      </svg>

      {/* Data sources */}
      {dataSources.map((source, i) => (
        <DataSource
          key={i}
          icon={source.icon}
          label={source.label}
          x={source.x}
          y={source.y}
          delay={source.delay}
          frame={frame}
          fps={fps}
          color={source.color}
        />
      ))}

      {/* Flowing particles */}
      {particles.map((particle, i) => (
        <DataParticle
          key={i}
          startX={particle.startX}
          startY={particle.startY}
          endX={particle.endX}
          endY={particle.endY}
          delay={particle.delay}
          frame={frame}
          color={particle.color}
        />
      ))}

      {/* AI Brain in center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AIBrain frame={frame} fps={fps} active={brainActive} />
      </div>

      {/* Voice output on right */}
      <div
        style={{
          position: "absolute",
          right: 150,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <VoiceOutput frame={frame} opacity={voiceOutputOpacity} />
      </div>

      {/* Arrow from brain to voice */}
      <div
        style={{
          position: "absolute",
          left: "58%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: voiceOutputOpacity,
        }}
      >
        <svg width="150" height="40" viewBox="0 0 150 40">
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path d="M 0 20 L 130 20" stroke="url(#arrowGrad)" strokeWidth="3" fill="none" />
          <path d="M 120 10 L 140 20 L 120 30" stroke="#8B5CF6" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Text overlays */}
      <div
        style={{
          position: "absolute",
          bottom: 120 - textShift,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {/* "Not recorded." */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 110,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
            }}
          >
            Not{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #EF4444, #DC2626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "line-through",
                textDecorationColor: "#EF4444",
              }}
            >
              recorded.
            </span>
          </span>
        </div>

        {/* "Trained on your product." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 80,
              fontWeight: 700,
              color: "#CBD5E1",
            }}
          >
            Trained on{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your product.
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
