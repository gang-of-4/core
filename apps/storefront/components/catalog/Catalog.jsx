'use client'
import React, { useEffect, useState } from 'react'
import Filters from './filters/Filters'
import ItemsList from './items/ItemsList'
import { useItems } from '@/contexts/ItemsContext'
import { Grid, Stack, Typography } from '@mui/material'

export default function Catalog({ items, filters, title }) {

  const { searchQuery, appliedFilters } = useItems()
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    fetchItems({ searchQuery, appliedFilters })
  }, [appliedFilters])

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchItems({ searchQuery, appliedFilters })
    }, 500);
    return () => clearInterval(interval);
  }, [searchQuery])

  async function fetchItems({ searchQuery, appliedFilters }) {

    let filters = [];

    for (const group in appliedFilters) {
      appliedFilters[group].forEach(option => {
        filters.push(option.id)
      })
    }
    const query = filters.join(',')
    try {
      const res = await fetch(`/api/catalog/items?${searchQuery ? `search=${searchQuery}&` : ''}${query ? `filter=${query}` : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      setFilteredItems(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Grid item xs={12} md={3}>
        <Filters filtersList={filters} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid
          container
          spacing={4}
          sx={{
            borderLeft: md => md ? '1px solid' : 'none',
            borderColor: 'divider',
            borderSpacing: 2
          }}
        >
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">
                  {title}
                </Typography>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <ItemsList items={filteredItems} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
