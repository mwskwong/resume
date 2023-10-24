import { Box, BoxProps, Container, Stack, Typography } from '@mui/joy';
import { unstable_cache as cache } from 'next/cache';
import { FC } from 'react';

import { education } from '@/constants/nav';
import { getCourses } from '@/lib/get-courses';
import { getEducations } from '@/lib/get-educations';

import { SelfLearning } from './self-learning';
import { Timeline, TimelineItem } from './timeline';

export type EducationProps = Omit<BoxProps<'section'>, 'children'>;
export const Education: FC<EducationProps> = async (props) => {
  const [educations, courses] = await Promise.all([
    cache(getEducations)().then((educations) =>
      educations.map(({ from, to, program, school, supportingDocuments }) => ({
        from: new Date(from),
        to: to && new Date(to),
        title: program,
        organizations: school && [school],
        supportingDocuments,
      })),
    ),
    cache(getCourses)(),
  ]);

  return (
    <Box component="section" {...props}>
      <Container>
        <Stack spacing={8}>
          <Typography id={education.id} level="h2" textAlign="center">
            Education
          </Typography>
          <Timeline>
            {educations.map((education) => (
              <TimelineItem key={education.title} {...education} />
            ))}
          </Timeline>
          <SelfLearning courses={courses} />
        </Stack>
      </Container>
    </Box>
  );
};
