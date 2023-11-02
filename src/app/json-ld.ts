import { Person } from 'schema-dts';

import { baseUrl } from '@/constants/base-url';
import {
  address,
  email,
  firstName,
  lastName,
  phone,
} from '@/constants/content';
import { getPersonalPhoto } from '@/lib/get-personal-photo';
import { getPlatformProfiles } from '@/lib/get-platform-profiles';

export const getPerson = async () => {
  const personalPhoto = await getPersonalPhoto();
  const platformProfiles = await getPlatformProfiles();

  return {
    '@id': baseUrl,
    '@type': 'Person',
    name: `${firstName} ${lastName}`,
    telephone: phone,
    email,
    address,
    url: baseUrl,
    image: personalPhoto,
    sameAs: platformProfiles.map(({ url }) => url),
  } satisfies Person;
};
