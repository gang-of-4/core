"use client"
import React, { useState } from 'react'
import { Checkbox, Collapse, FormControlLabel, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';

export default function FilterGroup({ group, onChange, isChecked }) {

    const [open, setIsOpen] = useState(false);

    return (
        <>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={1}
            >
                <Typography
                    color="text.secondary"
                    variant="overline"
                >
                    {group.title}
                </Typography>
                <IconButton
                    onClick={() => setIsOpen(!open)}
                    size="small"
                >
                    <SvgIcon>
                        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </SvgIcon>
                </IconButton>
            </Stack>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Stack
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    columnGap={1}
                >
                    {group?.values?.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            control={(
                                <Checkbox
                                    checked={isChecked({ index: group.title, option })}
                                    onChange={(event) => onChange({ index: group.title, option, event })}
                                    value={option.value}
                                    name={option.label}
                                />
                            )}
                            label={option.label}
                            sx={{
                                flexGrow: 1,
                                mr: 0,
                            }}
                        />
                    ))}
                </Stack>
            </Collapse>
        </>
    )
}
