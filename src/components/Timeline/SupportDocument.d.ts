import { ImageDataLike } from "gatsby-plugin-image";

type SupportDocument = {
  title?: string | null,
  url?: string | null,
  thumbnail?: ImageDataLike | null
}

export default SupportDocument;