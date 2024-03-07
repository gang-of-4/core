"use client"
import { Box, Container, Grid, Stack, SvgIcon, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useState } from 'react'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import AddToCart from '../../cart/AddToCart';
import ItemImages from './ItemImages';
import OptionGroup from './OptionGroup';



function formatPrice({ price, currency = 'USD' }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })
  return formatter.format(price)
}

export default function ItemPage({ item }) {

  const [appliedOptions, setAppliedOptions] = useState([]);
  const [images, setImages] = useState(item?.images || []);
  const [activeVariant, setActiveVariant] = useState(item?.variants ? item.variants[0] : item);
  const [error, setError] = useState();

  function handleOptionChange(event) {
    const { name, value } = event.target;
    const newOptions = {
      ...appliedOptions,
      [name]: value
    }
    setAppliedOptions(newOptions);

    updateActiveVariant(newOptions);
  }

  function updateActiveVariant(newOptions) {
    const newActiveVariant = item.variants.find((variant) => {
      return variant.options.every((option) => {
        return newOptions[option.title] === option.value.value;
      });
    });

    if (newActiveVariant) {
      setError(null);
      setActiveVariant(newActiveVariant);
      setImages(newActiveVariant?.images || item.images);
    } else {
      setError('No variant found for selected options. Please select a different combination.')
    }
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
                <ItemImages images={images} />
              </Grid>

              <Grid item xs={12} md={7}>
                <Stack spacing={4}>

                  <Typography
                    variant="h4"
                  >
                    {activeVariant?.name || item.name}
                  </Typography>

                  <Typography variant="body1" color='text.secondary'>
                    {activeVariant?.description || item.description}
                  </Typography>

                  <Stack spacing={1}>
                    {
                      item.options?.map((group, index) => (
                        <OptionGroup
                          key={group.id}
                          index={index}
                          group={group}
                          handleOptionChange={handleOptionChange}
                        />
                      ))
                    }
                  </Stack>

                  <Typography
                    variant="h6"
                  >
                    {formatPrice({ price: activeVariant?.price || item.price, currency: activeVariant?.currency || item.currency })}
                  </Typography>

                  <AddToCart item={activeVariant} isButtonDisabled={!!error} />

                  <Stack
                    spacing={1}
                  >
                    {error && (
                      <Typography
                        color="error"
                        variant="body2"
                      >
                        {error}
                      </Typography>
                    )}
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
