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
    }
];

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    status: Yup.string().required('Required')
});

export default function CurrentStore({
    store,
    handleStoreClose,
    handleStoreDelete,
    handleStoreUpdate,
    initialValues,
    hasUpdatedStores,
    setHasUpdatedStores
}) {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await handleStoreUpdate({
                    ...values,
                    type: store.type,
                    id: store.id,
                });
                setHasUpdatedStores(!hasUpdatedStores);
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
                                    Basic details
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
                                            error={!!(formik.touched.name && formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            fullWidth
                                            label="store name"
                                            name="name"
                                            disabled={store?.type === 'individual'}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            defaultValue={store.id}
                                            disabled
                                            fullWidth
                                            label="store id"
                                            name="storeId"
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
                                            data-test="status-select"
                                        >
                                            {statusOptions.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                    data-test={`status-${option.value}`}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
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
                                </Grid>
                            </Grid>
                            {(store?.type === 'business') && (
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Typography variant="h6">
                                        Extra Details
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
                                                defaultValue={store?.vatNumber}
                                                disabled
                                                fullWidth
                                                label="VAT number"
                                                name="vatNumber"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                defaultValue={store?.crNumber}
                                                disabled
                                                fullWidth
                                                label="CR number"
                                                name="crNumber"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                defaultValue={store?.ownerNationalId}
                                                disabled
                                                fullWidth
                                                label="owner national id"
                                                name="ownerNationalId"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
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
                                onClick={handleStoreClose}
                            >
                                Cancel
                            </Button>
                        </Stack>
                        <div>
                            <Button
                                onClick={handleStoreDelete}
                                color="error"
                            >
                                Delete store
                            </Button>
                        </div>
                    </Stack>
                </form>
            </TableCell>
        </TableRow>
    )
}
