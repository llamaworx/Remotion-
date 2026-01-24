import { Composition } from "remotion";
import { BolkaProductVideo } from "./compositions/BolkaProductVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BolkaProductVideo"
        component={BolkaProductVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: "Bolka",
          tagline: "Voice AI, Deployed Your Way",
          features: [
            "Natural Voice Conversations",
            "Flexible Deployment Options",
            "Enterprise-Grade Security",
            "Seamless Integration",
          ],
        }}
      />
    </>
  );
};
