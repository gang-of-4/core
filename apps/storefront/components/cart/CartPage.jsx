"use client";
import { useCart } from "@/contexts/CartContext";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import React from "react";
import NextLink from "next/link";
import CartActions from "./CartActions";
import CartItem from "./cartItems/CartItem";
import CartItemVariant from "./cartItems/CartItemVariant";

export default function CartPage() {
  const { cart, isInitialized, removeCartItem } = useCart();

  async function handleRemoveItem(itemId) {
    await removeCartItem(itemId);
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid
          container
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
          <Grid item xs={12}>
            <Stack spacing={3}>
              <Box
                component={NextLink}
                href={`/catalog/items`}
                color="primary.main"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                  px: 2,
                  pt: 4,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">Back to Catalog</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <CardHeader title="Your Cart" />
              {isInitialized && (
                <>
                  {cart.cartItems && (
                    <List>
                      {cart.cartItems?.map((cartItem) =>
                        cartItem.isVariant ? (
                          <CartItemVariant
                            key={cartItem.id}
                            cartItem={cartItem}
                            handleRemoveItem={handleRemoveItem}
                          />
                        ) : (
                          <CartItem
                            key={cartItem.id}
                            cartItem={cartItem}
                            handleRemoveItem={handleRemoveItem}
                          />
                        )
                      )}
                    </List>
                  )}

                  {cart?.cartItems?.length === 0 && (
                    <Typography
                      marginBottom={2}
                      variant="body1"
                      sx={{ textAlign: "center" }}
                    >
                      Your cart is empty.
                    </Typography>
                  )}

                  <Divider />

                  <CartActions
                    disabled={
                      cart?.cartItems?.length === 0 || !cart.isAvailable
                    }
                    isAvailable={cart.isAvailable}
                  />
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
