import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from 'ui/paths';
import { useStores } from '@/contexts/StoresContext';
import { useActiveStore } from '@/contexts/ActiveStoreContext';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';

export default function DeleteStoreDialog({ store }) {

    const { setActiveStore } = useActiveStore();

    const router = useRouter();
    const { deleteStore } = useStores();

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const storeName = config.store.name;

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteStore = async () => {
        try {
            await deleteStore(store.id);
            setActiveStore(null);
            router.push(paths.vendor.dashboard.index);
        } catch (error) {
            console.error(error);
        } finally {
            handleCloseDeleteDialog();
        }
    };
    return (
        <>
            <Card>
                <CardHeader title={`${capitalize(storeName)} Management`} />
                <CardContent sx={{ pt: 0 }}>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleOpenDeleteDialog}
                        data-test="delete-store-button"
                    >
                        Delete {capitalize(storeName)}
                    </Button>
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            Remove this {storeName},
                            please be aware that what has been deleted can never be brought
                            back.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-store-dialog-title"
                aria-describedby="delete-store-dialog-description"
            >
                <DialogTitle id="delete-store-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-store-dialog-description">
                        Are you sure you want to delete the {storeName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteStore} color="error" variant='contained' data-test="confirm-delete-store-button">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
