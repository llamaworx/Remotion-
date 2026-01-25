import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const CheckCircleIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TargetIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// QR Code for product packaging demo
const PackagingQRCode: React.FC<{ size: number }> = ({ size }) => {
  const modules = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1,0,1],
    [0,1,0,0,1,0,0,0,1,1,0,0,1,0,1,1,0,1,0,1,0],
    [1,1,1,0,1,1,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0],
    [1,0,1,0,1,1,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1],
  ];

  const cellSize = size / 21;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx={6} />
      {modules.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1a1a2e"
            />
          ) : null
        )
      )}
    </svg>
  );
};

interface UseCaseSceneProps {
  useCase: {
    title: string;
    industry: string;
    scenario: string;
    benefit: string;
  };
}

export const UseCaseScene: React.FC<UseCaseSceneProps> = ({ useCase }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations - fade and scale (no sliding)
  const labelOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const labelScale = interpolate(frame, [0, 25], [0.9, 1], { extrapolateRight: "clamp" });

  const industrySpring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const titleSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 80 } });
  const scenarioSpring = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 80 } });
  const qrSpring = spring({ frame: frame - 100, fps, config: { damping: 14, stiffness: 80 } });
  const benefitSpring = spring({ frame: frame - 140, fps, config: { damping: 14, stiffness: 80 } });

  const float = Math.sin(frame * 0.04) * 8;
  const float2 = Math.cos(frame * 0.05) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 80,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 140, 66, 0.06) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 250,
          left: 60,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(129, 199, 132, 0.06) 100%)",
          transform: `translateY(${float2}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 1,
          maxWidth: 580,
        }}
      >
        {/* "Use Case" label - fade and scale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: labelOpacity,
            transform: `scale(${labelScale})`,
          }}
        >
          <TargetIcon size={36} color="#888" />
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 600,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: 8,
            }}
          >
            Use Case
          </span>
        </div>

        {/* Industry badge - scale in */}
        <div
          style={{
            padding: "22px 55px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 60,
            transform: `scale(${industrySpring})`,
            opacity: industrySpring,
            boxShadow: "0 18px 50px rgba(255, 107, 53, 0.35)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 5,
            }}
          >
            {useCase.industry}
          </span>
        </div>

        {/* Title - fade and scale */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
            opacity: titleSpring,
            transform: `scale(${titleSpring})`,
            lineHeight: 1.15,
          }}
        >
          {useCase.title}
        </h2>

        {/* Scenario with QR code - showing product packaging */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "35px 40px",
            background: "white",
            borderRadius: 32,
            border: "2px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.07)",
            transform: `scale(${scenarioSpring})`,
            opacity: scenarioSpring,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 32,
              color: "#444",
              margin: 0,
              textAlign: "left",
              lineHeight: 1.5,
              fontStyle: "italic",
              flex: 1,
            }}
          >
            "{useCase.scenario}"
          </p>
        </div>

        {/* QR Code on packaging mockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 25,
            padding: "25px 35px",
            background: "linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%)",
            borderRadius: 24,
            border: "2px dashed rgba(255, 107, 53, 0.3)",
            transform: `scale(${qrSpring})`,
            opacity: qrSpring,
          }}
        >
          {/* Product box mockup */}
          <div
            style={{
              width: 100,
              height: 120,
              background: "linear-gradient(145deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(255, 107, 53, 0.25)",
              padding: 10,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 6,
                padding: 6,
              }}
            >
              <PackagingQRCode size={60} />
            </div>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 12,
                color: "white",
                marginTop: 8,
                fontWeight: 600,
              }}
            >
              Scan for Help
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#1a1a2e",
              }}
            >
              Embed on Packaging
            </span>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 22,
                color: "#666",
              }}
            >
              QR code links to Voice AI support
            </span>
          </div>
        </div>

        {/* Benefit - fade and scale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 15,
            opacity: benefitSpring,
            transform: `scale(${benefitSpring})`,
            padding: "24px 40px",
            background: "rgba(76, 175, 80, 0.1)",
            borderRadius: 70,
            border: "3px solid rgba(76, 175, 80, 0.25)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(76, 175, 80, 0.35)",
            }}
          >
            <CheckCircleIcon size={34} color="white" />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 38,
              fontWeight: 700,
              color: "#2E7D32",
            }}
          >
            {useCase.benefit}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
