"use client"
import { Box, InputAdornment, SvgIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { useItems } from '@/contexts/ItemsContext';


export default function SearchBar() {

    const { searchQuery,  setSearchQuery } = useItems();

    function handleQueryChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('You searched for:');
        console.log(searchQuery);
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SvgIcon>
                                    <SearchMdIcon />
                                </SvgIcon>
                            </InputAdornment>
                        )
                    }}
                    label="Search"
                    onChange={handleQueryChange}
                    placeholder="Search for an item..."
                    value={searchQuery}
                />
            </Box>
        </>
    )
}
