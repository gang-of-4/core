import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { SeverityPill } from "../../../components/severity-pill";
import { DetailsItem } from "./details-item";
import { Fragment, useCallback, useState } from "react";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import { capitalize } from "../../../utils/format-string";
import { config } from "ui/config";
import { formatPrice } from "../../../utils/format-price";

const getStatusColor = (status) => {
  switch (status) {
    case "READY":
      return "success";
    case "INPROGRESS":
      return "warning";
    default:
      return "info";
  }
};

export function OrderDetails({ order }) {
  const [currentOrderItem, setCurrentOrderItem] = useState(null);

  const handleOrderItemToggle = useCallback((orderItemId) => {
    setCurrentOrderItem((prevOrderItemId) => {
      if (prevOrderItemId === orderItemId) {
        return null;
      }

      return orderItemId;
    });
  }, []);

  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack sx={{ marginTop: 3, marginLeft: 3 }}>
          <Typography color="textPrimary" variant="h6">
            {capitalize(config.order.name)}{" "}
            {capitalize(config.catalog.item.plural)}
          </Typography>
        </Stack>

        <div>
          <Scrollbar>
            <Table sx={{ alignItems: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>{capitalize(config.catalog.item.name)}</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items?.map((orderItem) => {
                  const isCurrent = orderItem.id === currentOrderItem;
                  const statusColor = getStatusColor(orderItem.status);
                  return (
                    <Fragment key={orderItem.id}>
                      <TableRow
                        hover
                        key={orderItem.id}
                        sx={{ alignItems: "center" }}
                      >
                        <TableCell
                          padding="checkbox"
                          sx={{
                            ...(isCurrent && {
                              position: "relative",
                              "&:after": {
                                position: "absolute",
                                content: '" "',
                                top: 0,
                                left: 0,
                                backgroundColor: "primary.main",
                                width: 3,
                                height: "calc(100% + 1px)",
                              },
                            }),
                          }}
                          width="25%"
                        >
                          <IconButton
                            onClick={() => handleOrderItemToggle(orderItem.id)}
                          >
                            <SvgIcon>
                              {isCurrent ? (
                                <ChevronDownIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </SvgIcon>
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {orderItem.images?.[0]?.url ? (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  borderRadius: 1,
                                  display: "flex",
                                  height: 80,
                                  justifyContent: "center",
                                  width: 80,
                                  objectFit: "cover",
                                  overflow: "hidden",
                                }}
                                component="img"
                                src={orderItem.images?.[0]?.url}
                                alt={orderItem?.name}
                              />
                            ) : (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  backgroundColor: "neutral.50",
                                  borderRadius: 1,
                                  display: "flex",
                                  height: 80,
                                  justifyContent: "center",
                                  width: 80,
                                }}
                              >
                                <SvgIcon>
                                  <Image01Icon />
                                </SvgIcon>
                              </Box>
                            )}
                            <Box
                              sx={{
                                cursor: "pointer",
                                ml: 2,
                              }}
                            >
                              <Typography variant="subtitle2">
                                {orderItem.name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <SeverityPill color={statusColor}>
                            {orderItem.status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell align="center">
                          {orderItem.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {formatPrice({ price: orderItem.price })}
                        </TableCell>
                      </TableRow>
                      {isCurrent && <DetailsItem item={orderItem} />}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  );
}
