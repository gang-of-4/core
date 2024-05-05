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
  CardContent,
} from "@mui/material";
import { BreadcrumbsSeparator } from "ui/components/breadcrumbs-separator";
import { paths } from "ui/paths";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import { DetailsOrderStatus } from "./details-order-status";
import { DetailsUser } from "./details-user";
import { OrderDetails } from "./details-order";

export default function OrderDetailsPage({ order, storeId }) {
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
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <CardContent>
                {order && <DetailsOrderStatus order={order} />}
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {order && <DetailsUser order={order} />}
              </CardContent>
            </Card>
            <Card>{order && <OrderDetails order={order} />}</Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
