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
  Tooltip,
  Typography,
} from '@mui/material';
import NextLink from "next/link";
import { Scrollbar } from '../../../components/scrollbar';
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { paths } from '../../../paths';
import { SeverityPill } from '../../../components/severity-pill';
import { DetailsItem } from './details-item';
import { Fragment, useCallback, useState } from 'react';
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";


const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'InProgress':
      return 'info';
    case 'Cancelled':
      return 'error';
    default:
      return 'info';
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
      <Stack
        spacing={3}
        sx={{ width: '100%' }}
      >
        <Stack sx={{ marginTop: 3, marginLeft: 3 }}>
          <Typography color="textPrimary" variant='h6'>
            Order Items
          </Typography>
        </Stack>

        <div>
          <Scrollbar>
            <Table sx={{ minWidth: 1200, alignItems: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    Images
                  </TableCell>
                  <TableCell>
                    Item Name
                  </TableCell>
                  <TableCell>
                    Quantity
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderItems?.map((orderItem) => {
                  const isCurrent = orderItem.id === currentOrderItem;
                  const statusColor = getStatusColor(order.status);
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
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {orderItem.images ? (
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
                                src={orderItem.images?.url}
                                alt={orderItem.images?.name}
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
                        <TableCell>
                          {orderItem.name}
                        </TableCell>
                        <TableCell>
                          {orderItem.quantity}
                        </TableCell>
                        <TableCell>
                          <SeverityPill color={statusColor}>
                            {order.status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell>
                          {orderItem.price}
                        </TableCell>
                      </TableRow>
                      {isCurrent && (
                        <DetailsItem
                          item={orderItem}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </div>
      </Stack>
    </>
  )
}
