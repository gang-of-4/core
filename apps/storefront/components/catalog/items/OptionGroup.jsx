"use client"
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Tooltip } from '@mui/material'
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
                    {group?.values?.map((option) => {

                        if (group.type === 'color') {
                            return (
                                <>
                                    <FormControlLabel
                                        key={option.id}
                                        value={option.value}
                                        control={<Radio />}
                                        sx={{
                                            marginRight: 0,
                                        }}
                                    />
                                    <Stack
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        marginRight={2}
                                    >
                                        <Tooltip title={option.label} arrow>
                                            <Box
                                                sx={{
                                                    borderRadius: 1,
                                                    width: 32,
                                                    height: 32,
                                                    bgcolor: option.value,
                                                }}
                                            />
                                        </Tooltip>
                                    </Stack>
                                </>
                            )
                        } else {
                            return (
                                <FormControlLabel
                                    key={option.id}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            )
                        }
                    })}
                </RadioGroup>
            </FormControl>
        </>
    )
}
