"use client"
import { Fragment } from 'react';
import {
    Card,
    CardHeader,
    Stack,
    Typography,
} from '@mui/material';
import { formatPrice } from '@/utils/format-price';




export default function ItemBasicInfo({ item }) {
    return (
        <Card
            elevation={16}
            sx={{
                p: 3,
                mb: 3
            }}
        >
            <CardHeader
                sx={{ pt: 0, pb: 3 }}
                title="Basic Information"
            />

            <Stack
                spacing={3}
                direction='row'
                sx={{ width: '100%' }}
            >

                <Stack
                    spacing={3}
                    sx={{ width: '100%' }}
                >
                    <Stack>
                        <Typography variant="subtitle1">SKU:</Typography>
                        <Typography variant="body1">
                            {item.sku ? item.sku : 'N/A'}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="subtitle1">Categories:</Typography>
                        {
                            item?.categories?.length !== 0 ?
                                <Typography variant="body1">
                                    {item?.categories[0]?.name}
                                    {
                                        item.categories.slice(1).map((category, index) => (
                                            <Fragment key={index}>
                                                , {category.name}
                                            </Fragment>
                                        ))
                                    }
                                </Typography>
                                : <Typography variant="body1">N/A</Typography>
                        }
                    </Stack>

                    <Stack>
                        <Typography variant="subtitle1">Description:</Typography>
                        <Typography variant="body1">
                            {item.description}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    justifyContent={'space-between'}
                    sx={{ width: '100%' }}

                >
                    <Stack
                        spacing={3}
                    >
                        <Stack>
                            <Typography variant="subtitle1">Quantity:</Typography>
                            <Typography variant="body1">
                                {item.quantity ?? 'N/A'}
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography variant="subtitle1">Price:</Typography>
                            <Typography variant="body1">
                                {item.price ?
                                    formatPrice({
                                        price: item.price,
                                        currency: item.currency
                                    }) : 'N/A'
                                }
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
        </Card>
    )
}
