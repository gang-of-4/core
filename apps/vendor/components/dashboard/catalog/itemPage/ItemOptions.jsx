"use client"
import React from 'react'
import {
    Box,
    Card,
    CardHeader,
    Stack,
    Typography,
    FormControl,
    Tooltip
} from '@mui/material';


export default function ItemOptions({ item }) {
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
                title="Options"
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
                    {item?.options.map((group) => (
                        <Stack key={group.id} spacing={3} direction={'row'} alignItems={'center'}>
                            <Typography variant="subtitle1">
                                {group.title}:
                            </Typography>
                            <Stack spacing={1} direction={'row'}>
                                {group.values.map((option, index) => (
                                    <FormControl key={index} component="fieldset">
                                        {
                                            group.type === 'color' ? (
                                                <Stack
                                                    alignItems={'center'}
                                                    justifyContent={'center'}
                                                    marginRight={2}
                                                >
                                                    <Tooltip title={option.label} arrow>
                                                        <Box
                                                            sx={{
                                                                borderRadius: 1,
                                                                width: 25,
                                                                height: 25,
                                                                bgcolor: option.value,
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </Stack>
                                            ) : (
                                                <Typography variant="body1">
                                                    {option.label}
                                                </Typography>
                                            )
                                        }
                                    </FormControl>
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Card>
    )
}
