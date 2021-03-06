import React, { FC, memo } from "react";
import { css, keyframes } from "@emotion/react";
import { leftSmallPaths, leftSmallTentaclePaths } from "./pathData";

import Jellyfish from "./Jellyfish";

const animTentacleSwing = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, -1.5%, 0); }
`;

const animFloat = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, -8%, 0); }
`;

const bodyAnimStyle = css`
  animation: ${animFloat} 8s ease-in-out infinite alternate;
`;

const tentaclesAnimStyle = css`
  animation: ${animTentacleSwing} 8s linear 1.8s infinite alternate;
`;

const JellyfishLeftSmall: FC = () => (
  <Jellyfish
    bodyAnimation={bodyAnimStyle}
    bodyPaths={leftSmallPaths}
    tentaclePaths={leftSmallTentaclePaths}
    tentaclesAnimation={tentaclesAnimStyle}
  />
);

if (process.env.NODE_ENV === "development") JellyfishLeftSmall.whyDidYouRender = true;

export default memo(JellyfishLeftSmall);
