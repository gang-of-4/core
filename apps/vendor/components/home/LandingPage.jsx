"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { config } from "ui/config";
import { Footer } from "ui/layouts/marketing/footer";

export default function LandingPage() {
  return (
    <Stack
      sx={{
        height: "100%",
      }}
      direction="column"
      justifyContent="space-between"
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={"lg"}>
          <Box maxWidth="sm">
            <Typography variant="h1" sx={{ mb: 2 }}>
              Create your own {config.store.name} in&nbsp;
              <Typography
                component="span"
                color="primary.main"
                variant="inherit"
              >
                {config.platformName}
              </Typography>
              .
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {config.store.desciption}
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                component={NextLink}
                href={"/dashboard"}
                sx={(theme) =>
                  theme.palette.mode === "dark"
                    ? {
                        backgroundColor: "neutral.50",
                        color: "neutral.900",
                        "&:hover": {
                          backgroundColor: "neutral.200",
                        },
                      }
                    : {
                        backgroundColor: "neutral.900",
                        color: "neutral.50",
                        "&:hover": {
                          backgroundColor: "neutral.700",
                        },
                      }
                }
                variant="contained"
              >
                Become a Vendor
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}
