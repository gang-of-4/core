"use client"
import React, { Fragment, useState } from 'react'
import { Box, Checkbox, Collapse, FormControlLabel, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
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
                    alignItems="start"
                    direction="column"
                    paddingLeft={1}
                >
                    {group?.options?.map((option, index) => {
                        if (group.type === 'COLOR') {
                            return (
                                <Stack
                                    key={option.id}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={'start'}
                                    width={'100%'}
                                >
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                checked={isChecked({ index: group.title, option })}
                                                onChange={(event) => onChange({ index: group.title, option, event })}
                                                value={option.value}
                                                name={option.label}
                                            />
                                        )}
                                        sx={{
                                            mr: 0,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            backgroundColor: option.value,
                                            borderRadius: 1,
                                            height: 24,
                                            width: 24,
                                        }}
                                    />
                                </Stack>
                            )
                        } else {
                            return (
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
                            )
                        }
                    })}
                </Stack>
            </Collapse>
        </>
    )
}
