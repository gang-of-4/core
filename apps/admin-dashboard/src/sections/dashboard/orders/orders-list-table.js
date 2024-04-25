import { Fragment, useCallback, useState } from 'react';
import {
    Box,
    IconButton,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import NextLink from "next/link";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { Scrollbar } from '../../../components/scrollbar';
import { SeverityPill } from '../../../components/severity-pill';
import { paths } from '../../../paths';


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


    // const handleStoreUpdate = useCallback(async (values) => {
    //     if (values.type === 'business') {
    //         await storesApi.updateBusinessStore({
    //             id: values.id,
    //             name: values.name,
    //         });
    //         await storesApi.updateStore({
    //             id: values.id,
    //             status: values.status
    //         });
    //     } else {
    //         await storesApi.updateStore({
    //             id: values.id,
    //             status: values.status
    //         });
    //     }
    //     setCurrentOrder(null);
    //     toast.success('Order updated');
    // }, []);





    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="35%">
                                Order Id
                            </TableCell>
                            <TableCell width="35%">
                                Customer Name
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            const statusColor = getStatusColor(order.status);

                            return (
                                <Fragment key={order.id}>
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell padding="checkbox" width="25%">
                                            <Tooltip
                                                title={`View Details of Order`}
                                            >
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
                                            <Typography variant="subtitle2">
                                                {order.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="35%">
                                            <Typography variant="subtitle2">
                                                Customer Name
                                                {/* {`${store?.vendor?.firstName} ${store?.vendor?.lastName}`} */}
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
