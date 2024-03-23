"use client"
import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

export default function Quote() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                borderRadius: 2.5,
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'primary.darkest'
                    : 'primary.lightest',
                p: 4,
                height: '100%'
            }}
        >
            <Box
                sx={{
                    color: 'text.primary',
                    fontFamily: (theme) => theme.typography.fontFamily,
                    fontSize: 32,
                    letterSpacing: '0.3px',
                    py:0,
                    pt: 3
                }}
            >
                <q>
                    What we drive says a lot about who we are
                </q>
            </Box>
            <Box
                sx={{
                    textAlign: 'right',
                    width: '100%',
                    py: 0
                }}
            >
                <Typography
                    color="text.primary"
                >
                    <i>
                        - A car enthusiast
                    </i>
                </Typography>
            </Box>
        </Stack>
    )
}
