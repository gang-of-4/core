'use client'

import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
// import { paths } from 'ui/paths';
import { AuthIssuer } from 'ui/sections/auth/auth-issuer';
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
  name: '',
  password: '',
  policy: false,
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Password is required'),
  policy: Yup
    .boolean()
    .oneOf([true], 'This field must be checked')
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
        await signUp(values.email, values.name, values.password);

        if (isMounted()) {
          //   router.push(returnTo || paths.dashboard.index);
          router.push(returnTo || '/');
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
      <Head>
        <title>
          Sign up | Vendor
        </title>
      </Head>
      <div className='flex items-center justify-center w-screen h-screen'>
        <div className='w-4/5 max-w-2xl'>
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
                    // href={paths.auth.jwt.login}
                    href={'/login'}
                    underline="hover"
                    variant="subtitle2"
                  >
                    Log in
                  </Link>
                </Typography>
              )}
              sx={{ pb: 0 }}
              title="Register"
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
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1,
                    mt: 1
                  }}
                >
                  <Checkbox
                    checked={formik.values.policy}
                    name="policy"
                    onChange={formik.handleChange}
                  />
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    I have read the
                    {' '}
                    <Link
                      component="a"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {!!(formik.touched.policy && formik.errors.policy) && (
                  <FormHelperText error>
                    {formik.errors.policy}
                  </FormHelperText>
                )}
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
                >
                  Sign up
                </Button>
              </form>
            </CardContent>
          </Card>
          <Box sx={{ mt: 3 }}>
            <AuthIssuer issuer={issuer} />
          </Box>
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
