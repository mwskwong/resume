import { privacyPolicy } from '@/constants/nav';
import { createImage } from '@/og-images/route';

export * from '@/og-images/config';
export const runtime = 'edge';

export default createImage(privacyPolicy.label);
