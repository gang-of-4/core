import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  Button,
  SvgIcon
} from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { useMounted } from '../../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { catalogApi } from '../../../../api/catalog';
import { CategoryListTable } from '../../../../sections/dashboard/catalog/categories/categories-list-table';
import { paths } from '../../../../paths';

const useCategories = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    categories: [],
    categoriesCount: 0
  });

  const getCategories = useCallback(async () => {
    try {
      const response = await catalogApi.getCategories();

      if (isMounted()) {
        setState({
          categories: response.categories,
          categoriesCount: response.count
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

  const { categories, categoriesCount } = useCategories();

  return (
    <>
      <Head>
        <title>
          Dashboard: Categories | Admin
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                Categories
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
                    Catalog
                  </Link>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    categories
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={NextLink}
                  href={paths.dashboard.catalog.categories.add}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            <Card>
              <Stack
                spacing={2}
                sx={{ p: 3 }}
              >
                <Typography
                  color="text.primary"
                  variant="h6"
                >
                  Categories
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Option groups are used to organize options into logical groups. You can create option groups and then add options to them.
                  <br />
                  For example, &quot;Size&quot; is an option group and &quot;Small&quot;, &quot;Medium&quot;, and &quot;Large&quot; are options.
                </Typography>
              </Stack>
              <CategoryListTable
                categories={categories}
                categoriesCount={categoriesCount}
              />
            </Card>

          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
