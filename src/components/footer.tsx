import { Box, BoxProps, IconButton, Link, Stack, Typography } from '@mui/joy';
import { FC } from 'react';

import { firstName, lastName, middleName } from '@/constants/content';
import { getPlatformProfiles } from '@/lib/queries';
import { getIconByContentfulId } from '@/utils/get-icon-by-contentful-id';

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
          {platformProfiles.map(({ platform, url }) => {
            const Icon = platform?.id
              ? getIconByContentfulId(platform.id)
              : undefined;

            return (
              <IconButton
                aria-label={`Go to my ${platform?.name ?? ''} profile`}
                component="a"
                href={url}
                key={platform?.id}
                size="sm"
                target="_blank"
              >
                {Icon ? <Icon /> : null}
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
