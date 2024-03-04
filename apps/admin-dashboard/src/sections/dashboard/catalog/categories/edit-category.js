import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useMounted } from '../../../../hooks/use-mounted';
import { paths } from '../../../../paths';
import { catalogApi } from '../../../../api/catalog';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




const validationSchema = Yup.object({
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  description: Yup
    .string()
    .max(255)
    .required('Description is required'),
  banner: Yup
    .mixed()
    // .required('Banner is required')
    .test('fileFormat', 'Invalid file format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
    .test('fileSize', 'File size is too large', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB in bytes
    }),
  logo: Yup
    .mixed()
    // .required('Logo is required')
    .test('fileFormat', 'Invalid file format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
    .test('fileSize', 'File size is too large', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB in bytes
    }),
});

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

export function CategoryEditForm({ category }) {

  const initialValues = {
    name: category?.name || '',
    description: category?.description || '',
    banner: category?.banner || '',
    logo: category?.logo || '',
    submit: null
  };

  const [selectedBannerFileName, setSelectedBannerFileName] = useState('');
  const [selectedLogoFileName, setSelectedLogoFileName] = useState('');

  const router = useRouter();
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await catalogApi.editCategory({ id: category.id, name: values.name, description: values.description, banner: values.banner, logo: values.logo })

        if (isMounted()) {
          router.push(paths.dashboard.catalog.categories.index);
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


  return (
    <>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Stack
          spacing={3}
        >


          <Stack
            spacing={3}
            direction={{ sm: 'column', md: 'row' }}
            sx={{ width: '100%' }}
          >
            <Stack
              spacing={3}
              sx={{ width: '100%' }}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="title"
                value={formik.values.name}
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                label="Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="title"
                value={formik.values.description}
                multiline
              />
            </Stack>
            <Stack
              spacing={3}
              sx={{ width: '100%' }}
            >
              <Stack>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  style={{ backgroundColor: '#2970FF' }}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedBannerFileName ? `Uploaded: ${selectedBannerFileName}` : 'Upload Banner'}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      formik.setFieldValue('banner', selectedFile);
                      setSelectedBannerFileName(selectedFile ? selectedFile.name : '');
                    }}
                    inputProps={{ accept: 'image/jpeg, image/png, image/gif' }}
                  />

                </Button>
                {formik.touched.banner && formik.errors.banner && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {formik.errors.banner}
                  </FormHelperText>
                )}
              </Stack>
              <Stack>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  style={{ backgroundColor: '#2970FF' }}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedLogoFileName ? `Uploaded Logo: ${selectedLogoFileName}` : 'Upload Logo'}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      formik.setFieldValue('logo', selectedFile);
                      setSelectedLogoFileName(selectedFile ? selectedFile.name : '');
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
              <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                Accepted formats: JPEG, PNG, GIF.
                <br />
                Maximum size: 2MB
              </Typography>
            </Stack>
          </Stack>
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
          direction='row'
          justifyContent={{
            sm: 'center',
            md: 'flex-end'
          }}
          spacing={3}
        >

          <Button
            component={NextLink}
            href={paths.dashboard.catalog.categories.index}
            size="large"
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            disabled={formik.isSubmitting}
            size="large"
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Stack>
      </form >
    </>
  )
}
