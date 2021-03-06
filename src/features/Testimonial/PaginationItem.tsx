import { ButtonBase, ButtonBaseProps } from "@mui/material";
import React, { FC } from "react";

import useSx from "./usePaginationItemSx";

type PaginationItemProps = ButtonBaseProps & {
  active: boolean
}

const PaginationItem: FC<PaginationItemProps> = ({ active = false, ...props }) => {
  const sx = useSx(active);

  return (
    <ButtonBase
      sx={sx.root}
      {...props}
    />
  );
};

if (process.env.NODE_ENV === "development") PaginationItem.whyDidYouRender = true;

export default PaginationItem;