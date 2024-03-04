import { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
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
    Typography
} from '@mui/material';
import { Scrollbar } from 'ui/components/scrollbar';
import { SeverityPill } from 'ui/components/severity-pill';

// import { storesApi } from '../../../api/stores';


const getStatusColor = (status) => {
    switch (status) {
        case 'APPROVED':
            return 'success';
        case 'PENDING':
            return 'warning';
        case 'INREVIEW':
            return 'info';
        case 'REJECTED':
            return 'error';
        default:
            return 'info';
    }
};

export const ItemsListTable = (props) => {
    const {
        onPageChange,
        onRowsPerPageChange,
        page,
        items,
        itemsCount,
        rowsPerPage,
        ...other
    } = props;
    const [currentItem, setCurrentItem] = useState(null);

    const handleItemToggle = useCallback((itemId) => {
        setCurrentItem((prevItemId) => {
            if (prevItemId === itemId) {
                return null;
            }

            return itemId;
        });
    }, []);

    const handleItemClose = useCallback(() => {
        setCurrentItem(null);
    }, []);

    const handleItemUpdate = useCallback(async (values) => {
        if (values.type === 'business') {
            await itemsApi.updateBusinessItem({
                id: values.id,
                name: values.name,
            });
            await itemsApi.updateItem({
                id: values.id,
                status: values.status
            }); 
        } else {
            await itemsApi.updateItem({
                id: values.id,
                status: values.status
            });
        }
        setCurrentItem(null);
        toast.success('Car updated');
    }, []);

    const handleItemDelete = useCallback(() => {
        toast.error('Car cannot be deleted');
    }, []);



    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ maxWidth: 1000 }}>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell /> */}
                            <TableCell width="35%" >
                                Name
                            </TableCell>
                            <TableCell width="35%">
                                Quantity
                            </TableCell>
                            <TableCell  width="35%">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            const isCurrent = item.id === currentItem;
                            const statusColor = getStatusColor(item.status);

                            const initialValues = {
                                name: item.name,
                                quantity: item.quantity,
                                status: item.status,
                            };

                            return (
                                <Fragment key={item.id}>
                                    <TableRow
                                        hover
                                        key={item.id}
                                    >
                                        {/* <TableCell
                                            padding="checkbox"
                                            sx={{
                                                ...(isCurrent && {
                                                    position: 'relative',
                                                    '&:after': {
                                                        position: 'absolute',
                                                        content: '" "',
                                                        top: 0,
                                                        left: 0,
                                                        backgroundColor: 'primary.main',
                                                        width: 3,
                                                        height: 'calc(100% + 1px)'
                                                    }
                                                })
                                            }}
                                            width="25%"
                                        >
                                            <IconButton onClick={() => handleItemToggle(item.id)}>
                                                <SvgIcon>
                                                    {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell> */}
                                        <TableCell width="35%">
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        backgroundColor: 'neutral.50',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        height: 80,
                                                        justifyContent: 'center',
                                                        width: 80
                                                    }}
                                                >
                                                    <SvgIcon>
                                                        <Image01Icon />
                                                    </SvgIcon>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ml: 2
                                                    }}
                                                >
                                                    <Typography variant="subtitle2">
                                                        {item.name} 
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell width="35%">
                                            <Typography variant="subtitle2">
                                                {item.quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell  width="35%">
                                            <SeverityPill color={statusColor}>
                                                {item.status}
                                            </SeverityPill>
                                        </TableCell>
                                        {/* <TableCell align="right">
                                            <IconButton>
                                                <SvgIcon>
                                                    <DotsHorizontalIcon />
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell> */}
                                    </TableRow>
                                    {/* {isCurrent && (
                                        <CurrentItem
                                            handleItemClose={handleItemClose}
                                            handleItemDelete={handleItemDelete}
                                            handleItemUpdate={handleItemUpdate}
                                            initialValues={initialValues}
                                            item={item}
                                        />
                                    )} */}
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={itemsCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

ItemsListTable.propTypes = {
    items: PropTypes.array.isRequired,
    itemsCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
