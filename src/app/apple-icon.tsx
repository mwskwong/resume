import { ImageResponse } from 'next/og';

import Icon from '@/app/icon.svg';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const appleIcon = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '22.5%',
          background: '#FFF', // --joy-palette-background-body
        }}
      >
        {/* --joy-palette-primary-plainColor */}
        <Icon fill="#0B6BCB" width="100%" />
      </div>
    ),
    size,
  );

export default appleIcon;
