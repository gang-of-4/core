import { Button, CardContent, Divider, Grid, MenuItem, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';

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
    },
    {
        label: 'Draft',
        value: 'DRAFT'
    }
];

const validationSchema = Yup.object({
    status: Yup.string().required('Required')
});

export default function CurrentItem({
    item,
    handleItemClose,
    handleItemDelete,
    handleItemUpdate,
    initialValues,
    hasUpdatedItems,
    setHasUpdatedItems
}) {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await handleItemUpdate({
                    id: item.id,
                    status: values.status
                });
                setHasUpdatedItems(!hasUpdatedItems);
            } catch (err) {
                console.error(err);
            }
        }
    });

    return (
        <TableRow>
            <TableCell
                colSpan={7}
                sx={{
                    p: 0,
                    position: 'relative',
                    '&:after': {
                        position: 'absolute',
                        content: '" "',
                        top: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        width: 3,
                        height: 'calc(100% + 1px)'
                    }
                }}
            >
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography variant="h6">
                                    Car Details
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    {/* <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.carType && formik.errors.carType)}
                                            helperText={formik.touched.carType && formik.errors.carType}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.carType}
                                            fullWidth
                                            label="Car Type"
                                            name="carType"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.brandName && formik.errors.brandName)}
                                            helperText={formik.touched.brandName && formik.errors.brandName}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.brandName}
                                            fullWidth
                                            label="Brand Name"
                                            name="brandName"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.carName && formik.errors.carName)}
                                            helperText={formik.touched.carName && formik.errors.carName}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.carName}
                                            fullWidth
                                            label="Car Name"
                                            name="carName"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.carYear && formik.errors.carYear)}
                                            helperText={formik.touched.carYear && formik.errors.carYear}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            fullWidth
                                            label="Car Year"
                                            name="carYear"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.carColor && formik.errors.carColor)}
                                            helperText={formik.touched.carColor && formik.errors.carColor}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.carColor}
                                            fullWidth
                                            label="Car Color"
                                            name="carColor"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                        style={{ display: 'flex', alignItems: 'center'}}
                                    >
                                        <TextField
                                            error={!!(formik.touched.currency && formik.errors.currency)}
                                            helperText={formik.touched.currency && formik.errors.currency}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.currency}
                                            fullWidth
                                            label="Currency"
                                            name="currency"
                                            disabled
                                            sx={{ maxWidth: 100, marginRight: 2}}
                                        />
                                        
                                        <TextField
                                            error={!!(formik.touched.carPrice && formik.errors.carPrice)}
                                            helperText={formik.touched.carPrice && formik.errors.carPrice}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.carPrice}
                                            fullWidth
                                            label="Car Price"
                                            name="carPrice"
                                            disabled
                                        />

                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={Car.id}
                                            disabled
                                            fullWidth
                                            label="Car id"
                                            name="carId"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={!!(formik.touched.description && formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            multiline
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={`${store?.vendor?.firstName} ${store?.vendor?.lastName}`}
                                            disabled
                                            fullWidth
                                            label="Owner"
                                            name="owner"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={`${store?.vendor?.firstName} ${store?.vendor?.lastName}`}
                                            disabled
                                            fullWidth
                                            label="Store Name"
                                            name="storeName"
                                        />
                                    </Grid> */}
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            value={formik.values.status}
                                            onBlur={formik.handleBlur}
                                            error={!!(formik.touched.status && formik.errors.status)}
                                            helperText={formik.touched.status && formik.errors.status}
                                            fullWidth
                                            label="Status"
                                            name='status'
                                            select
                                            onChange={formik.handleChange}
                                        >
                                            {statusOptions.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        sx={{ p: 2 }}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                            >
                                Update
                            </Button>
                            <Button
                                color="inherit"
                                onClick={handleItemClose}
                            >
                                Cancel
                            </Button>
                        </Stack>
                        <div>
                            <Button
                                onClick={handleItemDelete}
                                color="error"
                            >
                                Delete Car
                            </Button>
                        </div>
                    </Stack>
                </form>
            </TableCell>
        </TableRow>
    )
}
