'use client';

import AspectRatio from '@mui/joy/AspectRatio';
import { useTheme } from '@mui/joy/styles';
import mergeSx from 'merge-sx';
import { ComponentProps, FC } from 'react';
import { SetOptional } from 'type-fest';
import Image from '../image';

export type CoverImageProps = SetOptional<ComponentProps<typeof Image>, 'alt'>;

// FIXME: with zero runtime, we may be able to add this back to `blog/[slug]/page`
export const CoverImage: FC<CoverImageProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <AspectRatio
      objectFit="cover"
      ratio="1200/630"
      sx={{ borderRadius: 'md' }}
      variant="outlined"
    >
      <Image
        alt=""
        fill
        priority
        role="presentation"
        sizes={[
          `${theme.breakpoints.up('md')} ${theme.breakpoints.values.md}px`,
          '100vw',
        ]
          .join(',')
          .replaceAll('@media ', '')}
        sx={mergeSx({ width: '100%', height: 'auto' }, sx)}
        {...props}
      />
    </AspectRatio>
  );
};
