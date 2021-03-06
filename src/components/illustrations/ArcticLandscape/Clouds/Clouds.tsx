import React, { FC } from "react";

import Fills from "./Fills";
import Outlines from "./Outlines";

const Clouds: FC = () => (
  <>
    <Fills />
    <Outlines />
  </>
);

if (process.env.NODE_ENV === "development") Clouds.whyDidYouRender = true;

export default Clouds; 