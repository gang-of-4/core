"use client"
import { useCart } from '@/contexts/CartContext';
import { Box, Button, Card, CardHeader, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, OutlinedInput, Stack, SvgIcon, Tooltip, Typography } from '@mui/material'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Trash01Icon from '@untitled-ui/icons-react/build/esm/Trash01';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import React from 'react'
import NextLink from 'next/link'
import CartActions from './CartActions';
import CartItem from './CartItem';


export default function CartPage() {

  const { cartItems, removeFromCart } = useCart();

  async function handleRemoveItem(itemId) {
    await removeFromCart(itemId);
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid
          container
          spacing={{
            xs: 3,
            lg: 4
          }}
        >

          <Grid item xs={12}>
            <Stack spacing={3}>
              <Box
                component={NextLink}
                href={`/catalog/items`}
                color="primary.main"

                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  px: 2,
                  pt: 4,
                  ":hover": {
                    textDecoration: "underline",
                  }
                }}>
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">
                  Back to Catalog
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{ p: 3 }}
            >
              <CardHeader title="Your Cart" />

              <List>
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))}
              </List>

              <Divider />

              <CartActions />

            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box >
  )
}