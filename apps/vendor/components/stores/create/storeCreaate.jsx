'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    Link,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { GuestGuard } from 'ui/guards/guest-guard';
import { IssuerGuard } from 'ui/guards/issuer-guard';
import { useAuth } from 'ui/hooks/use-auth';
import { useMounted } from 'ui/hooks/use-mounted';
import { usePageView } from 'ui/hooks/use-page-view';
import { Layout as AuthLayout } from 'ui/layouts/auth/classic-layout';
import { paths } from 'ui/paths';
// import { AuthIssuer } from 'ui/sections/auth/auth-issuer';
import { Issuer } from 'ui/utils/auth';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const useParams = () => {
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    return {
        returnTo
    };
};

const initialValues = {
    name: '',
    logo: null,
    vat_number: '',
    cr_number: '',
    owner_national_id: '',
    submit: null
};

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
    vat_number: Yup
        .string()
        .max(255)
        .required('Vat Number is required'),
    cr_number: Yup
        .string()
        .max(255)
        .required('CR Number is required'),
    owner_national_id: Yup
        .string()
        .min(10)
        .max(255)
        .required('Owner National ID is required')
});

const Page = () => {
    const [selectedFileName, setSelectedFileName] = useState('');
    const isMounted = useMounted();
    const router = useRouter();
    const { returnTo } = useParams();
    const { issuer, signUp } = useAuth();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const userInfo = {
                    name: values.name,
                    logo: values.logo,
                    vat_number: values.vat_number,
                    cr_number: values.cr_number,
                    owner_national_id: values.owner_national_id
                }
                // await signUp(userInfo, 'vendor');

                if (isMounted()) {
                    router.push(returnTo || paths.vendor.dashboard.index);
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

    usePageView();

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='w-4/5 max-w-lg'>
                    <Card elevation={16}>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title="Vendor Create Business Store"
                        />
                        <CardContent>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>
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
                                        error={!!(formik.touched.vat_number && formik.errors.vat_number)}
                                        fullWidth
                                        helperText={formik.touched.vat_number && formik.errors.vat_number}
                                        label="Vat Number"
                                        name="vat_number"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="vat_number"
                                        value={formik.values.vat_number}
                                    />
                                    <TextField
                                        error={!!(formik.touched.cr_number && formik.errors.cr_number)}
                                        fullWidth
                                        helperText={formik.touched.cr_number && formik.errors.cr_number}
                                        label="Commercial Registration Number"
                                        name="cr_number"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="cr_number"
                                        value={formik.values.cr_number}
                                    />
                                    <TextField
                                        error={!!(formik.touched.owner_national_id && formik.errors.owner_national_id)}
                                        fullWidth
                                        helperText={formik.touched.owner_national_id && formik.errors.owner_national_id}
                                        label="Owner National ID"
                                        name="owner_national_id"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="owner_national_id"
                                        value={formik.values.owner_national_id}
                                    />
                                    <Typography variant="body2" color="textSecondary" sx={{ pl: 1}}>
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
                                <Button
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 2 }}
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: '#2970FF' }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {/* @todo: API to get issuers */}
                    {/* <Box sx={{ mt: 3 }}>
                        <AuthIssuer issuer={issuer} />
                    </Box> */}
                </div>
            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <IssuerGuard issuer={Issuer.JWT}>
        <GuestGuard>
            <AuthLayout>
                {page}
            </AuthLayout>
        </GuestGuard>
    </IssuerGuard>
);

export default Page;
