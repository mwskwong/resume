import { cache } from 'react';

import { contentful } from './clients';

export const getCv = cache(async () => {
  const asset = await contentful.getAsset('6mTh13ou7wM2Cs7ZC1tcdn');
  return asset.fields.file && `https:${asset.fields.file.url}`;
});
