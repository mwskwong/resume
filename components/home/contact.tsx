"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailRounded,
  KeyboardArrowUpRounded,
  LocationOnRounded,
  SendRounded,
  SmartphoneRounded,
  ThumbUpRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  BoxProps,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Sheet,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { address, email, phone } from "@/constants/data";
import { contact, home } from "@/constants/nav";

import formSchema, { FormSchema } from "./form-schema";
import useFormspree from "./use-formspree";

const personalInfo = [
  {
    Icon: SmartphoneRounded,
    title: "Call Me At",
    value: phone,
    url: `tel:${phone}`,
  },
  {
    Icon: EmailRounded,
    title: "Email Me At",
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: LocationOnRounded,
    title: "Find Me At",
    value: address,
    url: "https://www.google.com/maps/place/Hong+Kong",
  },
];

const Contact: FC<BoxProps<"section">> = (props) => {
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const [state, handleFormspreeSubmit] = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? ""
  );

  return (
    <Box component="section" id={contact.id} {...props}>
      <Container>
        <Stack spacing={6}>
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Contact
          </Typography>
          <Grid
            container
            spacing={6}
            disableEqualOverflow
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleFormspreeSubmit)}
          >
            <Grid component="address" container xs={12} md={4} spacing={3}>
              {personalInfo.map(({ Icon, title, value, url }) => (
                <Grid key={title} xs={12} sm={4} md={12}>
                  <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <Icon fontSize="xl4" />
                    <Typography>{title}</Typography>
                    <Link
                      href={url}
                      target={url.startsWith("http") ? "_blank" : undefined}
                    >
                      {value}
                    </Link>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            {state.succeeded ? (
              <Grid xs={12} md={8}>
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  <Sheet
                    color="success"
                    variant="soft"
                    sx={{ display: "flex", borderRadius: "sm", p: 1.5 }}
                  >
                    <ThumbUpRounded fontSize="xl4" />
                  </Sheet>
                  <Typography level="h1" color="primary">
                    Thank You!
                  </Typography>
                  <Typography>
                    {"I've received your message and we'll be in touch soon!"}
                  </Typography>
                  <Button
                    size="lg"
                    endDecorator={<KeyboardArrowUpRounded />}
                    component="a"
                    href={home.href}
                  >
                    Back To Top
                  </Button>
                </Stack>
              </Grid>
            ) : (
              <>
                <Grid
                  // WORKAROUND: nested grid container needs to be a direct child of the parent Grid container to be identified
                  unstable_level={1}
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                  xs={12}
                  md={8}
                >
                  <Grid xs={12} sm={6}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={state.submitting}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={state.submitting}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={state.submitting}
                        >
                          <FormLabel>Subject</FormLabel>
                          <Input {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FormControl
                          error={Boolean(error)}
                          disabled={state.submitting}
                        >
                          <FormLabel>Message</FormLabel>
                          <Textarea minRows={5} maxRows={5} {...field} />
                          <FormHelperText>{error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                {Boolean(state.errors.length) && (
                  <Grid xs={12} md={8} mdOffset={4}>
                    <Stack spacing={1}>
                      {state.errors.map(({ message }, index) => (
                        <Alert key={index} color="danger">
                          {message}
                        </Alert>
                      ))}
                    </Stack>
                  </Grid>
                )}
                <Grid xs={12} sm="auto" smOffset="auto">
                  <Button
                    type="submit"
                    size="lg"
                    startDecorator={<SendRounded />}
                    sx={{ width: "100%" }}
                    loading={state.submitting}
                  >
                    Send Message
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
