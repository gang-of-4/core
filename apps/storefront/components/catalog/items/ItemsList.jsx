"use client"
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Item from './Item'

export default function ItemsList({ items }) {
  return (
    <>
      <Box>
        {items && items?.length > 0 ?
          <Stack
            direction="row"
            justifyContent={{
              xs: 'center',
              md: 'flex-start'
            }}
            alignItems="center"
            sx={{
              flexWrap: 'wrap'
            }}
          >
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                sx={{
                  width: 200,
                  marginRight: 1,
                  marginLeft: 0,
                  marginBottom: 1,
                  marginTop: 0
                }}
              />
            ))}
          </Stack>
          :
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center'
            }}
          >
            Could not fetch items, please try again later.
          </Typography>
        }
      </Box>
    </>
  )
}
