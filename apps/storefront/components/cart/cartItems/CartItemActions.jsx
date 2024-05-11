"use client";
import React from "react";
import {
  FormControl,
  IconButton,
  ListItemSecondaryAction,
  Select,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import Trash01Icon from "@untitled-ui/icons-react/build/esm/Trash01";
import { useCart } from "@/contexts/CartContext";

export default function CartItemActions({ cartItem, handleRemoveItem }) {
  const { modifyCartItem } = useCart();

  async function handleModifyQuantity(event) {
    const quantity = event.target.value;
    await modifyCartItem({
      id: cartItem.id,
      quantity,
    });
  }

  return (
    <ListItemSecondaryAction>
      <Stack direction="row" spacing={2}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <FormControl size="small" variant="outlined">
            <Select
              native
              value={cartItem.quantity}
              onChange={handleModifyQuantity}
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </FormControl>
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
