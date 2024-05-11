'use client'
import {
    FormHelperText,
    Stack,
    TextField,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    InputAdornment,
    Tooltip,
} from '@mui/material';

export default function BasicInfoForm({
    formik,
    categories
}) {
    return (
        <Stack
            spacing={4}
            direction='row'
            sx={{ width: '100%' }}
        >
            <Stack
                spacing={3}
                sx={{ width: '100%' }}
            >
                <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="name"
                    value={formik.values.name}
                />

                <TextField
                    error={!!(formik.touched.sku && formik.errors.sku)}
                    fullWidth
                    helperText={formik.touched.sku && formik.errors.sku}
                    label="SKU"
                    name="sku"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="sku"
                    value={formik.values.sku}
                />

                <TextField
                    error={!!(formik.touched.description && formik.errors.description)}
                    fullWidth
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    multiline
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="description"
                    value={formik.values.description}
                />
            </Stack>

            <Stack
                spacing={3}
                sx={{ width: '100%' }}
            >
                <Tooltip title="Quantity can be added later for each variant">
                    <TextField
                        error={!!(formik.touched.quantity && formik.errors.quantity)}
                        fullWidth
                        helperText={formik.touched.quantity && formik.errors.quantity}
                        label="Quantity (optional)"
                        name="quantity"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="quantity"
                        value={formik.values.quantity}
                        disabled={formik.values?.variants?.length > 0}
                    />
                </Tooltip>


                <TextField
                    error={!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
                    label="Price"
                    name="price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="price"
                    value={formik.values.price}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">SAR</InputAdornment>,
                    }}
                />

                {categories && (
                    <Stack
                        spacing={3}
                        sx={{ width: '100%' }}
                    >
                        <FormControl
                            fullWidth
                            error={!!(formik.touched.categories && formik.errors.categories)}
                        >
                            <InputLabel id="categories-label">Categories</InputLabel>
                            <Select
                                labelId="categories-label"
                                multiple
                                name="categories"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.categories}
                            >
                                {categories?.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.categories && formik.errors.categories && (
                                <FormHelperText error>
                                    {formik.errors.categories}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}
