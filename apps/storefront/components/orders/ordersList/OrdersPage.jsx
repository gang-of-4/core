"use client";
import { useAuth } from "@/contexts/AuthContext";
import fetchApi from "@/utils/fetch-api";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { OrdersListSearch } from "./OrdersListSearch";
import { OrdersListTable } from "./OrdersListTable";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      status: [],
    },
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, isInitialized } = useAuth();
  const { checkout } = useCart();
  const { search, updateSearch } = useSearch();

  const searchParams = useSearchParams();
  const hasCheckedOut = searchParams.get("checkout");

  console.log("hasCheckedOut", hasCheckedOut);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (isInitialized && user?.id) {
        fetchOrders(search);
      }
    }, 500);

    if (hasCheckedOut) {
      checkout();
    }

    return () => clearInterval(interval);
  }, [isInitialized, user, search, hasCheckedOut]);

  async function fetchOrders(search) {
    setLoading(true);
    const filters = {
      ...search.filters,
    };

    try {
      const { data } = await fetchApi({
        url: `/api/orders?q=${filters.name}&status=${filters.status}&sort=${filters.sort}`,
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

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          ...filters,
        },
      }));
    },
    [updateSearch]
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid
          container
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">
                My {capitalize(config.order.plural)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Stack>
                <OrdersListSearch onFiltersChange={handleFiltersChange} />
              </Stack>
              <Divider />
              <Stack>
                {orders && orders.length > 0 && (
                  <OrdersListTable orders={orders} />
                )}
              </Stack>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                spacing={2}
                sx={{
                  padding: 4,
                }}
              >
                {orders && orders.length === 0 && (
                  <Typography>No orders found.</Typography>
                )}
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
