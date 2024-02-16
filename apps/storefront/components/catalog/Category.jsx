'use client'
import { useItems } from '@/contexts/ItemsContext'
import { Box, Button, Grid, Stack, SvgIcon, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ArrowCircleRight } from '@untitled-ui/icons-react'
import React from 'react'

export default function Category({ category }) {

    const router = useRouter()
    const { setAppliedFilters } = useItems()

    function handleClick() {
        setAppliedFilters({
            ['Category']: [category],
        })
        router.push('/catalog/items')
    }


    return (
        <>

            <Grid item xs={12}>
                <Box
                    component={'img'}
                    src={category.banner.url}
                    alt={category.banner.alt}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                    }}
                    borderRadius={2}
                />
            </Grid>

            <Grid item xs={12}>
                <Stack
                    spacing={4}
                >
                    <Stack
                        spacing={2}
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography variant="h4">
                            {category.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            endIcon={
                                <SvgIcon>
                                    <ArrowCircleRight />
                                </SvgIcon>
                            }
                        >
                            Browse {category.name} Cars
                        </Button>
                    </Stack>
                    <div>
                        <Typography variant="body1">
                            {category.description}
                        </Typography>
                    </div>
                </Stack>
            </Grid>
        </>
    )
}
