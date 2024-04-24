import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  Button,
  SvgIcon,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { useRouter } from "next/router";
import { paths } from "../../../../../paths";
import { Layout as DashboardLayout } from "../../../../../layouts/dashboard";
import { BreadcrumbsSeparator } from "../../../../../components/breadcrumbs-separator";
import { catalogApi } from "../../../../../api/catalog";
import { CategoryDetails } from "../../../../../sections/dashboard/catalog/categories/details-category";
import { useMounted } from "../../../../../hooks/use-mounted";
import { useCallback, useEffect, useState } from "react";
import { DeleteCategory } from "../../../../../sections/dashboard/catalog/categories/delete-category";
import { capitalize } from "../../../../../utils/format-string";
import { config } from "ui/config";

const useCategories = (id) => {
  const isMounted = useMounted();
  const [state, setState] = useState({});

  const getCategory = useCallback(
    async (id) => {
      try {
        const response = await catalogApi.getCategory(id);

        if (isMounted()) {
          setState(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    getCategory(id);
  }, [id]);

  return state;
};

const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const category = useCategories(id);

  const categoryName = capitalize(config.catalog.category.name);

  return (
    <>
      <Head>
        <title>
          Admin Dashboard | {capitalize(category?.name)} {categoryName}
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
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {category?.name} {categoryName}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.catalog.items.index}
                    variant="subtitle2"
                  >
                    {capitalize(config.catalog.name)}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.catalog.categories.index}
                    variant="subtitle2"
                  >
                    {capitalize(config.catalog.category.plural)}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {category?.name}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Tooltip
                  title="This action will be added in a future release"
                  arrow
                >
                  <div>
                    <Button
                      component={NextLink}
                      href={`${paths.dashboard.catalog.categories.index}/${id}/edit`}
                      startIcon={
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      }
                      variant="contained"
                      color="inherit"
                      disabled={true}
                    >
                      Edit
                    </Button>
                  </div>
                </Tooltip>
              </Stack>
            </Stack>

            <Card elevation={16}>
              <CardContent>
                {category && <CategoryDetails category={category} />}
              </CardContent>
            </Card>
            <Card elevation={16}>
              <CardHeader title={`Manage ${categoryName}`} />
              <CardContent sx={{ pt: 1 }}>
                <DeleteCategory category={category} />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
