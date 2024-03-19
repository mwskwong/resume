'use client';

import { Button, Container, Link, Stack, Typography } from '@mui/joy';
import { RefreshCw } from 'lucide-react';
import { FC } from 'react';

import { email } from '@/constants/content';

const Error: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => (
  <Container
    component="main"
    maxWidth="md"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    }}
  >
    <Typography color="primary" fontSize="8rem" level="h1">
      Oops
    </Typography>
    <Stack alignItems={{ sm: 'center' }} spacing={2}>
      <Typography level="h2">Something went wrong</Typography>
      <Typography>
        {error.message + (/[.!?]$/.test(error.message) ? '' : '.')} Please{' '}
        <Link href={`mailto:${email}`}>contact me</Link>
        {error.digest ? (
          <>
            {' with this error digest: '}
            <Typography fontFamily="code" fontSize="0.875em" variant="soft">
              {error.digest}
            </Typography>
          </>
        ) : null}{' '}
        to report the issue.
      </Typography>
      <Button onClick={reset} size="lg" startDecorator={<RefreshCw />}>
        Try Again
      </Button>
    </Stack>
  </Container>
);

export default Error;
