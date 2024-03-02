"use client"
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
import useMounted from 'ui/hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
// import { storesApi } from '../../../api/stores';
import { BreadcrumbsSeparator } from 'ui/components/breadcrumbs-separator';
import { paths } from '../../../../paths';
import { ItemsListSearch } from '@/components/dashboard/items/items-list-search';
import { ItemsListTable } from '@/components/dashboard/items/items-list-table';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      status: [],
    },
    page: 0,
    rowsPerPage: 5
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useItems = (search, hasUpdatedCars) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    items: [],
    itemsCount: 0
  });

  const getItems = useCallback(async () => {
    try {
      const response = await itemsApi.getItems(search);
      if (isMounted()) {
        setState({
          items: response.data,
          itemsCount: response.count
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

const items = [
  { id: 1, name: 'Car 1', status: 'Active' },
  { id: 2, name: 'Car 2', status: 'Inactive' },
  // Add more items as needed
];


const Page = ({ store }) => {
  const { search, updateSearch } = useSearch();
  const [hasUpdatedItems, setHasUpdatedItems] = useState(false);
  // const { items, itemsCount } = useItems(search, hasUpdatedItems);

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }));
  }, [updateSearch]);

  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);

  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);

  return (
    <>
      <Head>
        <title>
          Dashboard: Cars | Vendor
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
              <Stack>
                <ItemsListSearch onFiltersChange={handleFiltersChange} />
              </Stack>
              <Stack
                sx={{ alignContent: 'flex', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '6px' }}
              >
                <Button
                  sx={{ width: '15%', margin:'10px' }}
                  size="small"
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  component={NextLink}
                  href={`${store?.id}/items/add`}
                >
                  Upload Items
                </Button>
                <Button
                  sx={{ width: '15%', margin:'10px', marginRight:'10px' }}
                  size="small"
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="outlined"
                  component={NextLink}
                  href={`${store?.id}/items/add`}
                >
                  Add Item
                </Button>
              </Stack>

              <Stack>
                <ItemsListTable
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={search.page}
                  items={items}
                  rowsPerPage={search.rowsPerPage}
                  hasUpdatedItems={hasUpdatedItems}
                  setHasUpdatedItems={setHasUpdatedItems}
                />
              </Stack>

            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
