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
import { Layout as DashboardLayout } from "../../../../../layouts/dashboard";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { CategoryCreateForm } from "../../../../../sections/dashboard/catalog/categories/create-category";
import { paths } from "../../../../../paths";
import { capitalize } from "../../../../../utils/format-string";
import { config } from "ui/config";
import { useMounted } from "../../../../../hooks/use-mounted";
import { useCallback, useEffect, useState } from "react";
import { catalogApi } from "../../../../../api/catalog";

const useCategories = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    categories: [],
    categoriesCount: 0,
  });

  const getCategories = useCallback(async () => {
    try {
      const response = await catalogApi.getCategories();

      if (isMounted()) {
        setState({
          categories: response.categories,
          categoriesCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getCategories();
  }, []);

  return state;
};

const Page = () => {
  const categoryName = capitalize(config.catalog.category.name);
  const { categories } = useCategories();


  return (
    <>
      <Head>
        <title>Admin Dashboard | Add {categoryName}</title>
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
                  Back to {categoryName}
                </Typography>
              </Link>
            </Box>
            <CardHeader sx={{ pb: 0 }} title={`Add New ${categoryName}`} />
            <CardContent>
              <CategoryCreateForm categories={categories}/>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
