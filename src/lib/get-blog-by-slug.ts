import { orderBy } from 'lodash-es';
import { cache } from 'react';

import { contentful } from './client';
import { BlogSkeleton } from './types';

export const getBlogBySlug = cache(async (slug: string) => {
  const { items } = await contentful.getEntries<BlogSkeleton>({
    select: ['sys.id', 'sys.updatedAt', 'fields'],
    content_type: 'blog',
    'fields.slug[in]': [slug],
    limit: 1,
  });

  const item = items[0];
  return (
    item && {
      id: item.sys.id,
      updatedAt: item.sys.updatedAt,
      coverPhoto:
        item.fields.coverPhoto?.fields.file &&
        `https:${item.fields.coverPhoto.fields.file.url}`,
      categories: orderBy(
        item.fields.categories
          ?.map((category) => category?.fields.name)
          .filter((category): category is string => Boolean(category)),
      ),
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
    }
  );
});
