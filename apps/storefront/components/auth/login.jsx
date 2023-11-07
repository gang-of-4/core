'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  // Alert,
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
// import { AuthIssuer } from 'ui/sections/auth/auth-issuer';
import { Issuer } from 'ui/utils/auth';
import { paths } from 'ui/paths';

const useParams = () => {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;

  return {
    returnTo
  };
};

const initialValues = {
  email: '',
  password: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup
    .string()
    .max(255)
    .required('Password is required')
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { returnTo } = useParams();
  const { issuer, signIn } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const userInfo = {
          email: values.email,
          password: values.password
        }
        await signIn(userInfo, 'customer');


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
                  Don&apos;t have an account?
                  &nbsp;
                  <Link
                    component={NextLink}
                    href={paths.auth.register}
                    underline="hover"
                    variant="subtitle2"
                  >
                    Sign up
                  </Link>
                </Typography>
              )}
              sx={{ pb: 0 }}
              title="Customer Login"
            />
            <CardContent>
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    autoFocus
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
                  Login
                </Button>
              </form>
              <div className='flex items-center justify-center w-full mt-3'>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Not a customer? Login as a
                  &nbsp;
                  <Link
                    href={`${paths.absolutePaths.vendor}${paths.auth.login}`}
                    underline="hover"
                    variant="subtitle2"
                  >
                    Vendor
                  </Link>
                  &nbsp;
                  or
                  &nbsp;
                  <Link
                    href={`${paths.absolutePaths.admin}${paths.auth.login}`}
                    underline="hover"
                    variant="subtitle2"
                  >
                    Admin
                  </Link>
                </Typography>
              </div>
            </CardContent>
          </Card>
          {/* @todo: API to get issuers */}
          {/* <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            <AuthIssuer issuer={issuer} />
          </Stack> */}
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
