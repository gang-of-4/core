"use client"
import React from 'react'
import {
    Card,
    CardHeader,
    Stack,
    Typography,
} from '@mui/material';


export default function ItemAttributes({ item }) {
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
                title="Extra Information"
            />
            <Stack
                spacing={4}
                direction='row'
                sx={{ width: '100%' }}
            >
                <Stack
                    spacing={3}
                    sx={{ width: '100%' }}
                >
                    {item?.attributes?.map((attribute, index) => (
                        <Stack key={index} spacing={3} direction={'row'}>
                            <Typography variant="subtitle1">
                                {attribute.attribute.title}:
                            </Typography>
                            <Typography variant="body1">
                                {attribute.value}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Card>
    )
}
