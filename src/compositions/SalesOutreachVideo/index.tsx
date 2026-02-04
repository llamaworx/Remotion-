import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";

// Scene imports
import { Scene1OldWorldPain } from "./scenes/Scene1OldWorldPain";
import { Scene2Compliance } from "./scenes/Scene2Compliance";
import { Scene3DigitalNotTalking } from "./scenes/Scene3DigitalNotTalking";
import { Scene4WhatSalesNeeds } from "./scenes/Scene4WhatSalesNeeds";
import { Scene5EnterBolka } from "./scenes/Scene5EnterBolka";
import { Scene6SalesFlow } from "./scenes/Scene6SalesFlow";
import { Scene7CustomerExperience } from "./scenes/Scene7CustomerExperience";
import { Scene8SalesDashboard } from "./scenes/Scene8SalesDashboard";
import { Scene9Distribution } from "./scenes/Scene9Distribution";
import { Scene10Finale } from "./scenes/Scene10Finale";

interface SalesOutreachVideoProps {
  musicUrl?: string;
  voiceOverUrl?: string;
}

export const SalesOutreachVideo: React.FC<SalesOutreachVideoProps> = ({
  musicUrl,
  voiceOverUrl,
}) => {
  // Total duration: 100 seconds = 3000 frames at 30fps (mobile optimized)
  // 10 scenes with variable durations for optimal pacing

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
      }}
    >
      {/* Background music */}
      {musicUrl && (
        <Audio src={musicUrl} volume={0.3} />
      )}

      {/* Voice over */}
      {voiceOverUrl && (
        <Audio src={voiceOverUrl} volume={1} />
      )}

      {/* Scene timing (frames at 30fps) - Mobile optimized:
        Scene 1:  0-270     (0-9s)    - Old World Pain (hook)
        Scene 2:  270-480   (9-16s)   - Compliance
        Scene 3:  480-750   (16-25s)  - Digital Not Talking
        Scene 4:  750-1020  (25-34s)  - What Sales Needs
        Scene 5:  1020-1410 (34-47s)  - Enter Bolka (product intro)
        Scene 6:  1410-1830 (47-61s)  - Sales Flow (key demo)
        Scene 7:  1830-2160 (61-72s)  - Customer Experience
        Scene 8:  2160-2490 (72-83s)  - Sales Dashboard
        Scene 9:  2490-2760 (83-92s)  - Distribution
        Scene 10: 2760-3000 (92-100s) - CTA Finale
      */}

      {/* Scene 1: Old World Pain (0-9s) */}
      <Sequence from={0} durationInFrames={270}>
        <Scene1OldWorldPain />
      </Sequence>

      {/* Scene 2: Compliance + Reality (9-16s) */}
      <Sequence from={270} durationInFrames={210}>
        <Scene2Compliance />
      </Sequence>

      {/* Scene 3: Digital Isn't Talking (16-25s) */}
      <Sequence from={480} durationInFrames={270}>
        <Scene3DigitalNotTalking />
      </Sequence>

      {/* Scene 4: What Sales Needs Now (25-34s) */}
      <Sequence from={750} durationInFrames={270}>
        <Scene4WhatSalesNeeds />
      </Sequence>

      {/* Scene 5: Enter Bolka - Product Intro (34-47s) */}
      <Sequence from={1020} durationInFrames={390}>
        <Scene5EnterBolka />
      </Sequence>

      {/* Scene 6: Real Sales Outreach Flow (47-61s) */}
      <Sequence from={1410} durationInFrames={420}>
        <Scene6SalesFlow />
      </Sequence>

      {/* Scene 7: Customer Experience (61-72s) */}
      <Sequence from={1830} durationInFrames={330}>
        <Scene7CustomerExperience />
      </Sequence>

      {/* Scene 8: Sales Dashboard (72-83s) */}
      <Sequence from={2160} durationInFrames={330}>
        <Scene8SalesDashboard />
      </Sequence>

      {/* Scene 9: Distribution Everywhere (83-92s) */}
      <Sequence from={2490} durationInFrames={270}>
        <Scene9Distribution />
      </Sequence>

      {/* Scene 10: The New Sales Reality - CTA Finale (92-100s) */}
      <Sequence from={2760} durationInFrames={240}>
        <Scene10Finale />
      </Sequence>
    </AbsoluteFill>
  );
};
