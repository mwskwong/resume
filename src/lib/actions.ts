'use server';

import { prisma } from '@/lib/clients';

export const viewBlogById = async (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
