"use client";
import React from "react";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Button,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

export default function CartActions({ disabled, isAvailable }) {
  return (
    <Stack spacing={2}>
      {!isAvailable && (
        <Typography color="error" sx={{ mt: 1 }} variant="body1">
          One or more items in your cart are not available. Please check your
          cart and try again.
        </Typography>
      )}

      <Stack
        direction="row"
        justifyContent={"space-between"}
        paddingX={2}
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Stack direction="row" spacing={2}>
          <Tooltip title="To be added" arrow>
            <OutlinedInput
              disabled
              fullWidth
              placeholder="Promo Code"
              size="small"
            />
          </Tooltip>
          <Button disabled variant="outlined">
            Apply
          </Button>
        </Stack>

        <Button
          component={NextLink}
          disabled={disabled}
          href="/checkout"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          sx={{ mt: 3 }}
          variant="outlined"
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </Stack>
  );
}
