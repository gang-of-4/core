"use client"
import { Stack, Card, CardActionArea, CardContent, Typography, SvgIcon, CardHeader } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { ArrowCircleRight } from '@untitled-ui/icons-react'
import Item from '../Item'

export default function FeaturedItems({ items }) {
    return (
        <>
            <Card
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'primary.darkest'
                        : 'primary.lightest',
                }}
            >
                <CardHeader title="Featured Cars" />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        flexWrap: 'wrap'
                    }}
                    px={2}
                >
                    {items.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <Card
                        sx={{
                            width: 150,
                            marginRight: 2,
                            marginLeft: 0,
                            marginBottom: 2,
                            marginTop: 0
                        }}>
                        <CardActionArea>
                            <Link href={`/catalog/items`}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        height: 200,
                                        backgroundColor: 'primary.main',
                                        color: 'white'
                                    }}
                                >
                                    <SvgIcon
                                        color="white"
                                        sx={{
                                            fontSize: 75
                                        }}
                                    >
                                        <ArrowCircleRight />
                                    </SvgIcon>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        align='center'
                                    >
                                        Browse All Items
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Card>
        </>
    )
}
