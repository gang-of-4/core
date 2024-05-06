"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  CardContent,
} from "@mui/material";
import { useMounted } from "ui/hooks/use-mounted";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import NextLink from "next/link";
import fetchApi from "@/utils/fetch-api";
import OptionsForm from "./itemForms/OptionsForm";
import BasicInfoForm from "./itemForms/BasicInfoForm";
import ImagesForm from "./itemForms/ImagesForm";
import VariantsForm from "./itemForms/VariantsForm";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

const initialValues = {
  name: "",
  sku: "",
  price: 0,
  description: "",
  quantity: 0,
  categories: [],
  options: [],
  variants: [],
  images: [],
  submit: null,
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required("Name is required"),
  sku: Yup.string().required("SKU is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().max(1000).required("Description is required"),
  quantity: Yup.number().notRequired(),
  categories: Yup.array().of(Yup.string().required("Category is required")),
  options: Yup.array().of(Yup.string().notRequired()),
  variants: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().notRequired(),
      sku: Yup.string().notRequired(),
      price: Yup.number().notRequired(),
      quantity: Yup.number().required(),
    })
  ),
  images: Yup.array()
    .of(
      Yup.object()
        .test(
          "fileFormat",
          "Invalid file format. Only images are allowed.",
          (value) => {
            if (!value) return true;
            return value && ["image/jpeg", "image/png"].includes(value.type);
          }
        )
        .test("fileSize", "File too large", (value) => {
          return value && value.size <= 2 * 1024 * 1024; // 2MB
        })
    )
    .notRequired(),
});

export default function AddItem({
  storeId,
  draftItemId,
  categories,
  optionGroups,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useMounted();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    const { values } = formik;
    setLoading(true);

    console.log("values", values?.variants);

    const formData = new FormData();
    values.images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", values.name);
    formData.append("sku", values.sku);
    if (values.variants?.length === 0) {
      formData.append("quantity", +values.quantity);
    }
    formData.append("price", +values.price);
    formData.append("description", values.description);
    formData.append("categories", JSON.stringify(values.categories));
    formData.append("options", JSON.stringify(values.options));
    formData.append("variants", JSON.stringify(values.variants));
    formData.append("storeId", storeId);

    try {
      await fetchApi({
        url: `/vendor/api/catalog/items/${draftItemId}`,
        options: {
          method: "PATCH",
          body: formData,
        },
      });

      setError(null);
      if (isMounted()) {
        router.push(`/dashboard/stores/${storeId}/items`);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-start",
                px: 2,
                pt: 4,
              }}
            >
              <Link
                color="primary"
                component={NextLink}
                href={`/dashboard/stores/${storeId}/items`}
                sx={{
                  alignItems: "center",
                  display: "inline-flex",
                }}
                underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">
                  Back to {capitalize(config.catalog.item.plural)}
                </Typography>
              </Link>
            </Box>
            <CardHeader
              title={`Add New ${capitalize(config.catalog.item.name)}`}
            />
            <CardContent>
              <form noValidate>
                <Stack direction={"column"} spacing={8}>
                  <Stack spacing={3} direction={"column"}>
                    <Typography variant="body1" color="textPrimary">
                      Basic Information
                    </Typography>
                    <BasicInfoForm formik={formik} categories={categories} />
                  </Stack>

                  <Stack spacing={3} direction={"column"}>
                    <Typography variant="body1" color="textPrimary">
                      Options
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Options are used to define the different variations of
                      your item.
                      <br />
                      You don&apos;t need to add values for all options below.
                      Choose what you need and leave the rest empty.
                    </Typography>
                    <OptionsForm formik={formik} optionGroups={optionGroups} />
                  </Stack>

                  <Stack spacing={3} direction={"column"}>
                    <Typography variant="body1" color="textPrimary">
                      Images
                    </Typography>
                    <ImagesForm formik={formik} />
                  </Stack>

                  <Stack spacing={3} direction={"column"}>
                    <Typography variant="body1" color="textPrimary">
                      Variants
                    </Typography>
                    <VariantsForm
                      formik={formik}
                      optionGroups={optionGroups}
                      draftItemId={draftItemId}
                      isDisabled={formik.values.options?.length === 0}
                    />
                  </Stack>

                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}

                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"flex-end"}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      color="inherit"
                      component={NextLink}
                      href={`/dashboard/stores/${storeId}/items`}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={formik.isSubmitting || loading}
                      size="large"
                      variant="outlined"
                      type="button"
                      onClick={handleSubmit}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
