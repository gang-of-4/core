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
                    <Stack
                        spacing={3}
                        direction={'row'}
                    >
                        <Typography variant="subtitle1">Name:</Typography>
                        <Typography variant="body1">
                            {item.name}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="subtitle1">Categories:</Typography>
                        <Typography variant="body1">
                            {item?.categories[0]?.name}
                            {
                                item.categories.slice(1).map((category, index) => (
                                    <Fragment key={index}>
                                        &nbsp;&nbsp;&gt;&nbsp;&nbsp;{category.name}
                                    </Fragment>
                                ))
                            }
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
                        <Stack
                            spacing={3}
                            direction={'row'}
                        >
                            <Typography variant="subtitle1">Price:</Typography>
                            <Typography variant="body1">
                                {formatPrice({
                                    price: item.price,
                                    currency: item.currency
                                })}
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography variant="subtitle1">Description:</Typography>
                            <Typography variant="body1">
                                {item.description}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
        </Card>
    )
}
