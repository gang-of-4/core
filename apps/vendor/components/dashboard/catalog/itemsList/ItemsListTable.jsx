import { Fragment } from 'react';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import {
    Box,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { Scrollbar } from 'ui/components/scrollbar';
import { SeverityPill } from 'ui/components/severity-pill';
import NextLink from 'next/link';


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
        case 'DRAFT':
            return 'info';
        default:
            return 'info';
    }
};

export const ItemsListTable = ({
    items,
    ...other
}) => {

    return (
        <div {...other}>
            <Scrollbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="35%" >
                                Name
                            </TableCell>
                            <TableCell width="30%">
                                Quantity
                            </TableCell>
                            <TableCell width="35%">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items?.map((item) => {
                            const statusColor = getStatusColor(item.status);

                            return (
                                <Fragment key={item.id}>
                                    <TableRow
                                        hover
                                        key={item.id}
                                    >
                                        <TableCell width="35%">
                                            <Box
                                                component={NextLink}
                                                href={`items/${item.id}`}
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
                                                    {
                                                        item?.images[0].url ?
                                                            <Box
                                                                component="img"
                                                                alt={item.name}
                                                                src={item.images[0].url}
                                                                sx={{
                                                                    borderRadius: 1,
                                                                }}
                                                            />
                                                            :
                                                            <SvgIcon>
                                                                <Image01Icon />
                                                            </SvgIcon>
                                                    }
                                                </Box>
                                                <Box sx={{ ml: 2 }}>
                                                    <Typography variant="subtitle2">
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell width="30%">
                                            <Typography variant="subtitle2">
                                                {item?.quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="35%">
                                            <SeverityPill color={statusColor}>
                                                {item.status}
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
