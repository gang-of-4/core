"use client"
import { Stack } from '@mui/material'
import React from 'react'
import FilterGroup from './FilterGroup';

export default function OptionsFilterSet({ onChange, groups, isChecked }) {

    return (
        <>
            <Stack spacing={1}>
                {
                    groups?.map((group) => (
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
