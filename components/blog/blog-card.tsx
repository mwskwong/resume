"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import Card, { CardProps } from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useTheme } from "@mui/joy/styles";
import { StaticImageData } from "next/image";
import NextLink from "next/link";
import { FC } from "react";

import Image from "@/components/image";

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface Props extends CardProps {
  coverImgSrc: string | StaticImageData;
  categories?: string[];
  title?: string;
  href?: string;
  updatedAt?: Date;
}

const BlogCard: FC<Props> = ({
  coverImgSrc,
  categories = [],
  title,
  href = "",
  updatedAt,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Card component="article" variant="outlined" {...props}>
      <AspectRatio
        ratio="1200/630"
        variant="outlined"
        sx={{ position: "relative" }}
      >
        <Image
          src={coverImgSrc}
          alt=""
          fill
          sizes={[
            `${theme.breakpoints.up("md")} ${Math.round((4 / 12) * 100)}vw`,
            `${theme.breakpoints.up("sm")} ${Math.round((6 / 12) * 100)}vw`,
            "100vw",
          ].join(",")}
          sx={{ objectFit: "cover" }}
        />
      </AspectRatio>
      <Stack direction="row" spacing={1}>
        {categories.map((category) => (
          <Chip key={category} color="primary" size="sm">
            {category}
          </Chip>
        ))}
      </Stack>
      <Link
        component={NextLink}
        color="neutral"
        textColor="text.primary"
        level="title-lg"
        overlay
        href={href}
      >
        {title}
      </Link>
      <Typography level="body-xs">{dateFormatter.format(updatedAt)}</Typography>
    </Card>
  );
};

export default BlogCard;
