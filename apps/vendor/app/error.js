"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { paths } from "ui/paths";

const Page = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          py: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 6,
            }}
          >
            <Box
              alt="Internal server error"
              component="img"
              src="/assets/errors/error-500.png"
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 200,
              }}
            />
          </Box>
          <Typography align="center" variant={mdUp ? "h1" : "h4"}>
            500: Internal Server Error
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
            We are sorry for the inconvenience. Our team is working on fixing
            this issue. Use the navigation below.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Button component={NextLink} href={paths.storefront.index}>
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
