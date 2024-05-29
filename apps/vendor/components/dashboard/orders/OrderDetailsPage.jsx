"use client";
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
import { BreadcrumbsSeparator } from "ui/components/breadcrumbs-separator";
import { paths } from "ui/paths";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import { DetailsOrderStatus } from "./details-order-status";
import { OrderDetails } from "./details-order";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetch-api";
import AtomicSpinner from "atomic-spinner";

export default function OrderDetailsPage({ orderId, storeId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  async function fetchOrder(orderId) {
    setLoading(true);
    try {
      const { data } = await fetchApi({
        url: `/api/orders/${orderId}`,
      });

      setOrder(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
                    href={paths.vendor.dashboard.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={`${paths.vendor.dashboard.index}/stores/${storeId}/orders`}
                    variant="subtitle2"
                  >
                    {capitalize(config.order.plural)}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {order?.id}
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            {order && (
              <>
                <Card>
                  <CardContent>
                    <DetailsOrderStatus order={order} />
                  </CardContent>
                </Card>
                <Card>
                  <OrderDetails order={order} storeId={storeId} />
                </Card>
              </>
            )}
            {error && (
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
              >
                <Typography color="error">{error}</Typography>
              </Stack>
            )}
            {loading && (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ minHeight: "100%" }}
              >
                <AtomicSpinner atomSize={300} />
                <h1>Loading... please wait</h1>{" "}
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
