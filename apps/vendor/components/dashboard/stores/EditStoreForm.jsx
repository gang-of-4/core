"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMounted } from "ui/hooks/use-mounted";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NextLink from "next/link";
import { useStores } from "@/contexts/StoresContext";
import { useRouter } from "next/navigation";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";


const validationSchema = Yup.object({
  name: Yup.string().max(255).required("Name is required"),
  logo: Yup.mixed()
    .notRequired()
    .test(
      "fileFormat",
      "Invalid file format. Only images are allowed.",
      (value) => {
        if (!value) return true;
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size is 2MB.",
      (value) => {
        if (!value) return true;
        return value && value.size <= 2 * 1024 * 1024; // 2MB
      }
    ),
  vatNumber: Yup.string().max(255).required("VAT Number is required"),
  crNumber: Yup.string().max(255).required("CR Number is required"),
  ownerNationalId: Yup.string()
    .max(10)
    .required("Owner National ID is required"),
});

export default function EditStoreForm({ store }) {
  const initialValues = {
    name: store?.name,
    logo: store?.logo,
    vatNumber: store?.vatNumber,
    crNumber: store?.crNumber,
    ownerNationalId: store?.ownerNationalId,
    submit: null,
  };

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
          logo: store?.logo?.id,
        };

        await updateBusinessStore({
          storeId: store?.id,
          store: storeUpdate,
        });

        if (isMounted()) {
          router.push(`/vendor/dashboard/stores/${store?.id}`);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3} direction="row" sx={{ width: "100%" }}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label={`${capitalize(config.store.name)} ID`}
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
              label="Name"
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
              error={
                !!(
                  formik.touched.ownerNationalId &&
                  formik.errors.ownerNationalId
                )
              }
              fullWidth
              helperText={
                formik.touched.ownerNationalId && formik.errors.ownerNationalId
              }
              label="Owner National ID"
              name="ownerNationalId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="ownerNationalId"
              value={formik.values.ownerNationalId}
            />
          </Stack>
          <Stack justifyContent={"space-between"} sx={{ width: "100%" }}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  sx={{
                    height: 128,
                    width: 128,
                    fontSize: 64,
                  }}
                  src={store?.logo?.url}
                >
                  {store?.logo?.name}
                </Avatar>
              </Box>
            </Stack>
            <Stack spacing={3}>
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
                startIcon={<CloudUploadIcon />}
                disabled
              >
                Upload Logo
              </Button>
              <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                Sorry. Editing the logo is not available yet, and will be added
                in future releases.
              </Typography>
            </Stack>
            {formik.errors.submit && (
              <FormHelperText error sx={{ mt: 3 }}>
                {formik.errors.submit}
              </FormHelperText>
            )}
            <Stack direction={"row"} spacing={2}>
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
    </>
  );
}
