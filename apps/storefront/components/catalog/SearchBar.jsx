"use client"
import { Box, InputAdornment, SvgIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';


export default function SearchBar() {

    const [query, setQuery] = useState('');

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('You searched for:');
        console.log(query);
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
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
                    value={query}
                />
            </Box>
        </>
    )
}
