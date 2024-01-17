import { Button, Container, Stack, Typography } from '@mui/joy';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC, Suspense } from 'react';
import { BreadcrumbList, Graph } from 'schema-dts';

import {
  SubmissionList,
  SubmissionListSkeleton,
} from '@/components/guestbook/submission-list';
import { SectionDivider } from '@/components/section-divider';
import { baseUrl } from '@/constants/base-url';
import { contactForm } from '@/constants/nav';
import { getJsonLdPerson } from '@/lib/utils';

const description =
  'Drop a line in my guestbook. Share your thoughts, stories, or a simple hello.';

const Guestbook: FC = async () => {
  const person = await getJsonLdPerson();

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 'var(--Section-paddingY)' }}
      >
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Typography level="h1">Guestbook</Typography>
            <Typography>{description}</Typography>
          </Stack>
          <Button
            component={Link}
            href={{
              pathname: contactForm.pathname,
              hash: contactForm.id,
              query: { showInGuestbook: true },
            }}
            size="lg"
            sx={{ alignSelf: { sm: 'center' } }}
          >
            Leave A Message
          </Button>
          <Suspense fallback={<SubmissionListSkeleton />}>
            <SubmissionList />
          </Suspense>
        </Stack>
      </Container>
      <SectionDivider bgcolor="var(--Footer-bg)" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    name: 'Home',
                    item: baseUrl,
                    position: 1,
                  },
                  {
                    '@type': 'ListItem',
                    name: 'Guestbook',
                    position: 2,
                  },
                ],
                name: 'Breadcrumbs',
              } satisfies BreadcrumbList,
              person,
            ],
          } satisfies Graph),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export const metadata = {
  title: 'Guestbook',
  description,
  openGraph: { type: 'website', url: '/guestbook' },
} satisfies Metadata;

export default Guestbook;
