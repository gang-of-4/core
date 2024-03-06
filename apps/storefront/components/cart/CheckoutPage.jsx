"use client"
import { Box, Container } from '@mui/material'
import React from 'react'

export default function CheckoutPage() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth={'lg'}>
                Checkout Page
            </Container>
        </Box>
    )
}
