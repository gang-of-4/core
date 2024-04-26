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

export default function OrderOverview({ order }) {
  return (
    <Card variant="outlined">
      <CardHeader title={"Overview"} />
      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <Stack
          spacing={3}
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">
              {capitalize(config.order.name)} Date:
            </Typography>
            <Typography variant="body2">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">Total Price:</Typography>
            <Typography variant="body2">
              {formatPrice({ price: order.total })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
