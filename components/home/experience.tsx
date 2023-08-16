import Box, { BoxProps } from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC } from "react";

import { experience } from "@/constants/nav";
import { getExperiences } from "@/lib";

import Timeline from "./timeline";
import TimelineItem from "./timeline-item";

const Experience: FC<Omit<BoxProps<"section">, "children">> = async (props) => {
  const experiences = await getExperiences().then((experiences) =>
    experiences.map(
      ({
        from,
        to,
        jobTitle,
        companies,
        companiesRelationship,
        jobDuties,
        skills,
        supportingDocuments,
      }) => ({
        from: new Date(from),
        to: to && new Date(to),
        title: jobTitle,
        organizations: companies,
        organizationsRelationship: companiesRelationship,
        descriptions: jobDuties,
        tags: skills,
        supportingDocuments,
      }),
    ),
  );

  return (
    <Box component="section" id={experience.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" textAlign="center">
            Experience
          </Typography>
          <Timeline>
            {experiences.map((experience) => (
              <TimelineItem key={experience.title} {...experience} />
            ))}
          </Timeline>
        </Stack>
      </Container>
    </Box>
  );
};

export default Experience;
