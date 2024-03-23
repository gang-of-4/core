'use client'
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormHelperText,
    Link,
    Stack,
    SvgIcon,
    TextField,
    Typography
} from '@mui/material';
import { useMounted } from 'ui/hooks/use-mounted';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import NextLink from 'next/link';
import { formatStore } from '@/utils/format-store';
import { useAuth } from '@/contexts/AuthContext';
import { useStores } from '@/contexts/StoresContext';
import { useRouter } from 'next/navigation';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const validationSchema = Yup.object({
    name: Yup
        .string()
        .max(255)
        .required('Name is required'),
    logo: Yup
        .mixed()
        .notRequired()
        .test('fileFormat', 'Invalid file format. Only images are allowed.', (value) => {
            if (!value) return true;
            return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
        .test('fileSize', 'File size is too large. Maximum size is 2MB.', (value) => {
            if (!value) return true;
            return value && value.size <= 2 * 1024 * 1024; // 2MB
        }),
    vatNumber: Yup
        .string()
        .max(255)
        .required('VAT Number is required'),
    crNumber: Yup
        .string()
        .max(255)
        .required('CR Number is required'),
    ownerNationalId: Yup
        .string()
        .max(10)
        .required('Owner National ID is required')
});

export default function EditStore({ unformattedStore }) {

    const { user } = useAuth();

    const store = formatStore({ store: unformattedStore, user });

    const initialValues = {
        name: store?.name,
        logo: '',
        vatNumber: store?.vatNumber,
        crNumber: store?.crNumber,
        ownerNationalId: store?.ownerNationalId,
        submit: null
    };

    const [selectedFileName, setSelectedFileName] = useState('');
    const router = useRouter();
    const isMounted = useMounted();
    const { updateBusinessStore } = useStores();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const storeUpdate = {
                    name: values.name,
                    vatNumber: values.vatNumber,
                    crNumber: values.crNumber,
                    ownerNationalId: values.ownerNationalId,
                    logo: values.logo,
                };

                await updateBusinessStore({
                    storeId: store?.id,
                    store: storeUpdate
                });

                if (isMounted()) {
                    router.push(`/vendor/dashboard/stores/${store?.id}`)
                }
                setSelectedFileName('');
            } catch (err) {
                console.error(err);

                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Card elevation={16}>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            px: 2,
                            pt: 4
                        }}>
                            <Link
                                color="primary"
                                component={NextLink}
                                href={`/dashboard/stores/${store?.id}`}
                                sx={{
                                    alignItems: 'center',
                                    display: 'inline-flex'
                                }}
                                underline="hover"
                            >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <ArrowLeftIcon />
                                </SvgIcon>
                                <Typography variant="subtitle2">
                                    Back to Store
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title="Edit Business Store"
                        />
                        <CardContent>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack
                                    spacing={3}
                                    direction='row'
                                    sx={{ width: '100%' }}
                                >
                                    <Stack
                                        spacing={3}
                                        sx={{ width: '100%' }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Store ID"
                                            value={store?.id}
                                            disabled
                                        />
                                        <TextField
                                            fullWidth
                                            label="Vendor"
                                            value={`${store?.vendor?.firstName} ${store?.vendor?.lastName}`}
                                            disabled
                                        />
                                        <TextField
                                            error={!!(formik.touched.name && formik.errors.name)}
                                            fullWidth
                                            helperText={formik.touched.name && formik.errors.name}
                                            label="Store Name"
                                            name="name"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="name"
                                            value={formik.values.name}
                                        />
                                        <TextField
                                            error={!!(formik.touched.vatNumber && formik.errors.vatNumber)}
                                            fullWidth
                                            helperText={formik.touched.vatNumber && formik.errors.vatNumber}
                                            label="VAT Number"
                                            name="vatNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="vatNumber"
                                            value={formik.values.vatNumber}
                                        />
                                        <TextField
                                            error={!!(formik.touched.crNumber && formik.errors.crNumber)}
                                            fullWidth
                                            helperText={formik.touched.crNumber && formik.errors.crNumber}
                                            label="Commercial Registration Number"
                                            name="crNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="crNumber"
                                            value={formik.values.crNumber}
                                        />
                                        <TextField
                                            error={!!(formik.touched.ownerNationalId && formik.errors.ownerNationalId)}
                                            fullWidth
                                            helperText={formik.touched.ownerNationalId && formik.errors.ownerNationalId}
                                            label="Owner National ID"
                                            name="ownerNationalId"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="ownerNationalId"
                                            value={formik.values.ownerNationalId}
                                        />
                                    </Stack>
                                    <Stack
                                        justifyContent={'space-between'}
                                        sx={{ width: '100%' }}

                                    >
                                        <Stack
                                            spacing={3}
                                        >
                                            <div
                                                className='flex justify-center items-center'
                                            >

                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        backgroundColor: 'neutral.50',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        width: '40%',
                                                        aspectRatio: '1/1',
                                                    }}
                                                >
                                                    <SvgIcon>
                                                        <Image01Icon />
                                                    </SvgIcon>
                                                </Box>
                                            </div>
                                            <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                                                Accepted formats: JPEG, PNG, GIF.
                                                <br />
                                                Maximum size: 2MB
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                fullWidth
                                                size="large"
                                                sx={{ mt: 2 }}
                                                style={{ backgroundColor: '#2970FF' }}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                {selectedFileName ? `Uploaded: ${selectedFileName}` : 'Upload Logo'}
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(event) => {
                                                        const selectedFile = event.currentTarget.files[0];
                                                        formik.setFieldValue('logo', selectedFile);
                                                        setSelectedFileName(selectedFile ? selectedFile.name : '');
                                                    }}
                                                    inputProps={{ accept: 'image/jpeg, image/png, image/gif' }}
                                                />
                                            </Button>
                                            {formik.touched.logo && formik.errors.logo && (
                                                <FormHelperText error sx={{ mt: 1 }}>
                                                    {formik.errors.logo}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        {formik.errors.submit && (
                                            <FormHelperText
                                                error
                                                sx={{ mt: 3 }}
                                            >
                                                {formik.errors.submit}
                                            </FormHelperText>
                                        )}
                                        <Stack
                                            direction={'row'}
                                            spacing={2}
                                        >
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                color="inherit"
                                                component={NextLink}
                                                href={`/dashboard/stores/${store?.id}`}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Update
                                            </Button>
                                        </Stack>
                                    </Stack>

                                </Stack>

                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};