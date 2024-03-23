import { Button, CardContent, Divider, Grid, MenuItem, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { storesApi } from '../../../../api/stores';

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

    const [store, setStore] = useState(null);

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

    useEffect(() => {
        if (item) {
            fetchStore(item?.storeId);
        }
    }, [item]);

    async function fetchStore(storeId) {
        try {
            const data = await storesApi.getStore(storeId);
            setStore(data);
        } catch (err) {
            console.error(err);
        }
    }

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
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={item.name ? item.name : 'N/A'}
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={item.sku ? item.sku : 'N/A'}
                                            fullWidth
                                            label="SKU"
                                            name="sku"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={item.quantity ? item.quantity : 'N/A'}
                                            fullWidth
                                            label="Quantity"
                                            name="quantity"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={item.price ? item.price : 'N/A'}
                                            fullWidth
                                            label="Price"
                                            name="price"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={item.description ? item.description : 'N/A'}
                                            disabled
                                            fullWidth
                                            label="Description"
                                            name="description"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={
                                                item.categories?.length > 0 ?
                                                    item.categories.map(category => category.name).join(', ') :
                                                    'N/A'
                                            }
                                            disabled
                                            fullWidth
                                            label="Categories"
                                            name="categories"
                                        />
                                    </Grid>
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
                                    {store && (
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                defaultValue={
                                                    store ? store.name : 'N/A'
                                                }
                                                disabled
                                                fullWidth
                                                label="Store Name"
                                                name="storeName"
                                            />
                                        </Grid>
                                    )}

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
                                onClick={() => handleItemDelete(item.id)}
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
