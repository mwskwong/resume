'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cache } from 'react';

import { prisma } from '@/lib/clients';

export const incrBlogViewById = cache(async (id: string) => {
  noStore();
  await prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
});

export const likeBlog = async (visitorId: string, blogId: string) => {
  noStore();
  await prisma.like.create({ data: { visitorId, blogId } });
};

export const unlikeBlog = async (visitorId: string, blogId: string) => {
  noStore();
  await prisma.like.delete({
    where: { visitorId_blogId: { visitorId, blogId } },
  });
};
