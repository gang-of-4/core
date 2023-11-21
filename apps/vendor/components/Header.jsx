"use client"

import { Box } from '@mui/material'
import React from 'react'
import { Layout as MainLayout } from 'ui/layouts/marketing'

export default function Header({ children }) {
  return (
    <>
      <MainLayout app='vendor'>
        <Box
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundImage: 'url("/vendor/assets/gradient-bg.svg")',
            pt: '120px',
            height: '100vh'
          }}
        >
          {children}
        </Box>
      </MainLayout>
    </>
  )
}
