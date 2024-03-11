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
  SvgIcon,
  Divider
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { BreadcrumbsSeparator } from 'ui/components/breadcrumbs-separator';
import { ItemsListSearch } from '@/components/dashboard/catalog/itemsList/ItemsListSearch';
import { ItemsListTable } from '@/components/dashboard/catalog/itemsList/ItemsListTable';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { paths } from 'ui/paths';
import fetchApi from '@/utils/fetch-api';
import ImportItems from './ImportItems';
import { useRouter } from 'next/navigation';

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


const Page = ({ items, storeId }) => {

  const router = useRouter();
  const { search, updateSearch } = useSearch();
  const [filteredItems, setFilteredItems] = useState(items);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchItems(search)
    }, 500);
    return () => clearInterval(interval);
  }, [search]);

  async function fetchItems(search) {
    try {
      const { data } = await fetchApi({
        url: `/vendor/api/catalog/items?store_id=${storeId}&q=${search.filters.name}&status=${search.filters.status}`,
        options: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      });
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  }

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...filters
      }
    }));
  }, [updateSearch]);

  async function handleAddItem() {
    setLoading(true);
    const { data } = await fetchApi({
      url: `/vendor/api/catalog/items`,
      options: {
        method: 'POST',
        body: JSON.stringify({
          store_id: storeId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    if (data.id) {
      router.push(`/dashboard/stores/${storeId}/items/${data.id}/add`);
    } else {
      console.error('Error creating draft item');
    }

    setLoading(false);

  }


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
              <Divider />
              <Stack
                direction="row"
                alignItems={'center'}
                justifyContent={'flex-end'}
                spacing={2}
                p={2}
              >
                <ImportItems />
                <Button
                  sx={{ width: '15%', margin: '10px', marginRight: '10px' }}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="outlined"
                  onClick={handleAddItem}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Car'}
                </Button>
              </Stack>

              <Stack>
                {filteredItems.length !== 0 && (
                  <ItemsListTable items={filteredItems} />
                )}
              </Stack>

            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
