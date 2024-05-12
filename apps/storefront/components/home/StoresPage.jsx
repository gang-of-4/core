"use client";
import { Grid, Stack, Typography } from "@mui/material";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

export default function StoresPage() {
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
              <Typography variant="h4">
                {capitalize(config.store.plural)}
              </Typography>
            </Stack>
          </Stack>
          <div>
            <Typography variant="body1">
              This page will display a list of {config.store.plural} available
              in the marketplace.
              <br />
              It will be available in future releases.
            </Typography>
          </div>
        </Stack>
      </Grid>
    </>
  );
}
