"use client"
import { Stack, Card, CardActionArea, CardContent, Typography, SvgIcon, CardHeader } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CategoryCard from './CategoryCard'
import { ArrowCircleRight } from '@untitled-ui/icons-react'

export default function CategoriesList({ categories }) {
    return (
        <>
            <Card>
                <CardHeader title="Browse Categories" />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        flexWrap: 'wrap'
                    }}
                    px={2}
                >
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            image={category.banner}
                            slug={category.slug}
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
                                        Browse All Cars
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
