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
import { Scrollbar } from '../../../components/scrollbar';
import { SeverityPill } from '../../../components/severity-pill';
import CurrentStore from './store-list-table-current';
import { storesApi } from '../../../api/stores';

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

export const StoresListTable = (props) => {
    const {
        onPageChange,
        onRowsPerPageChange,
        page,
        stores,
        storesCount,
        rowsPerPage,
        hasUpdatedStores,
        setHasUpdatedStores,
        ...other
    } = props;
    const [currentStore, setCurrentStore] = useState(null);

    const handleStoreToggle = useCallback((storeId) => {
        setCurrentStore((prevStoreId) => {
            if (prevStoreId === storeId) {
                return null;
            }

            return storeId;
        });
    }, []);

    const handleStoreClose = useCallback(() => {
        setCurrentStore(null);
    }, []);

    const handleStoreUpdate = useCallback(async (values) => {
        if (values.type === 'business') {
            await storesApi.updateStore({
                id: values.id,
                status: values.status
            });
            await storesApi.updateBusinessStore({
                id: values.id,
                name: values.name,
            });
        } else {
            await storesApi.updateStore({
                id: values.id,
                status: values.status
            });
        }
        setCurrentStore(null);
        toast.success('Store updated');
    }, []);

    const handleStoreDelete = useCallback(() => {
        toast.error('Store cannot be deleted');
    }, []);



    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="35%">
                                Name
                            </TableCell>
                            <TableCell width="35%">
                                Owner
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map((store) => {
                            const isCurrent = store.id === currentStore;
                            const statusColor = getStatusColor(store.status);

                            const initialValues = {
                                name: store.name,
                                status: store.status,
                            };

                            return (
                                <Fragment key={store.id}>
                                    <TableRow
                                        hover
                                        key={store.id}
                                    >
                                        <TableCell
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
                                            <IconButton onClick={() => handleStoreToggle(store.id)}>
                                                <SvgIcon>
                                                    {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>
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
                                                        {store.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell width="35%">
                                            <Typography variant="subtitle2">
                                                {`${store?.vendor?.firstName} ${store?.vendor?.lastName}`}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={statusColor}>
                                                {store.status}
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
                                    {isCurrent && (
                                        <CurrentStore
                                            handleStoreClose={handleStoreClose}
                                            handleStoreDelete={handleStoreDelete}
                                            handleStoreUpdate={handleStoreUpdate}
                                            initialValues={initialValues}
                                            store={store}
                                            hasUpdatedStores={hasUpdatedStores}
                                            setHasUpdatedStores={setHasUpdatedStores}
                                        />
                                    )}
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={storesCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

StoresListTable.propTypes = {
    stores: PropTypes.array.isRequired,
    storesCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
