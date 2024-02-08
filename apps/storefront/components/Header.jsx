"use client"

import React from 'react'
import { Layout as MainLayout } from 'ui/layouts/marketing'
import { Box } from '@mui/material'

export default function Header({ children }) {
  return (
    <>
      <MainLayout>
        {/* pass nav items as props tp main layout */}
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
