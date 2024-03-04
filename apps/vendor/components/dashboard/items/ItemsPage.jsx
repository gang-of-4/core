"use client"
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
import { useCallback, useEffect, useState } from 'react';
import { BreadcrumbsSeparator } from 'ui/components/breadcrumbs-separator';
import { ItemsListSearch } from '@/components/dashboard/items/items-list-search';
import { ItemsListTable } from '@/components/dashboard/items/items-list-table';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { useActiveStore } from '@/contexts/ActiveStoreContext';
import { paths } from 'ui/paths';

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


const Page = ({ items }) => {

  const { activeStore: store } = useActiveStore();
  const { search, updateSearch } = useSearch();
  const [filteredItems, setFilteredItems] = useState(items);
  const [itemsCount, setItemsCount] = useState(items.length);

  useEffect(() => {
    setItemsCount(items.length);
  }, [items]);

  useEffect(() => {
    console.log('search', search);
  }, [search]);

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
                    href={paths.vendor.dashboard.index}
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
                  sx={{ width: '15%', margin: '10px' }}
                  size="small"
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  component={NextLink}
                  href={`items/add`}
                >
                  Upload Items
                </Button>
                <Button
                  sx={{ width: '15%', margin: '10px', marginRight: '10px' }}
                  size="small"
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="outlined"
                  component={NextLink}
                  href={`items/add`}
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
                  itemsCount={itemsCount}
                  rowsPerPage={search.rowsPerPage}
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
