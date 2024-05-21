"use client";
import { useAuth } from "@/contexts/AuthContext";
import fetchApi from "@/utils/fetch-api";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import AtomicSpinner from "atomic-spinner";

export default function OrderPage({ orderId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && user?.id) {
      fetchOrder();
    }
  }, [isInitialized, user]);

  async function fetchOrder() {
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
          {order && <OrderDetails order={order} />}
        </Grid>
        {error && (
          <Stack alignItems={"center"} justifyContent={"center"} width={"100%"}>
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
      </Container>
    </Box>
  );
}
