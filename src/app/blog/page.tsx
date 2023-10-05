import { Container, Grid, Stack, Typography } from '@mui/joy';
import { Metadata, ResolvingMetadata } from 'next';
import { FC, cache } from 'react';

import { BlogCard } from '@/components/blog/blog-card';
import { SectionDivider } from '@/components/section-divider';
import { prisma } from '@/lib/db';
import { getBlogs } from '@/lib/get-blogs';

const getBlogMetadataByIds = cache((ids: string[]) =>
  prisma.blogMetadata.findMany({
    where: { id: { in: ids } },
  }),
);

const Blogs: FC = async () => {
  const blogs = await getBlogs({ page: 1 });
  const metadata = await getBlogMetadataByIds(blogs.map(({ id }) => id));

  return (
    <>
      <Container component="main" sx={{ py: 'var(--Section-paddingY)' }}>
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Blog</Typography>
            <Typography>
              Personal perspectives on a broad range of topics.
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {blogs.map(
              ({ id, updatedAt, coverPhoto = '', slug, ...blog }, index) => (
                <Grid key={slug} md={4} sm={6} xs={12}>
                  <BlogCard
                    coverImgSrc={coverPhoto}
                    date={new Date(updatedAt)}
                    href={`/blog/${slug}`}
                    slotProps={{ image: { priority: index === 0 } }}
                    sx={{ height: { sm: '100%' } }}
                    view={
                      metadata.find(
                        ({ id: blogMetadataId }) => blogMetadataId === id,
                      )?.view
                    }
                    {...blog}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      </Container>
      <SectionDivider bgcolor="var(--Footer-bg)" />
    </>
  );
};

export const revalidate = 3600;

export const generateMetadata = async (
  _: object,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const title = 'Blog';
  const path = '/blog';
  const { openGraph } = await parent;

  return {
    title,
    openGraph: { ...openGraph, title, url: path },
    alternates: { canonical: path },
  };
};

export default Blogs;
