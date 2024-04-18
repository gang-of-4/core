"use client"
import { Box, Container, Grid, Stack, SvgIcon, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useState } from 'react'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import AddToCart from '../../cart/AddToCart';
import ItemImages from './ItemImages';
import OptionGroup from './OptionGroup';
import { formatPrice } from '@/utils/format-price';


export default function ItemPage({ item }) {

  const [appliedOptions, setAppliedOptions] = useState([]);
  const [activeVariant, setActiveVariant] = useState(initActiveVariant());
  const [isVariant, setIsVariant] = useState(false);
  const [error, setError] = useState();

  function handleOptionChange({ group, value }) {
    const newOptions = {
      ...appliedOptions,
      [group]: value
    };
    setAppliedOptions(newOptions);
    updateActiveVariant(newOptions);
  }

  function initActiveVariant() {
    if (item?.variants && item.variants.length > 0) {
      return null;
    } else {
      return item;
    }
  }

  function updateActiveVariant(newOptions) {

    const newActiveVariant = item.variants.find(variant => {
      if (variant.quantity > 0) {
        return variant.options.every(option => newOptions[option.group_id] === option.id)
      }
    });

    if (newActiveVariant) {
      setError(null);
      setActiveVariant(newActiveVariant);
      setIsVariant(true);
    } else {
      setError('No variant found for selected options. Please select a different combination.')
      setActiveVariant(null);
      setIsVariant(false);
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
                <ItemImages images={item.images} />
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


                  {item.groups?.length > 0 && (
                    <Stack spacing={1}>
                      {
                        item.groups?.map((group, index) => (
                          <OptionGroup
                            key={group.id}
                            index={index}
                            group={group}
                            handleOptionChange={handleOptionChange}
                          />
                        ))
                      }
                    </Stack>
                  )}

                  <Typography
                    variant="h6"
                  >
                    {formatPrice({ price: activeVariant?.price || item.price, currency: activeVariant?.currency || item.currency })}
                  </Typography>

                  <AddToCart activeItem={activeVariant} isVariant={isVariant}/>

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
