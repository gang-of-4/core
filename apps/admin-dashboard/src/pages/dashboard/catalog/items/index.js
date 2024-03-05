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
import { storesApi } from '../../../../api/stores';
import { CarsListSearch } from '../../../../sections/dashboard/cars/cars-list-search'; // Cars
import { CarsListTable } from '../../../../sections/dashboard/cars/cars-list-table'; //Cars
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { paths } from '../../../../paths';

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

const useCars = (search, hasUpdatedCars) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    cars: [],
    carsCount: 0
  });

  const getCars = useCallback(async () => {
    try {
      const response = await carsApi.getCars(search);
      if (isMounted()) {
        setState({
          cars: response.data,
          carsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
    getCars();
  }, [search, hasUpdatedCars]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const [hasUpdatedCars, setHasUpdatedCars] = useState(false);
  const { cars, carsCount } = useCars(search, hasUpdatedCars);

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
              <CarsListSearch onFiltersChange={handleFiltersChange} />
              <CarsListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                cars={cars}
                carsCount={carsCount}
                rowsPerPage={search.rowsPerPage}
                hasUpdatedCars={hasUpdatedCars}
                setHasUpdatedCars={setHasUpdatedCars}
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
