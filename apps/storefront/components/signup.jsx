'use client'

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

const useParams = () => {
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || undefined;

    return {
        returnTo
    };
};

const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    submit: null
};

const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
    lastName: Yup
        .string()
        .max(255)
        .required('Last name is required'),
    phone: Yup
        .string()
        .max(10)
        .required('Phone number is required'),
    password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
});

const Page = () => {
    const isMounted = useMounted();
    const router = useRouter();
    const { returnTo } = useParams();
    const { issuer, signUp } = useAuth();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                await signUp(
                    values.email,
                    values.firstName,
                    values.lastName,
                    values.phone,
                    values.password
                );

                if (isMounted()) {
                    router.push(returnTo || paths.storefront.index);
                }
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
                            subheader={(
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    Already have an account?
                                    &nbsp;
                                    <Link
                                        component={NextLink}
                                        href={paths.auth.login}
                                        underline="hover"
                                        variant="subtitle2"
                                    >
                                        Login
                                    </Link>
                                </Typography>
                            )}
                            sx={{ pb: 0 }}
                            title="Sign up"
                        />
                        <CardContent>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formik.touched.firstName && formik.errors.firstName)}
                                        fullWidth
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        label="First Name"
                                        name="firstName"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="firstName"
                                        value={formik.values.firstName}
                                    />
                                    <TextField
                                        error={!!(formik.touched.lastName && formik.errors.lastName)}
                                        fullWidth
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        label="Last Name"
                                        name="lastName"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="lastName"
                                        value={formik.values.lastName}
                                    />
                                    <TextField
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email Address"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
                                    />
                                    <TextField
                                        error={!!(formik.touched.phone && formik.errors.phone)}
                                        fullWidth
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        label="Phone Number"
                                        name="phone"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="phone"
                                        value={formik.values.phone}
                                    />
                                    <TextField
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        fullWidth
                                        helperText={formik.touched.password && formik.errors.password}
                                        label="Password"
                                        name="password"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.password}
                                    />
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
                                    Sign up
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
