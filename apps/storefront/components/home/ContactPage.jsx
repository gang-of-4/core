"use client";
import { Grid, Stack, Typography } from "@mui/material";

export default function ContactPage() {
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={4}>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
              <Typography variant="h4">Contact Us</Typography>
            </Stack>
          </Stack>
          <div>
            <Typography variant="body1">
              This page will display contact information for the platform.
              <br />
              It will be available in future releases.
            </Typography>
          </div>
        </Stack>
      </Grid>
    </>
  );
}
