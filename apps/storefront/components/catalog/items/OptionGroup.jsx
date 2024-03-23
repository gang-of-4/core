"use client"
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Tooltip } from '@mui/material'
import React, { Fragment, useState } from 'react'

export default function OptionGroup({
    group,
    handleOptionChange
}) {

    const [value, setValue] = useState('');

    function handleChange({group, value}) {
        setValue(value);
        handleOptionChange({group, value});
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
                    onChange={(e) => handleChange({ group: group.id, value: e.target.value })}
                    value={value}
                >
                    {group?.options?.map((option) => {

                        if (group.type === 'COLOR') {
                            return (
                                <Fragment key={option.id}>
                                    <FormControlLabel
                                        key={option.id}
                                        value={option.id}
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
                                </Fragment>
                            )
                        } else {
                            return (
                                <FormControlLabel
                                    key={option.id}
                                    value={option.id}
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
