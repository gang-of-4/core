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
import CurrentCar from './car-list-table-current';
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

export const CarsListTable = (props) => {
    const {
        onPageChange,
        onRowsPerPageChange,
        page,
        carss,
        carsCount,
        rowsPerPage,
        hasUpdatedCars,
        setHasUpdatedCars,
        ...other
    } = props;
    const [currentCar, setCurrentCar] = useState(null);

    const handleCarToggle = useCallback((carId) => {
        setCurrentCar((prevCarId) => {
            if (prevCarId === carId) {
                return null;
            }

            return carId;
        });
    }, []);

    const handleCarClose = useCallback(() => {
        setCurrentCar(null);
    }, []);

    const handleCarUpdate = useCallback(async (values) => {
        if (values.type === 'business') {
            await carsApi.updateBusinessCar({
                id: values.id,
                name: values.name,
            });
            await carsApi.updateCar({
                id: values.id,
                status: values.status
            }); 
        } else {
            await carsApi.updateCar({
                id: values.id,
                status: values.status
            });
        }
        setCurrentCar(null);
        toast.success('Car updated');
    }, []);

    const handleCarDelete = useCallback(() => {
        toast.error('Car cannot be deleted');
    }, []);



    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ maxWidth: 1000 }}>
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
                        {Cars.map((car) => {
                            const isCurrent = car.id === currentCar;
                            const statusColor = getStatusColor(car.status);

                            const initialValues = {
                                name: car.name,
                                status: car.status,
                            };

                            return (
                                <Fragment key={car.id}>
                                    <TableRow
                                        hover
                                        key={car.id}
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
                                            <IconButton onClick={() => handleCarToggle(car.id)}>
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
                                                        {car.name} 
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
                                                {car.status}
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
                                        <CurrentCar
                                            handleCarClose={handleCarClose}
                                            handleCarDelete={handleCarDelete}
                                            handleCarUpdate={handleCarUpdate}
                                            initialValues={initialValues}
                                            car={car}
                                            hasUpdatedCars={hasUpdatedCars}
                                            setHasUpdatedCars={setHasUpdatedCars}
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
                count={carsCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

CarsListTable.propTypes = {
    cars: PropTypes.array.isRequired,
    carsCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
