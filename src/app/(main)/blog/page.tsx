import {
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { type Metadata, type ResolvingMetadata } from 'next';
import NextLink from 'next/link';
import { type FC, Suspense } from 'react';
import { type BreadcrumbList, type Graph } from 'schema-dts';

import { BlogCardImage } from '@/components/blog/blog-card-image';
import { Views, ViewsError, ViewsSkeleton } from '@/components/blog/views';
import { ErrorBoundary } from '@/components/error-boundary';
import { SectionDivider } from '@/components/section-divider';
import { blog, blogRssFeed, home } from '@/constants/nav';
import { env } from '@/env.mjs';
import { webSite } from '@/lib/json-ld';
import { getBlogs } from '@/lib/queries';

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

const description = 'Personal perspectives on a broad range of topics.';

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });
  const blogIds = blogs.map(({ id }) => id);

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={8}>
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <Typography level="h1">{blog.label}</Typography>
            <Typography>{description}</Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              (
                {
                  id,
                  createdAt,
                  coverPhoto,
                  slug,
                  title,
                  description,
                  categories,
                },
                index,
              ) => (
                <Grid key={id} md={4} sm={6} xs={12}>
                  <Card component="article" sx={{ height: { sm: '100%' } }}>
                    {coverPhoto ? (
                      <BlogCardImage
                        alt={`Thumbnail for ${title}`}
                        priority={index === 0}
                        src={coverPhoto}
                      />
                    ) : null}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: 'wrap' }}
                    >
                      {categories?.map((category) => (
                        <Chip key={category} color="primary">
                          {category}
                        </Chip>
                      ))}
                    </Stack>
                    <CardContent>
                      <Link
                        overlay
                        color="neutral"
                        component={NextLink}
                        href={`${blog.pathname}/${slug}`}
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          typography: 'title-lg',
                        }}
                      >
                        {title}
                      </Link>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                    <CardContent orientation="horizontal" sx={{ flex: 0 }}>
                      <Typography level="body-sm">
                        {dateFormatter.format(new Date(createdAt))}
                      </Typography>
                      <Divider orientation="vertical" />
                      <ErrorBoundary
                        fallback={<ViewsError hideIcon level="body-sm" />}
                      >
                        <Suspense
                          fallback={<ViewsSkeleton hideIcon level="body-sm" />}
                        >
                          <Views
                            hideIcon
                            readOnly
                            blogId={id}
                            blogIds={blogIds}
                            level="body-sm"
                          />
                        </Suspense>
                      </ErrorBoundary>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Container>
      <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              webSite,
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: home.label,
                    item: env.NEXT_PUBLIC_SITE_URL,
                    position: 1,
                  },
                  {
                    '@type': 'ListItem',
                    name: blog.label,
                    position: 2,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: blog.label,
    description,
    openGraph: { ...openGraph, url: blog.pathname },
    alternates: {
      canonical: blog.pathname,
      types: { 'application/rss+xml': blogRssFeed.pathname },
    },
  } satisfies Metadata;
};

export default Blogs;
