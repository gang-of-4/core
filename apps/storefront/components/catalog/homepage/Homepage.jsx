'use client'

import { Grid } from '@mui/material'
import React from 'react'
import CategoriesList from './categories/CategoriesList'
import FeaturedItems from './featured-items/FeaturedItems'

export default function Homepage({ categories, featuredItems }) {
    return (
        <>
            <Grid item xs={12}>
                <CategoriesList categories={categories} />
            </Grid>
            <Grid item xs={6}>
                <FeaturedItems items={featuredItems} />
            </Grid>

        </>
    )
}
