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

const NotFound = () => {
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
              alt="Not found"
              component="img"
              src="/assets/errors/error-404.png"
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 200,
              }}
            />
          </Box>
          <Typography align="center" variant={mdUp ? "h1" : "h4"}>
            404: The page you are looking for isn&apos;t here
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation below.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Button component={NextLink} href="/">
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
