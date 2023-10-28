import { MetadataRoute } from 'next';

import { getBlogs } from '@/lib/get-blogs';
import { baseUrl } from '@/utils/base-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = await getBlogs();

  return [
    ...['/', '/blog'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: updatedAt,
    })),
  ];
};

export default sitemap;
