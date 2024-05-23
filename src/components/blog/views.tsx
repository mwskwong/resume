import { Skeleton, Typography, type TypographyProps } from '@mui/joy';
import { Eye } from 'lucide-react';
import { mergeSx } from 'merge-sx';
import { type FC } from 'react';

import { getBlogMetadataById, getBlogsMetadata } from '@/lib/queries';

import { IncrBlogView } from './incr-blog-view';

export interface ViewsProps extends Omit<TypographyProps, 'children'> {
  /**
   * Expected to be used when there are multiple Views mounted in the same page.
   * When batch = true, it will fetch all the metadata at once,
   * cache the response, and do arr.find() on the cached response.
   * The cache will only be valid with in the current server request.
   * This avoids running multiple DB queries in the listing page
   */
  batch?: boolean;
  readOnly?: boolean;
  hideIcon?: boolean;
  blogId: string;
}

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const Views: FC<ViewsProps> = async ({
  batch = false,
  readOnly = false,
  hideIcon = false,
  blogId,
  ...props
}) => {
  const metadata = batch
    ? (await getBlogsMetadata()).find(({ id }) => id === blogId)
    : await getBlogMetadataById(blogId);

  return (
    <>
      {!readOnly && <IncrBlogView blogId={blogId} />}
      <Typography startDecorator={!hideIcon && <Eye />} {...props}>
        {typeof metadata?.view === 'number'
          ? numberFormatter.format(metadata.view)
          : '––'}{' '}
        views
      </Typography>
    </>
  );
};

export type ViewsSkeletonProps = Omit<
  ViewsProps,
  'blogIds' | 'blogId' | 'readOnly'
>;

export const ViewsSkeleton: FC<ViewsSkeletonProps> = ({
  hideIcon,
  ...props
}) => (
  <Typography
    // FIXME: not using sx prop here to prevent CLS
    display={hideIcon ? 'flex' : undefined}
    startDecorator={!hideIcon && <Eye />}
    {...props}
  >
    <Skeleton level={props.level} variant="text" width="3ch" />
    &nbsp;views
  </Typography>
);

export type ViewsErrorProps = ViewsSkeletonProps;
export const ViewsError: FC<ViewsErrorProps> = ({ hideIcon, sx, ...props }) => (
  <Typography
    startDecorator={!hideIcon && <Eye />}
    sx={mergeSx({ display: hideIcon ? 'flex' : undefined }, sx)}
    {...props}
  >
    –– views
  </Typography>
);
