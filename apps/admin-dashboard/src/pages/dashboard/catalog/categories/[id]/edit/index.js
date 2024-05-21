import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { useRouter } from "next/router";
import { catalogApi } from "../../../../../../api/catalog";
import { Layout as DashboardLayout } from "../../../../../../layouts/dashboard";
import { paths } from "../../../../../../paths";
import { useEffect, useState } from "react";
import { CategoryEditForm } from "../../../../../../sections/dashboard/catalog/categories/edit-category";
import { capitalize } from "../../../../../../utils/format-string";
import { config } from "ui/config";

const Page = () => {
  const router = useRouter();

  const id = router.query.id;

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) {
      fetchCategory(id);
      fetchCategories();
    }
  }, [id]);

  async function fetchCategory(id) {
    const Category = await catalogApi.getCategory(id);
    setCategory(Category);
  }

  async function fetchCategories() {
    const { categories: Categories } = await catalogApi.getCategories();
    setCategories(Categories);
  }

  return (
    <>
      <Head>
        <title>
          Admin Dashboard | Edit {capitalize(config.catalog.category.name)}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Card elevation={16}>
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
                href={paths.dashboard.catalog.categories.index}
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
                  Back to {capitalize(config.catalog.category.plural)}
                </Typography>
              </Link>
            </Box>
            <CardHeader sx={{ pb: 0 }} title={`Edit ${capitalize(config.catalog.category.name)}`} />
            <CardContent>
              {category && categories && (
                <CategoryEditForm category={category} categories={categories} />
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
