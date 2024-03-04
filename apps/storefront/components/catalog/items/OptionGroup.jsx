"use client"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'

export default function OptionGroup({
    group,
    handleOptionChange
}) {

    const [value, setValue] = useState('');

    function handleChange(event) {
        setValue(event.target.value);
        handleOptionChange(event);
    }

    return (
        <>
            <FormControl>
                <FormLabel id={group.title}>
                    {group.title}
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby={group.title}
                    name={group.title}
                    onChange={handleChange}
                    value={value}
                >
                    {group?.values?.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}
