"use client"
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Minus from '@untitled-ui/icons-react/build/esm/Minus';


function formatPrice({ price, currency = 'USD' }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })
  return formatter.format(price)
}

export default function ItemPage({ item }) {

  // @TODO: integrate with the cart context
  // to be replaced with the actual cart state using context in sprint 4
  // the Add to Cart button could be moved to a separate component
  const [cart, setCart] = useState([]);

  function handleUpdateCart({ item, amount }) {

    if (amount === -1 && cart.find((cartItem) => cartItem.id === item.id)?.cartAmount === 1) {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(newCart);
      return;
    }

    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart([
        ...cart,
        {
          ...item,
          cartAmount: amount
        }
      ]);
      return;
    }

    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          cartAmount: cartItem.cartAmount + amount
        }
      }
      return cartItem
    })
    setCart(newCart);
  }

  const [appliedOptions, setAppliedOptions] = useState([]);

  const [activeImage, setActiveImage] = useState(0);

  function onChange({ index, option, event }) {

    if (event.target.checked) {
      setAppliedOptions({
        ...appliedOptions,
        [index]: option
      });
    } else {
      setAppliedOptions(
        {
          ...appliedOptions,
          [index]: undefined
        }
      )
    }
  }

  function isChecked({ index, option }) {
    return appliedOptions[index] === option;
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
          <Grid
            item
            xs={12}>
            <Grid
              container
              spacing={4}
            >
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack alignItems='center'>
                  <Box
                    borderRadius={2}
                    component={'img'}
                    width={500}
                    height={500}
                    src={item?.images[activeImage]?.url}
                    alt={item.name}
                  />
                  <Stack
                    marginTop={2}
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    {
                      item?.images?.map((image, index) => (
                        <Box
                          key={index}
                          borderRadius={2}
                          component={'img'}
                          width={100}
                          height={100}
                          src={image.url}
                          alt={item.name}
                          onClick={() => setActiveImage(index)}
                          sx={{
                            cursor: 'pointer',
                            opacity: activeImage === index ? 1 : 0.5
                          }}
                        />
                      ))
                    }
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack spacing={4}>
                  <Typography
                    variant="h4"
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color='text.secondary'>
                    {item.description}
                  </Typography>

                  <Stack spacing={1}>
                    {
                      item.options?.map((group) => (
                        <div key={group.id}>
                          <Stack
                            alignItems="center"
                            direction="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <Typography
                              color="text.secondary"
                              variant="overline"
                            >
                              {group.title}
                            </Typography>
                          </Stack>
                          <Stack
                            alignItems="center"
                            direction="row"
                            flexWrap="wrap"
                            justifyContent={'flex-start'}
                            columnGap={1}
                          >
                            {group?.values?.map((option) => (
                              <FormControlLabel
                                key={option.id}
                                control={(
                                  <Checkbox
                                    checked={isChecked({ index: group.title, option })}
                                    onChange={(event) => onChange({ index: group.title, option, event })}
                                    value={option.value}
                                    name={option.label}
                                  />
                                )}
                                label={option.label}
                              />
                            ))}
                          </Stack>
                        </div>
                      ))
                    }

                  </Stack>
                  <Typography
                    variant="h6"
                  >
                    {formatPrice({ price: item.price, currency: item.currency })}
                  </Typography>
                  <Stack
                    direction={{
                      xs: 'column',
                      md: 'row'
                    }}
                    spacing={2}
                  >
                    {
                      cart.find((cartItem) => cartItem.id === item.id && cartItem.cartAmount > 0) ? (
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={1}
                        >
                          <IconButton
                            onClick={() => handleUpdateCart({ item, amount: -1 })}
                            sx={{
                              color: 'primary.main'
                            }}
                            disabled={cart.find((cartItem) => cartItem.id === item.id)?.cartAmount === 0}
                          >
                            <SvgIcon>
                              <Minus />
                            </SvgIcon>
                          </IconButton>
                          <TextField
                            value={cart.find((cartItem) => cartItem.id === item.id)?.cartAmount}
                            InputProps={{
                              readOnly: true,
                            }}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                cursor: 'default',
                              }
                            }}
                            variant='outlined'
                            size='small'
                            sx={{ width: 50 }}
                          />
                          <IconButton
                            onClick={() => handleUpdateCart({ item, amount: 1 })}
                            sx={{
                              color: 'primary.main'
                            }}
                            disabled={cart.find((cartItem) => cartItem.id === item.id)?.cartAmount === cart.find((cartItem) => cartItem.id === item.id)?.quantity}
                          >
                            <SvgIcon>
                              <PlusIcon />
                            </SvgIcon>
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={(
                            <SvgIcon>
                              <PlusIcon />
                            </SvgIcon>
                          )}
                          onClick={() => handleUpdateCart({ item, amount: 1 })}
                        >
                          Add to Cart
                        </Button>
                      )
                    }
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
