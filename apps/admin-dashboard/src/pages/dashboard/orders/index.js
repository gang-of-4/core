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
import { Layout as DashboardLayout } from '../../../layouts/dashboard';
import { useCallback, useEffect, useState } from 'react';
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator';
import { paths } from '../../../paths';
import { OrdersListTable } from '../../../sections/dashboard/orders/orders-list-table';
import { OrdersListSearch } from '../../../sections/dashboard/orders/orders-list-search';
import { ordersApi } from '../../../api/orders';
import { useMounted } from '../../../hooks/use-mounted';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      status: [],
    },
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useOrders = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0
  });

  const getOrders = useCallback(async () => {
    try {
      const response = await ordersApi.getOrders();

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  },[]);

  useEffect(() => {
    getOrders();

  },[] );

  return state;
};

const Page = () => {
  const { orders, ordersCount } = useOrders();

  return (
    <>
      <Head>
        <title>
          Dashboard: Orders | Admin
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
                  Orders
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
                    Orders
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <OrdersListSearch  />
              <OrdersListTable
                orders={orders}
                // ordersCount={ordersCount}
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
