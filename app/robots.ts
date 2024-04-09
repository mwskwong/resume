import { MetadataRoute } from 'next';

import { env } from '@/env.mjs';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      disallow: env.VERCEL_ENV === 'production' ? undefined : '/',
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
