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

export default function OrdersPage({ orders }) {
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
                {orders.length !== 0 && <OrdersListTable orders={orders} />}
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
