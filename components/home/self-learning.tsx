"use client";

import { ClearRounded, SearchRounded } from "@mui/icons-material";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Grid from "@mui/joy/Grid";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Stack, { StackProps } from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC, useDeferredValue, useMemo, useState } from "react";

import getIconByContentfulId from "@/utils/get-icon-by-contentful-id";

interface Props extends Omit<StackProps, "children"> {
  courses?: {
    institution?: {
      id: string;
      name?: string;
    };
    certificate?: string;
    name?: string;
    categories?: string[];
  }[];
}

const SelfLearning: FC<Props> = ({ courses = [], ...props }) => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const filteredCourses = useMemo(
    () =>
      courses.filter(({ name, institution, categories }) => {
        const searchStr = deferredSearch.toLowerCase();
        return (
          Boolean(name?.toLowerCase().includes(searchStr)) ||
          Boolean(institution?.name?.toLowerCase().includes(searchStr)) ||
          categories?.some((category) =>
            category.toLowerCase().includes(searchStr),
          )
        );
      }),
    [courses, deferredSearch],
  );

  return (
    <Stack spacing={2} {...props}>
      <Input
        size="lg"
        placeholder="Search courses..."
        startDecorator={<SearchRounded />}
        endDecorator={
          search.length > 0 && (
            <IconButton onClick={() => setSearch("")}>
              <ClearRounded />
            </IconButton>
          )
        }
        fullWidth
        sx={{ maxWidth: 400, mx: "auto" }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Grid container spacing={2}>
        {filteredCourses.map(
          ({ name, institution, certificate, categories }) => {
            const Icon = institution && getIconByContentfulId(institution.id);

            return (
              <Grid key={name} xs={12} md={6}>
                <Card
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    ...(certificate && {
                      "&:hover": {
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                      },
                    }),
                  }}
                >
                  {Icon && <Icon color="branding" fontSize="xl2" />}
                  <CardContent sx={{ gap: 1 }}>
                    <Box minHeight={{ md: 68, lg: "unset" }}>
                      {certificate ? (
                        <Link
                          level="title-md"
                          overlay
                          underline="none"
                          href={certificate}
                          target="_blank"
                          sx={{ color: "text.primary" }}
                        >
                          {name}
                        </Link>
                      ) : (
                        <Typography level="title-md">{name}</Typography>
                      )}
                      <Typography level="body-sm">
                        {institution?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {categories?.map((category) => (
                        <Chip key={category} size="sm">
                          {category}
                        </Chip>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          },
        )}
      </Grid>
    </Stack>
  );
};

export default SelfLearning;
