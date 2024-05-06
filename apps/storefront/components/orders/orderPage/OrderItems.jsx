"use client";

import { formatPrice } from "@/utils/format-price";
import { capitalize } from "@/utils/format-string";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { Scrollbar } from "ui/components/scrollbar";
import { SeverityPill } from "ui/components/severity-pill";
import { config } from "ui/config";

const getStatusInfo = (status) => {
  switch (status) {
    case "INPROGRESS":
      return {
        color: "warning",
        label: "In Progress",
      };
    case "READY":
      return {
        color: "success",
        label: "Ready",
      };
    default:
      return {
        color: "info",
        label: "Undefined",
      };
  }
};

export default function OrderItems({ order }) {
  return (
    <Card variant="outlined">
      <CardHeader title={`${capitalize(config.catalog.item.plural)}`} />
      <CardContent
        sx={{
          padding: 0,
        }}
      >
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {capitalize(config.catalog.item.name)}
                </TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">
                  {capitalize(config.store.name)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items?.map((orderItem) => {
                const statusInfo = getStatusInfo(orderItem?.status);

                return (
                  <TableRow hover key={orderItem.id}>
                    <TableCell>
                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        spacing={1}
                        alignContent={"center"}
                      >
                        {orderItem?.images?.[0]?.url ? (
                          <Box
                            sx={{
                              borderRadius: 1,
                              objectFit: "cover",
                            }}
                            component={"img"}
                            width={60}
                            height={60}
                            src={orderItem?.images?.[0]?.url}
                            alt={orderItem?.name}
                          />
                        ) : (
                          <Stack
                            width={60}
                            height={60}
                            sx={{
                              bgcolor: "grey.100",
                              borderRadius: 1,
                            }}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Stack>
                        )}
                        <Stack justifyContent={"center"}>
                          <Typography variant="subtitle">
                            {orderItem.name}
                          </Typography>
                          {orderItem.isVariant && (
                            <>
                              <Typography variant="caption">
                                {orderItem?.groups
                                  ?.map(
                                    (group) =>
                                      `${group?.title}: 
                                      ${group?.options
                                        ?.map((option) => option?.label)
                                        .join(", ")}`
                                  )
                                  .join("  |  ")}
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{orderItem?.quantity}</TableCell>
                    <TableCell align="center">
                      {formatPrice({ price: orderItem?.price })}
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill color={statusInfo.color}>
                        {statusInfo.label}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="center">
                      {orderItem?.store?.businessStore?.name ??
                        capitalize(config.store.individual.name)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
