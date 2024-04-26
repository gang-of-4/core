"use client";

import { formatPrice } from "@/utils/format-price";
import { capitalize } from "@/utils/format-string";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { config } from "ui/config";

export default function OrderAddress({ address }) {
  return (
    <Card variant="outlined">
      <CardHeader title={"Address"} />
      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <Stack spacing={3} sx={{ width: "100%" }}>
          <Stack
            spacing={3}
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent={"space-between"}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="body2">Country:</Typography>
              <Typography variant="body2">{address?.country}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2">City:</Typography>
              <Typography variant="body2">{address?.city}</Typography>
            </Stack>
          </Stack>
          <Stack
            spacing={3}
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent={"space-between"}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="body2">Stree:</Typography>
              <Typography variant="body2">{address?.street}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2">Postal Code:</Typography>
              <Typography variant="body2">{address?.postalCode}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">Notes:</Typography>
            <Typography variant="body2">{address?.notes}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
