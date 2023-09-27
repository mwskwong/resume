'use client';

import { NoSsr } from '@mui/base';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { IconButton, IconButtonProps, useColorScheme } from '@mui/joy';
import { FC } from 'react';

export type ModeToggleButtonProps = Omit<IconButtonProps, 'children'>;
export const ModeToggleButton: FC<ModeToggleButtonProps> = (props) => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      aria-label="Toggle mode"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      size="sm"
      variant="outlined"
      {...props}
    >
      <NoSsr>
        {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
      </NoSsr>
    </IconButton>
  );
};
