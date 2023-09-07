import { KeyboardArrowRightRounded } from '@mui/icons-material';
import {
  Button,
  Container,
  Grid,
  Link,
  Sheet,
  SheetProps,
  Stack,
  Typography,
} from '@mui/joy';
import mergeSx from 'merge-sx';
import { FC } from 'react';

import { websiteTechStack } from '@/constants/content';

export type FunFactProps = Omit<SheetProps<'section'>, 'children'>;
export const FunFact: FC<FunFactProps> = ({ sx, ...props }) => (
  <Sheet
    color="primary"
    component="section"
    invertedColors
    sx={mergeSx(
      {
        // TODO: contrast not enough. May be this will change in the future?
        '--joy-palette-text-secondary': 'var(--joy-palette-primary-100)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-primary-200)',
      },
      sx,
    )}
    variant="solid"
    {...props}
  >
    <Container>
      <Stack alignItems={{ sm: 'center' }} spacing={6} textAlign="center">
        <Stack spacing={2}>
          <Typography level="h2">Fun Fact</Typography>
          <Typography>
            This website is built on top of the following technologies and
            platforms.
          </Typography>
        </Stack>
        <Grid
          container
          disableEqualOverflow
          justifyContent="center"
          spacing={6}
        >
          {websiteTechStack.map(({ name, Icon, url }) => (
            <Grid key={name} sm={3} xs={6}>
              <Stack alignItems="center" position="relative" spacing={2}>
                <Icon fontSize="xl6" />
                <Link
                  href={url}
                  overlay
                  target="_blank"
                  textColor="text.secondary"
                  underline="none"
                >
                  {name}
                </Link>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography>...and more</Typography>
        <Button
          component="a"
          endDecorator={<KeyboardArrowRightRounded />}
          href="https://github.com/mwskwong/resume"
          size="lg"
          target="_blank"
        >
          See The Source Code
        </Button>
      </Stack>
    </Container>
  </Sheet>
);
