import { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { Box, Chip, Divider, Input, Stack, SvgIcon, Typography } from '@mui/material';
import { MultiSelect } from 'ui/components/multi-select';
import { useUpdateEffect } from 'ui/hooks/use-update-effect';


const statusOptions = [
    {
        label: 'Approved',
        value: 'APPROVED'
    },
    {
        label: 'Pending',
        value: 'PENDING'
    },
    {
        label: 'Rejected',
        value: 'REJECTED'
    },
    {
        label: 'In Review',
        value: 'INREVIEW'
    }
];

export const ItemsListSearch = (props) => {
    const { onFiltersChange, ...other } = props;
    const queryRef = useRef(null);
    const [query, setQuery] = useState('');
    const [chips, setChips] = useState([]);

    const handleChipsUpdate = useCallback(() => {
        const filters = {
            name: undefined,
            status: [],
        };

        chips.forEach((chip) => {
            switch (chip.field) {
                case 'name':
                    // There will (or should) be only one chips with field "name"
                    // so we can set it up directly
                    filters.name = chip.value;
                    break;
                case 'status':
                    filters.status.push(chip.value);
                    break;
                default:
                    break;
            }
        });

        onFiltersChange?.(filters);
    }, [chips, onFiltersChange]);

    useUpdateEffect(() => {
        handleChipsUpdate();
    }, [chips, handleChipsUpdate]);

    const handleChipDelete = useCallback((deletedChip) => {
        setChips((prevChips) => {
            return prevChips.filter((chip) => {
                // There can exist multiple chips for the same field.
                // Filter them by value.

                return !(deletedChip.field === chip.field && deletedChip.value === chip.value);
            });
        });
    }, []);

    const handleQueryChange = useCallback((event) => {
        event.preventDefault();
        setQuery(queryRef.current?.value || '');
    }, []);

    const handleStatusChange = useCallback((values) => {
        setChips((prevChips) => {
            const valuesFound = [];

            // First cleanup the previous chips
            const newChips = prevChips.filter((chip) => {
                if (chip.field !== 'status') {
                    return true;
                }

                const found = values.includes(chip.value);

                if (found) {
                    valuesFound.push(chip.value);
                }

                return found;
            });

            // Nothing changed
            if (values.length === valuesFound.length) {
                return newChips;
            }

            values.forEach((value) => {
                if (!valuesFound.includes(value)) {
                    const option = statusOptions.find((option) => option.value === value);

                    newChips.push({
                        label: 'Status',
                        field: 'status',
                        value,
                        displayValue: option.label
                    });
                }
            });

            return newChips;
        });
    }, []);

    const statusValues = useMemo(() => chips
        .filter((chip) => chip.field === 'status')
        .map((chip) => chip.value), [chips]);

    const showChips = chips.length > 0;

    return (
        <div {...other}>
            <Stack
                alignItems="center"
                component="form"
                direction="row"
                onClick={handleQueryChange}
                spacing={2}
                sx={{ p: 2 }}
            >
                <SvgIcon>
                    <SearchMdIcon />
                </SvgIcon>
                <Input
                    disableUnderline
                    fullWidth
                    inputProps={{ ref: queryRef }}
                    placeholder="Search by car name"
                    sx={{ flexGrow: 1 }}
                    value={query}
                    onChange={handleQueryChange}
                />
            </Stack>
            <Divider />
            {showChips
                ? (
                    <Stack
                        alignItems="center"
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ p: 2 }}
                    >
                        {chips.map((chip, index) => (
                            <Chip
                                key={index}
                                label={(
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            '& span': {
                                                fontWeight: 600
                                            }
                                        }}
                                    >
                                        <>
                                            <span>
                                                {chip.label}
                                            </span>
                                            :
                                            {' '}
                                            {chip.displayValue || chip.value}
                                        </>
                                    </Box>
                                )}
                                onDelete={() => handleChipDelete(chip)}
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                )
                : (
                    <Box sx={{ p: 2.5 }}>
                        <Typography
                            color="text.secondary"
                            variant="subtitle2"
                        >
                            No filters applied
                        </Typography>
                    </Box>
                )}
            <Divider />
            <Stack
                alignItems="center"
                direction="row"
                flexWrap="wrap"
                spacing={1}
                sx={{ p: 1 }}
            >
                <MultiSelect
                    label="Status"
                    onChange={handleStatusChange}
                    options={statusOptions}
                    value={statusValues}
                />
            </Stack>
        </div>
    );
};

// ItemsListSearch.propTypes = {
//     onFiltersChange: PropTypes.func
// };
