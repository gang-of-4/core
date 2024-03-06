"use client"
import { Box, Container } from '@mui/material'
import React from 'react'

export default function CartPage() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth={'lg'}>
                Cart Page
            </Container>
        </Box>
    )
}
