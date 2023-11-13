'use client'

import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Welcome to the Vendor Dashboard
                </Typography>
                <Typography variant="body1">
                  Select a store from the left to manage it.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
