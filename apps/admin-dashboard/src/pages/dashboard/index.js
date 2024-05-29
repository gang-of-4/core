import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useSettings } from "../../hooks/use-settings";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { OverviewHelp } from "../../sections/dashboard/overview/overview-help";

const now = new Date();

const Page = () => {
  const settings = useSettings();

  return (
    <>
      <Head>
        <title>Admin Dashboard | Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} md={7}>
              <Stack
                alignItems="center"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                spacing={4}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "primary.darkest"
                      : "primary.lightest",
                  borderRadius: 2.5,
                  p: 4,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 200,
                    "& img": {
                      width: "100%",
                    },
                  }}
                >
                  <img src="/assets/iconly/iconly-glass-info.svg" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography color="primary.main" variant="overline">
                    Admin Dashboard
                  </Typography>
                  <Typography color="text.primary" sx={{ mt: 2 }} variant="h6">
                    Welcome to the admin dashboard!
                  </Typography>
                  <Typography
                    color="text.primary"
                    sx={{ mt: 1 }}
                    variant="body1"
                  >
                    You can navigate between various sections using the side
                    navigation on the left.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} md={5}>
              <OverviewHelp />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
