"use client"
import { Stack, Card, CardActionArea, CardContent, Typography, SvgIcon, CardHeader, CardActions, Button } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'
import { ArrowCircleRight } from '@untitled-ui/icons-react'
import Item from '../../items/Item'

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
                <CardContent>
                    {items && items?.length > 0 ?
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                flexWrap: 'wrap'
                            }}
                        >
                            {items.map((item) => (
                                <Item
                                    key={item.id}
                                    item={item}
                                    sx={{
                                        width: 200,
                                        marginRight: 2,
                                        marginLeft: 0,
                                        marginBottom: 2,
                                        marginTop: 0
                                    }}
                                />
                            ))}
                        </Stack>
                        :
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center'
                            }}
                        >
                            No featured items
                        </Typography>
                    }
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'end',
                        px: 3,
                        pt: 0,
                        pb: 4
                    }}
                >
                    <Button
                        component={NextLink}
                        href={`/catalog/items`}
                        variant='contained'
                    >
                        Browse All Cars
                        <SvgIcon
                            sx={{
                                marginLeft: 1
                            }}
                        >
                            <ArrowCircleRight />
                        </SvgIcon>
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}
