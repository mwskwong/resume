import { SheetProps } from "@mui/joy";

import { getPlatformProfiles } from "@/api";
import { linkedin } from "@/constants/contentful-ids";

import HeaderClient from "./header-client";

const Header = async (props: SheetProps<"header">) => {
  const platformProfiles = (await getPlatformProfiles()).filter(
    ({ platform }) => platform?.id !== linkedin
  );

  return <HeaderClient platformProfiles={platformProfiles} {...props} />;
};

export default Header;
