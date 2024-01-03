import Box from '@mui/joy/Box';
import { StackProps } from '@mui/joy/Stack';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import { Heart } from 'lucide-react';
import { FC } from 'react';

import { getBlogMetadataById, getBlogsMetadataByIds } from '@/lib/queries';

import { LikeButton } from './like-button';

export interface LikesProps
  extends Omit<
    Pick<
      TypographyProps & StackProps,
      Extract<keyof TypographyProps, keyof StackProps>
    >,
    'children'
  > {
  /**
   * Expected to be used when there are multiple Likes mounted in the same page.
   * When blogIds is specified, ViewCount will fetch multiple blog metadata by IDs at once,
   * cache the response, and do arr.find() on the cached response
   * The cache will only be valid with in the current server request.
   * This allows me to avoid running multiple DB queries in the listing page
   */
  blogIds?: string[];
  blogId: string;
  readOnly?: boolean;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const Likes: FC<LikesProps> = async ({
  blogIds,
  blogId,
  readOnly,
  ...props
}) => {
  const metadata = blogIds
    ? (await getBlogsMetadataByIds(blogIds)).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

  if (readOnly) {
    return (
      <Typography aria-label="Likes" startDecorator={<Heart />} {...props}>
        {numberFormatter.format(metadata?.like ?? 0)}
      </Typography>
    );
  }
  return <LikeButton blogId={blogId} like={metadata?.like} {...props} />;
};

export const LikesSkeleton: FC<Omit<TypographyProps, 'children'>> = (props) => (
  <Typography aria-label="Likes" startDecorator={<Heart />} {...props}>
    <Box component="span" width="2ch" />
  </Typography>
);
