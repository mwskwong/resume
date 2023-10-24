import { VisibilityRounded } from '@mui/icons-material';
import { Typography, TypographyProps } from '@mui/joy';
import { unstable_noStore as noStore } from 'next/cache';
import { FC } from 'react';

import { prisma } from '@/lib/db';

export interface ViewCountProps extends Omit<TypographyProps, 'children'> {
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });
// TODO: this can be a problem in `/blog` page, since it queries the DB more than it needs
export const ViewCount: FC<ViewCountProps> = async ({ blogId, ...props }) => {
  noStore();
  const metadata = await prisma.blogMetadata.findUnique({
    where: { id: blogId },
  });

  return (
    <Typography startDecorator={<VisibilityRounded />} {...props}>
      {numberFormatter.format(metadata?.view ?? 0)} views
    </Typography>
  );
};
