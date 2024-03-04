"use client"
import { Stack } from '@mui/material'
import React from 'react'
import FilterGroup from './FilterGroup';

export default function OptionsFilterSet({ onChange, options, isChecked }) {

    return (
        <>
            <Stack spacing={1}>
                {
                    options?.map((group) => (
                        <FilterGroup
                            key={group.id}
                            group={group}
                            onChange={onChange}
                            isChecked={isChecked}
                        />
                    ))
                }
            </Stack>
        </>
    )
}
