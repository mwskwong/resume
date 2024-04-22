import {
  Box,
  type BoxProps,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/joy';
import { type FC } from 'react';

import { experience } from '@/constants/nav';
import { getContributedProjects, getExperiences } from '@/lib/queries';

import { Logo, logoClasses } from '../contentful';

import { Timeline, TimelineItem } from './timeline';

export type ExperienceProps = Omit<BoxProps<'section'>, 'children'>;
export const Experience: FC<ExperienceProps> = async (props) => {
  const [experiences, contributedProjects] = await Promise.all([
    getExperiences().then((experiences) =>
      experiences.map(
        ({ from, to, jobTitle, company, jobDuties, skills, ...rest }) => ({
          from: new Date(from),
          to: to && new Date(to),
          title: jobTitle,
          organization: company,
          descriptions: jobDuties,
          tags: skills.map(({ name, url }) => ({ label: name, url })),
          ...rest,
        }),
      ),
    ),
    getContributedProjects(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography
            id={experience.id}
            level="h2"
            sx={{ textAlign: 'center' }}
          >
            Experience
          </Typography>
          <Timeline>
            {experiences.map((experience) => (
              <TimelineItem key={experience.title} {...experience} />
            ))}
          </Timeline>
          <Stack spacing={6} sx={{ textAlign: 'center' }}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Typography level="h3">
                Contribution To Open Source Projects
              </Typography>
              <Typography sx={{ maxWidth: 'sm' }}>
                Periodically, I engage in open-source contributions. Below are
                the projects I&apos;ve contributed to thus far.
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                [`& .${logoClasses.colorSchemeLight}`]: {
                  display: 'none',
                },
                '[data-joy-color-scheme="dark"] &': {
                  [`& .${logoClasses.colorSchemeDark}`]: {
                    display: 'none',
                  },
                  [`& .${logoClasses.colorSchemeLight}`]: {
                    display: 'block',
                  },
                },
              }}
            >
              {contributedProjects.map(({ id, name, url }) => (
                <Tooltip key={id} title={name}>
                  <Link href={url} target="_blank">
                    <Logo
                      alt={name}
                      contentfulId={id}
                      height={36}
                      sx={{ objectFit: 'scale-down' }}
                      width={36}
                    />
                  </Link>
                </Tooltip>
              ))}
            </Stack>
            <Typography>...and more to come</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
