"use client";
import fetchApi from "@/utils/fetch-api";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowLeft from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import NextLink from "next/link";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import OrderOverview from "./OrderOverview";
import OrderItems from "./OrderItems";
import OrderAddress from "./OrderAddress";
import { SeverityPill } from "ui/components/severity-pill";
import { useState } from "react";
import CancelOrderDialog from "./CancelOrderDialog";

const getStatusColor = (status) => {
  switch (status) {
    case "INPROGRESS":
      return "warning";
    case "DELIVERED":
      return "success";
    case "CANCELLED":
      return "error";
    default:
      return "warning";
  }
};

export default function OrderDetails({ order }) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  async function handleCancelOrder() {
    try {
      await fetchApi({
        url: `/api/orders/${order.id}`,
        options: {
          method: "DELETE",
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
              <Stack spacing={3}>
                <Box
                  component={NextLink}
                  href={`/orders`}
                  color="primary.main"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-start",
                    px: 2,
                    pt: 4,
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeft />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Back to My {capitalize(config.order.plural)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems={"center"} spacing={2}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Typography variant="h5">
                    {capitalize(config.order.name)} {order.id}
                  </Typography>
                  <SeverityPill color={getStatusColor(order.status)}>
                    {order.status}
                  </SeverityPill>
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    size="small"
                    variant="outlined"
                    component="button"
                    color="error"
                    onClick={handleDialogOpen}
                  >
                    Cancel {capitalize(config.order.name)}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={3}>
                <OrderOverview order={order} />
                <OrderItems order={order} />
                <OrderAddress address={order?.orderAddress} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <CancelOrderDialog 
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
        handleCancelOrder={handleCancelOrder}
      />
    </>
  );
}
