"use client";
import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { formatPrice } from "@/utils/format-price";
import CartItemAvatar from "./CartItemAvatar";
import CartItemActions from "./CartItemActions";

export default function CartItemVariant({ cartItem, handleRemoveItem }) {
  return (
    <ListItem disableGutters>
      <ListItemButton
        componentq={NextLink}
        href={`/catalog/items/${cartItem.item?.parent?.id}`}
        sx={{
          borderRadius: 2,
          padding: 2,
        }}
      >
        <CartItemAvatar
          url={cartItem.item?.parent?.images?.[0]?.url}
          alt={cartItem.item?.parent?.name}
        />
        <ListItemText
          primary={
            <Typography
              sx={{ fontWeight: "fontWeightBold" }}
              variant="subtitle2"
            >
              {cartItem.item?.parent?.name}
            </Typography>
          }
          secondary={
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body1">
              {formatPrice({
                price: cartItem.item.price,
                currency: cartItem.item?.currency,
              })}
              <br />
              <span>
                {cartItem.item?.options
                  ?.map((option) => option.label)
                  .join(", ")}
              </span>
              <br />
              {!cartItem.isAvailable && (
                <span style={{ color: "#F04438" }}>
                  This item is not available. Please remove it from your cart to
                  proceed.
                </span>
              )}
            </Typography>
          }
        />
      </ListItemButton>
      <CartItemActions
        cartItem={cartItem}
        handleRemoveItem={handleRemoveItem}
      />
    </ListItem>
  );
}
