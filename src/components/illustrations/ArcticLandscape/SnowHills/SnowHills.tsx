/** @jsx jsx */

import { FC } from "react";
import { jsx } from "@emotion/react";
import { outline } from "../styles";
import { outlinePaths } from "./pathData";

const SnowHills: FC = () => (
  <g css={outline}>
    {outlinePaths.map((path, index) => <path key={index} d={path} />)}
  </g>
);

if (process.env.NODE_ENV === "development") SnowHills.whyDidYouRender = true;

export default SnowHills;