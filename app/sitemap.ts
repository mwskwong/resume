import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/base-url';
import { blog, guestbook, home } from '@/constants/nav';
import { getBlogs, getPrivacyPolicy } from '@/lib/queries';

const sitemap = async () => {
  const [privacyPolicy, blogs] = await Promise.all([
    getPrivacyPolicy(),
    getBlogs(),
  ]);

  return [
    ...[home.pathname, blog.pathname, guestbook.pathname].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: privacyPolicy.updatedAt,
    },
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
