"use client";
import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import Trash01Icon from "@untitled-ui/icons-react/build/esm/Trash01";

export default function CartItemActions({ cartItem, handleRemoveItem }) {
  return (
    <ListItemSecondaryAction>
      <Stack direction="row" spacing={2}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant="subtitle2">x {cartItem.quantity}</Typography>
        </Stack>
        <Tooltip title="Remove">
          <IconButton
            onClick={() => {
              handleRemoveItem(cartItem.id);
            }}
          >
            <SvgIcon>
              <Trash01Icon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItemSecondaryAction>
  );
}
