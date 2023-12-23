'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { GuestGuard } from 'ui/guards/guest-guard';
import { IssuerGuard } from 'ui/guards/issuer-guard';
import { useAuth } from 'ui/hooks/use-auth';
import { useMounted } from 'ui/hooks/use-mounted';
import { Layout as AuthLayout } from 'ui/layouts/auth/classic-layout';
import { paths } from 'ui/paths';
// import { AuthIssuer } from 'ui/sections/auth/auth-issuer';
import { Issuer } from 'ui/utils/auth';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useStores } from '@/hooks/useStores';

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
    vatNumber: '',
    crNumber: '',
    ownerNationalId: '',
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
    vatNumber: Yup
        .string()
        .max(255)
        .required('Vat Number is required'),
    crNumber: Yup
        .string()
        .max(255)
        .required('CR Number is required'),
    ownerNationalId: Yup
        .string()
        .max(10)
        .required('Owner National ID is required')
});

const Page = () => {
    const [selectedFileName, setSelectedFileName] = useState('');
    const isMounted = useMounted();
    const router = useRouter();
    const { returnTo } = useParams();
    const { user } = useAuth();
    const { createBusinessStore } =  useStores();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const store = {
                    name: values.name,
                    vatNumber: values.vatNumber,
                    crNumber: values.crNumber,
                    ownerNationalId: values.ownerNationalId,
                    logo: values.logo,
                    vendorId: user.id
                };

                await createBusinessStore(store);

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

    return (
        <>
            <div className='flex items-center justify-center w-screen h-full'>
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
                                        error={!!(formik.touched.vatNumber && formik.errors.vatNumber)}
                                        fullWidth
                                        helperText={formik.touched.vatNumber && formik.errors.vatNumber}
                                        label="Vat Number"
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
