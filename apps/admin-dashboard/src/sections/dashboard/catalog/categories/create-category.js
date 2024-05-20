import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useMounted } from "../../../../hooks/use-mounted";
import { paths } from "../../../../paths";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { catalogApi } from "../../../../api/catalog";

const validationSchema = Yup.object({
  name: Yup.string().max(255).required("Name is required"),
  description: Yup.string().max(255).required("Description is required"),
  banner: Yup.mixed().notRequired(),
  logo: Yup.mixed().notRequired(),
  parentId: Yup.string().notRequired(),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function CategoryCreateForm({ categories }) {
  const initialValues = {
    name: "",
    description: "",
    banner: "",
    logo: "",
    parentId: "",
    submit: null,
  };

  const [selectedBannerFileName, setSelectedBannerFileName] = useState("");
  const [selectedLogoFileName, setSelectedLogoFileName] = useState("");

  const router = useRouter();
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await catalogApi.createCategory({
          name: values.name,
          slug: values.name.toLocaleLowerCase(),
          description: values.description,
          parentId: values.parentId,
        });

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
    },
  });

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Stack
            spacing={3}
            direction={{ sm: "column", md: "row" }}
            sx={{ width: "100%" }}
          >
            <Stack spacing={3} sx={{ width: "100%" }}>
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
                error={
                  !!(formik.touched.description && formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                label="Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="title"
                value={formik.values.description}
                multiline
              />
              <FormControl
                fullWidth
                error={
                  !!(formik.touched.parentId && formik.errors.parentId)
                }
              >
                <InputLabel id="categories-label">Parent</InputLabel>
                <Select
                  labelId="categories-label"
                  name="parentId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.parentId}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.parentId && formik.errors.parentId && (
                  <FormHelperText error>
                    {formik.errors.parentId}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <Stack>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  style={{ backgroundColor: "#2970FF" }}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedBannerFileName
                    ? `Uploaded: ${selectedBannerFileName}`
                    : "Upload Banner"}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      formik.setFieldValue("banner", selectedFile);
                      setSelectedBannerFileName(
                        selectedFile ? selectedFile.name : ""
                      );
                    }}
                    inputProps={{ accept: "image/jpeg, image/png" }}
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
                  style={{ backgroundColor: "#2970FF" }}
                  startIcon={<CloudUploadIcon />}
                >
                  {selectedLogoFileName
                    ? `Uploaded Logo: ${selectedLogoFileName}`
                    : "Upload Logo"}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      formik.setFieldValue("logo", selectedFile);
                      setSelectedLogoFileName(
                        selectedFile ? selectedFile.name : ""
                      );
                    }}
                    inputProps={{ accept: "image/jpeg, image/png" }}
                  />
                </Button>
                {formik.touched.logo && formik.errors.logo && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {formik.errors.logo}
                  </FormHelperText>
                )}
              </Stack>
              <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                Accepted formats: JPEG, PNG.
                <br />
                Maximum size: 2MB
              </Typography>
            </Stack>
          </Stack>

          {formik.errors.submit && (
            <FormHelperText error sx={{ mt: 3 }}>
              {formik.errors.submit}
            </FormHelperText>
          )}

          <Stack
            direction="row"
            justifyContent={{
              sm: "center",
              md: "flex-end",
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
              Create
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
