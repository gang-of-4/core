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
import { config } from "ui/config";

export default function CartItemVariant({ cartItem, handleRemoveItem }) {
  return (
    <ListItem disableGutters>
      <ListItemButton
        componentq={NextLink}
        href={`/catalog/items/${cartItem.variant?.parent?.id}`}
        sx={{
          borderRadius: 2,
          padding: 2,
        }}
      >
        <CartItemAvatar
          url={cartItem.variant?.parent?.images?.[0]?.url}
          alt={cartItem.variant?.parent?.name}
        />
        <ListItemText
          primary={
            <Typography
              sx={{ fontWeight: "fontWeightBold" }}
              variant="subtitle1"
            >
              {cartItem.variant?.parent?.name}
            </Typography>
          }
          secondary={
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              {formatPrice({
                price: cartItem.variant?.price,
                currency: cartItem.variant?.currency,
              })}
              <br />
              <span>
                {cartItem.variant?.groups
                  ?.map(
                    (group) =>
                      ` ${group.title}: ${group.options
                        ?.map((option) => option.label)
                        .join(", ")}`
                  )
                  .join("  |  ")}
              </span>
              <br />
              {!cartItem.isAvailable && (
                <span style={{ color: "#F04438" }}>
                  This {config.catalog.item.name} is not available. Please
                  remove it from your {config.cart.name} to proceed.
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
