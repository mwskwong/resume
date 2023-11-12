'use client';

import { styled } from '@mui/joy/styles';
import NextImage from 'next/image';
import { ComponentProps } from 'react';

export const Image = styled(NextImage)``;
export type ImageProps = ComponentProps<typeof Image>;
