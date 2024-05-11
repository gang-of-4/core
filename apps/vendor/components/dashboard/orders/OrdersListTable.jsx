import { Fragment } from "react";
import {
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Scrollbar } from "ui/components/scrollbar";
import { SeverityPill } from "ui/components/severity-pill";
import ArrowRight from "@untitled-ui/icons-react/build/esm/ArrowRight";
import NextLink from "next/link";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

const getStatusColor = (status) => {
  switch (status) {
    case "DELIVERED":
      return "success";
    case "INPROGRESSS":
      return "warning";
    case "CANCELLED":
      return "error";
    default:
      return "info";
  }
};

export const OrdersListTable = ({ orders, storeId, ...other }) => {
  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>{capitalize(config.order.name)} ID</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => {
              const statusColor = getStatusColor(order.status);

              return (
                <Fragment key={order.id}>
                  <TableRow hover key={order.id}>
                    <TableCell padding="checkbox">
                      <Tooltip title={`View Order Details`}>
                        <IconButton
                          component={NextLink}
                          href={`/dashboard/stores/${storeId}/orders/${order.id}`}
                        >
                          <SvgIcon>
                            <ArrowRight />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{order.id}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill color={statusColor}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};
