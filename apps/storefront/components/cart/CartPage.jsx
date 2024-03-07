"use client"
import { useCart } from '@/contexts/CartContext';
import { Box, Container } from '@mui/material'
import React from 'react'

export default function CartPage() {

    const { cartItems } = useCart();

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth={'lg'}>
                Cart Page

                <Box>
                    {JSON.stringify(cartItems, null, 2)}
                </Box>
            </Container>
        </Box>
    )
}
