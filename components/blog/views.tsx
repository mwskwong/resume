import { Skeleton, Typography, TypographyProps } from '@mui/joy';
import { Eye } from 'lucide-react';
import { FC } from 'react';

import { getBlogMetadataById, getBlogsMetadataByIds } from '@/lib/queries';

import { IncrBlogView } from './incr-blog-view';

export interface ViewsProps extends Omit<TypographyProps, 'children'> {
  /**
   * Expected to be used when there are multiple Views mounted in the same page.
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

export const Views: FC<ViewsProps> = async ({
  blogIds,
  blogId,
  readOnly = false,
  ...props
}) => {
  const metadata = blogIds
    ? (await getBlogsMetadataByIds(blogIds)).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

  return (
    <>
      {!readOnly && <IncrBlogView blogId={blogId} />}
      <Typography startDecorator={<Eye />} {...props}>
        {numberFormatter.format(metadata?.view ?? 0)} views
      </Typography>
    </>
  );
};

export type ViewsSkeletonProps = Omit<TypographyProps, 'children'>;
export const ViewsSkeleton: FC<ViewsSkeletonProps> = (props) => (
  <Typography startDecorator={<Eye />} {...props}>
    <Skeleton level={props.level} variant="text" width="3ch" />
    &nbsp;views
  </Typography>
);
