"use client"
import React from 'react'
import {
    Box,
    Card,
    CardHeader,
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { formatPrice } from '@/utils/format-price';

export default function ItemVariants({ item }) {
    return (
        <Card
            elevation={16}
            sx={{
                p: 3,
            }}
        >
            <CardHeader
                sx={{ pt: 0, pb: 3 }}
                title="Variants Information"
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Options</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item?.variants?.map((variant, index) => (
                        <TableRow key={index}>

                            <TableCell>
                                {variant.name ? variant.name : item.name}
                            </TableCell>

                            <TableCell>
                                <Stack spacing={1}>
                                    {
                                        variant?.options?.map((option, index) => {
                                            if (option.type === 'color') {
                                                return (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            borderRadius: 1,
                                                            width: 25,
                                                            height: 25,
                                                            bgcolor: option.value.value,
                                                        }}
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <Typography key={index} variant="body1">
                                                        {option.title}: {option.value.label}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Stack>
                            </TableCell>

                            <TableCell>
                                {variant.quantity}
                            </TableCell>

                            <TableCell>
                                {formatPrice({
                                    price: variant.price ? variant.price : item.price,
                                    currency: variant.currency ? variant.currency : item.currency
                                })}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
