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
import NextLink from "next/link";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { Scrollbar } from "../../../components/scrollbar";
import { SeverityPill } from "../../../components/severity-pill";
import { paths } from "../../../paths";
import { capitalize } from "../../../utils/format-string";
import { config } from "ui/config";

const getStatusColor = (status) => {
  switch (status) {
    case "DELIVERED":
      return "success";
    case "INPROGRESS":
      return "info";
    case "CANCELLED":
      return "error";
    default:
      return "info";
  }
};

export const OrdersListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    orders,
    ordersCount,
    rowsPerPage,
    hasUpdatedOrders,
    setHasUpdatedOrders,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="35%">
                {capitalize(config.order.name)} ID
              </TableCell>
              <TableCell width="35%">Customer Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const statusColor = getStatusColor(order.status);

              return (
                <Fragment key={order.id}>
                  <TableRow hover key={order.id}>
                    <TableCell padding="checkbox" width="25%">
                      <Tooltip title={`View Details of Order`}>
                        <IconButton
                          component={NextLink}
                          href={`${paths.dashboard.orders.index}/${order.id}`}
                        >
                          <SvgIcon>
                            <ArrowRightIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell width="35%">
                      <Typography variant="subtitle2">{order.id}</Typography>
                    </TableCell>
                    <TableCell width="35%">
                      <Typography variant="subtitle2">
                        {order.user?.name ?? "Not Found"}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
