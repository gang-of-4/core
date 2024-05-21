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
  Divider,
} from "@mui/material";
import { BreadcrumbsSeparator } from "ui/components/breadcrumbs-separator";
import { paths } from "ui/paths";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import { OredrsListSearch } from "./OrdersListSearch";
import { OrdersListTable } from "./OrdersListTable";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetch-api";
import AtomicSpinner from "atomic-spinner";

export default function OrdersPage({ storeId }) {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders(storeId);
  }, [storeId]);

  async function fetchOrders(storeId) {
    setLoading(true);
    try {
      const { data } = await fetchApi({
        url: `/vendor/api/orders?storeId=${storeId}`,
      });

      setOrders(data);
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
                  {capitalize(config.order.plural)}
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
                  <Typography color="text.secondary" variant="subtitle2">
                    {capitalize(config.order.plural)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <Stack>
                <OredrsListSearch />
              </Stack>
              <Divider />
              <Stack>
                {orders && orders?.length !== 0 && (
                  <OrdersListTable orders={orders} storeId={storeId} />
                )}
              </Stack>
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
                  <AtomicSpinner
                    atomSize={300}
                    electronColorPalette={["#C90000", "#F75C5C", "#FF8787"]}
                  />
                  <h1>Loading... please wait</h1>
                </Stack>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
