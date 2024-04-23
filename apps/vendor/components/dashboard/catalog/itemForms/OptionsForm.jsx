'use client'
import {
    Box,
    FormHelperText,
    Stack,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
} from '@mui/material';

export default function OptionsForm({
    formik,
    optionGroups,
    isDisabled = false
}) {
    return (
        <Stack
            spacing={4}
            direction='row'
            sx={{ width: '100%' }}
        >
            {optionGroups && (
                <Stack
                    spacing={3}
                    sx={{ width: '100%' }}
                >
                    {optionGroups?.map(optionGroup => (
                        <FormControl
                            fullWidth
                            key={optionGroup.id}
                            error={!!(formik.touched.options && formik.errors.options)}
                        >
                            <InputLabel id="options-label">{optionGroup.title}</InputLabel>
                            <Select
                                labelId="options-label"
                                multiple
                                name="options"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.options}
                                disabled={isDisabled}
                            >
                                {optionGroup?.options?.map((option) => {
                                    if (optionGroup.type === 'COLOR') {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: option.value,
                                                        height: 24,
                                                        width: 24
                                                    }}
                                                />
                                            </MenuItem>
                                        );
                                    } else {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Select>
                            {formik.touched.options && formik.errors.options && (
                                <FormHelperText error>
                                    {formik.errors.options}
                                </FormHelperText>
                            )}
                        </FormControl>
                    ))}
                </Stack>
            )}
        </Stack>
    )
}
