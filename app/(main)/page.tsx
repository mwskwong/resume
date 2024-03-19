import { Box } from '@mui/joy';
import { FC } from 'react';
import { BreadcrumbList, WithContext } from 'schema-dts';

import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Education } from '@/components/home/education';
import { Experience } from '@/components/home/experience';
import { Hero } from '@/components/home/hero';
import { InterestingFact } from '@/components/home/interesting-fact';
import { SectionDivider } from '@/components/section-divider';

const bgcolors = {
  hero: 'background.body',
  about: 'background.surface',
  interestingFact: 'primary.900',
  experience: 'background.body',
  education: 'background.surface',
  contact: 'background.body',
};

const Home: FC = () => (
  <>
    <Box
      component="main"
      sx={{
        '& h2, h3, h4': {
          scrollMarginTop:
            'calc(var(--Header-height) + var(--Section-paddingY))',
        },
      }}
    >
      <Hero sx={{ bgcolor: bgcolors.hero }} />
      <SectionDivider sx={{ color: bgcolors.hero, bgcolor: bgcolors.about }} />

      <About sx={{ bgcolor: bgcolors.about }} />
      <SectionDivider
        sx={{ color: bgcolors.about, bgcolor: bgcolors.interestingFact }}
      />

      <InterestingFact
        data-joy-color-scheme="dark"
        sx={{ bgcolor: bgcolors.interestingFact }}
      />
      <SectionDivider
        sx={{ color: bgcolors.interestingFact, bgcolor: bgcolors.experience }}
      />

      <Experience sx={{ bgcolor: bgcolors.experience }} />
      <SectionDivider
        sx={{ color: bgcolors.experience, bgcolor: bgcolors.education }}
      />

      <Education sx={{ bgcolor: bgcolors.education }} />
      <SectionDivider
        sx={{ color: bgcolors.education, bgcolor: bgcolors.contact }}
      />

      <Contact sx={{ bgcolor: bgcolors.contact }} />
    </Box>
    <SectionDivider sx={{ bgcolor: 'var(--Footer-bg)' }} />
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              name: 'Home',
              position: 1,
            },
          ],
          name: 'Breadcrumbs',
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export default Home;
