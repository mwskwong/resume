import { SiLinkedin } from '@icons-pack/react-simple-icons';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { firstName, headline, lastName } from '@/constants/content';
import { linkedin } from '@/constants/contentful-ids';
import { getCv, getPlatformProfiles } from '@/lib/queries';

export type HeroProps = Omit<BoxProps<'section'>, 'children'>;
export const Hero: FC<HeroProps> = async (props) => {
  const [cv, linkedinProfile] = await Promise.all([
    getCv(),
    getPlatformProfiles().then((platformProfiles) =>
      platformProfiles.find(({ platform }) => platform?.id === linkedin),
    ),
  ]);

  return (
    <Box component="section" pt={{ sm: 16 }} {...props}>
      <Container>
        <Stack justifyContent="center" spacing={5}>
          <Stack spacing={2} textAlign="center">
            <Typography level="body-sm">Hello</Typography>
            <Typography level="h1">
              {"I'm "}
              <Typography color="primary">{firstName}</Typography> {lastName}
            </Typography>
            <Typography level="title-lg">{headline}</Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            spacing={2}
          >
            <Button component="a" href={cv} size="lg" target="_blank">
              Download CV
            </Button>
            <Button
              color="neutral"
              component="a"
              href={linkedinProfile?.url}
              size="lg"
              startDecorator={<SiLinkedin />}
              target="_blank"
              variant="outlined"
            >
              {linkedinProfile?.platform?.name}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};