import { baseUrl } from '@/constants/base-url';
import { email, firstName, lastName } from '@/constants/content';
import { blog, blogRssFeed } from '@/constants/nav';
import { getBlogs } from '@/lib/queries';
import { encodeHtmlEntities } from '@/lib/utils';

export const GET = async () => {
  const blogs = await getBlogs();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${firstName} ${lastName} ${blog.label}</title>
      <link>${baseUrl}${blog.pathname}</link>
      <description>Personal perspectives on a broad range of topics.</description>
      <language>en</language>
      <atom:link href="${baseUrl}${blogRssFeed.pathname}" rel="self" type="application/rss+xml" />
      ${blogs
        .map(
          ({ title, slug, description, categories = [], createdAt, id }) => `
            <item>
              <title>${title}</title>
              <link>${baseUrl}${blog.pathname}/${slug}</link>
              <description>${encodeHtmlEntities(description)}</description>
              <guid isPermaLink="false">${id}</guid>
              <author>${email} (${firstName} ${lastName})</author>
              ${categories.map((category) => `<category>${category}</category>`).join('')}
              <pubDate>${new Date(createdAt).toUTCString()}</pubDate>
            </item>
          `,
        )
        .join('')}
    </channel> 
    </rss>`,
    { headers: { 'Content-Type': 'text/xml' } },
  );
};
