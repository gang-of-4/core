"use client"
import React from 'react'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Button, OutlinedInput, Stack, SvgIcon, Tooltip } from '@mui/material'
import NextLink from 'next/link'


export default function CartActions() {
    return (
        <Stack
            direction="row"
            justifyContent={'space-between'}
            paddingX={2}
            spacing={2}
            sx={{ mt: 3 }}
        >
            <Stack
                direction="row"
                spacing={2}
            >
                <Tooltip title="To be added" arrow>
                    <OutlinedInput
                        disabled
                        fullWidth
                        placeholder="Promo Code"
                        size="small"
                    />
                </Tooltip>
                <Button
                    disabled
                    variant="outlined"
                >
                    Apply
                </Button>
            </Stack>

            <Button
                component={NextLink}
                href="/checkout"
                endIcon={(
                    <SvgIcon>
                        <ArrowRightIcon />
                    </SvgIcon>
                )}
                sx={{ mt: 3 }}
                variant="outlined"
            >
                Proceed to Checkout
            </Button>
        </Stack >
    )
}
