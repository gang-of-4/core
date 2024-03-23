"use client"
import React from 'react'
import { Box, Button, Card, CardHeader, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, OutlinedInput, Stack, SvgIcon, Tooltip, Typography } from '@mui/material'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Trash01Icon from '@untitled-ui/icons-react/build/esm/Trash01';
import NextLink from 'next/link'

function formatPrice({ price, currency = 'USD' }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    })
    return formatter.format(price)
}

export default function CartItem({
    cartItem,
    handleRemoveItem
}) {
    return (
        <ListItem
            disableGutters
        >
            <ListItemButton
                componentq={NextLink}
                href={`/catalog/items/${cartItem.item.id}`}
                borderRadius={2}
            >
                <ListItemAvatar sx={{ pr: 2 }}>
                    {
                        cartItem?.item?.images?.[0]?.url ?
                            <Box
                                borderRadius={2}
                                component={'img'}
                                width={100}
                                height={100}
                                src={cartItem.item.images[0].url}
                                alt={cartItem.item.name}
                            />
                            :
                            <Stack
                                borderRadius={2}
                                width={100}
                                height={100}
                                sx={{ bgcolor: 'grey.100' }}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <SvgIcon>
                                    <Image01Icon />
                                </SvgIcon>
                            </Stack>
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={(
                        <Typography
                            sx={{ fontWeight: 'fontWeightBold' }}
                            variant="subtitle2"
                        >
                            {cartItem.item.name}
                        </Typography>
                    )}
                    secondary={(
                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1 }}
                            variant="body1"
                        >
                            {formatPrice({ price: cartItem.item.price, currency: cartItem.item?.currency })}
                        </Typography>
                    )}
                />
            </ListItemButton>
            <ListItemSecondaryAction>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography variant="subtitle2">
                            x {cartItem.quantity}
                        </Typography>
                    </Stack>
                    <Tooltip title="Remove">
                        <IconButton
                            onClick={() => { handleRemoveItem(cartItem.id) }}
                        >
                            <SvgIcon>
                                <Trash01Icon />
                            </SvgIcon>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
