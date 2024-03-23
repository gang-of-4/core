import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Card
} from '@mui/material';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { useMounted } from '../../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { paths } from '../../../../paths';
import { ItemsListTable } from '../../../../sections/dashboard/catalog/items/item-list-table';
import { ItemsListSearch } from '../../../../sections/dashboard/catalog/items/item-list-search';
import { catalogApi } from '../../../../api/catalog';


const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      status: [],
    }
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useItems = (search, hasUpdatedItems) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    items: []
  });

  const getItems = useCallback(async () => {
    try {
      const data = await catalogApi.getItems({
        q: search.filters.name,
        status: search.filters.status
      });
      if (isMounted()) {
        setState({
          items: data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
    getItems();
  }, [search, hasUpdatedItems]);

  return state;
};

const Page = () => {

  const { search, updateSearch } = useSearch();
  const [hasUpdatedItems, setHasUpdatedItems] = useState(false);

  const { items } = useItems(search, hasUpdatedItems);

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...filters
      }
    }));
  }, [updateSearch]);

  return (
    <>
      <Head>
        <title>
          Dashboard: Cars | Admin
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
                  Cars
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
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Cars
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <ItemsListSearch onFiltersChange={handleFiltersChange} />
              <ItemsListTable
                items={items}
                hasUpdatedItems={hasUpdatedItems}
                setHasUpdatedItems={setHasUpdatedItems}
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
