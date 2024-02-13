'use client'
import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'


// TODO: finalize this page
export default function page({ params }) {

  return (
    <Grid item xs={12}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <div>
          <Typography variant="h4">
            {params.slug}
          </Typography>
        </div>
      </Stack>
    </Grid>
  )
}
