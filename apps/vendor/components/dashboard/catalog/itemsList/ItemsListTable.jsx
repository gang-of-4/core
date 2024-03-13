import { Fragment, useState } from 'react';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Trash01Icon from '@untitled-ui/icons-react/build/esm/Trash01';
import {
    Box,
    IconButton,
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
import fetchApi from '@/utils/fetch-api';
import DeleteItemDialog from './DeleteItemDialog';


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
    handleUpdateItems,
    ...other
}) => {

    const [activeItem, setActiveItem] = useState(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handleOpenDeleteDialog() {
        setDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setDeleteDialogOpen(false);
    }

    async function handleDelete(itemId) {
        try {
            await fetchApi({
                url: `/vendor/api/catalog/items/${itemId}`,
                options: {
                    method: 'DELETE'
                }
            });
            handleUpdateItems();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseDeleteDialog();
        }
    }

    return (
        <div {...other}>
            <Scrollbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    pl: 15
                                }}
                            >
                                Name
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell />
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
                                        <TableCell>
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
                                                        item?.images?.[0].url ?
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
                                        <TableCell>
                                            <SeverityPill color={statusColor}>
                                                {item.status}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    setActiveItem(item);
                                                    handleOpenDeleteDialog();
                                                }}
                                            >
                                                <SvgIcon>
                                                    <Trash01Icon />
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <DeleteItemDialog
                isOpen={isDeleteDialogOpen}
                handleClose={handleCloseDeleteDialog}
                handleDelete={handleDelete}
                itemId={activeItem?.id}
            />
        </div>
    );
};
