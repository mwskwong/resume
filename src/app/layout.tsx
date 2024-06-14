import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { type FC, type PropsWithChildren } from 'react';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  firstName,
  headline,
  lastName,
  selfIntroduction,
} from '@/constants/content';
import { env } from '@/env.mjs';

import { Providers } from './providers';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html suppressHydrationWarning lang="en">
    <body>
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
      <Analytics
        mode={env.VERCEL_ENV === 'production' ? 'production' : 'development'}
      />
      <SpeedInsights />
    </body>
  </html>
);

const name = `${firstName} ${lastName}`;
export const metadata = {
  title: {
    default: `${name} - ${headline}`,
    template: `%s | ${name}`,
  },
  description: selfIntroduction,
  authors: { name, url: env.NEXT_PUBLIC_SITE_URL },
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  openGraph: { url: '/', type: 'website' },
  robots: { 'max-image-preview': 'large' },
  archives: ['https://v2.mwskwong.com'],
  alternates: { canonical: '/' },
} satisfies Metadata;

export default RootLayout;
