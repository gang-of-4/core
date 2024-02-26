"use client"
import { Box, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, SvgIcon, Typography } from '@mui/material'
import NextLink from 'next/link'
import React, { useState } from 'react'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import AddToCart from './AddToCart';



function formatPrice({ price, currency = 'USD' }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })
  return formatter.format(price)
}

export default function ItemPage({ item }) {

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
                  <Stack spacing={1}>
                    {
                      item.options?.map((group) => (
                        <FormControl
                          key={group.id}
                        >
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            {group.title}
                            </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name={group.title}
                          >
                            {group?.values?.map((option) => (
                              <FormControlLabel 
                                key={option.id}
                                value={option.value} 
                                control={<Radio />} 
                                label={option.label}
                                />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      ))
                    }

                  </Stack>
                  <Typography
                    variant="h6"
                  >
                    {formatPrice({ price: item.price, currency: item.currency })}
                  </Typography>
                  <AddToCart item={item} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
