"use client"
import React from 'react'
import {
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { formatPrice } from '@/utils/format-price';
import VariantOptions from './VariantOptions';

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
                        <TableCell>SKU</TableCell>
                        <TableCell>Options</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item?.variants?.map((variant, index) => (
                        <TableRow key={index}>

                            <TableCell>
                                {variant.sku ? variant.sku : item.sku}
                            </TableCell>

                            <TableCell>
                                <VariantOptions options={variant?.options} />
                            </TableCell>

                            <TableCell>
                                {variant.quantity ? variant.quantity : '0'}
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
