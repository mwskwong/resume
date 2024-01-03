import Box, { BoxProps } from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { getPlatformProfiles } from '@/lib/queries';

import { ContentfulIcon } from './contentful-icon';

export type FooterProps = Omit<BoxProps<'footer'>, 'children'>;
export const Footer: FC<FooterProps> = async (props) => {
  const platformProfiles = await getPlatformProfiles();
  const currYear = new Date().getFullYear();

  return (
    <Box component="footer" {...props}>
      <Stack alignItems="center" spacing={2}>
        <Box textAlign="center">
          <Typography level="body-sm">
            {`Copyright © ${currYear} ${lastName.toUpperCase()}, ${firstName} ${middleName}`}
          </Typography>
          <Typography level="body-sm">
            Branding logo designed by{' '}
            <Link
              href="https://www.upwork.com/freelancers/manojk4"
              target="_blank"
              underline="always"
            >
              Manoj Kumar
            </Link>
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {platformProfiles.map(
            ({ platform, url }) =>
              platform && (
                <Tooltip
                  key={platform.id}
                  title={`Go to my ${platform.name} profile`}
                >
                  <IconButton
                    component="a"
                    href={url}
                    size="sm"
                    target="_blank"
                  >
                    <ContentfulIcon contentfulId={platform.id} />
                  </IconButton>
                </Tooltip>
              ),
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
