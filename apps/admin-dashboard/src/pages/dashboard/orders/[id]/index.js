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
  CardContent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMounted } from "../../../../hooks/use-mounted";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import { capitalize } from "../../../../utils/format-string";
import { config } from "ui/config";
import { ordersApi } from "../../../../api/orders";
import { paths } from "../../../../paths";
import { OrderDetails } from "../../../../sections/dashboard/orders/details-order";
import { OrderAddress } from "../../../../sections/dashboard/orders/details-adress";
import { DetailsAmountStatus } from "../../../../sections/dashboard/orders/details-amount-status";
import { DetailsUser } from "../../../../sections/dashboard/orders/details-user";

const useOrder = (id) => {
  const isMounted = useMounted();
  const [state, setState] = useState(null);

  const getOrder = useCallback(
    async (id) => {
      try {
        const response = await ordersApi.getOrder(id);

        if (isMounted()) {
          setState(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    []);


  useEffect(() => {
    getOrder(id);
  }, [id]);

  return state;
};

const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const order = useOrder(id);

  return (
    <>
      <Head>
        <title>Admin Dashboard | {capitalize(config.order.name)} Details</title>
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
                  {`${capitalize(config.order.name)} Details`}
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
                    href={paths.dashboard.orders.index}
                    variant="subtitle2"
                  >
                    {capitalize(config.order.plural)}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {capitalize(order?.id)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <CardContent>
                {order && <DetailsAmountStatus order={order} />}
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {order && <DetailsUser order={order} />}
              </CardContent>
            </Card>
            <Card>
              {order && <OrderDetails order={order} />}
            </Card>
            <Card>
              {order && <OrderAddress order={order} />}
            </Card>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
