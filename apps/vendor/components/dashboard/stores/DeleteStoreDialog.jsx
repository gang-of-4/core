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
import { useState, useEffect } from 'react';
import { useStores } from '@/hooks/useStores';

export default function DeleteStoreDialog({ params }) {

    const { stores } = useStores();
    const [currentStore, setCurrentStore] = useState();
    const { deleteStore } = useStores();

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (params && params.id && params.id[0]) {
            setCurrentStore(stores?.find(store => store.id === params.id[0]));
        }
    }, [params, stores]);


    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteStore = async () => {
        try {
            const store = {
                storeId: currentStore.id,
            };
            await deleteStore(store);
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
                <CardHeader title="Store Management" />
                <CardContent sx={{ pt: 0 }}>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleOpenDeleteDialog}
                    >
                        Delete Store
                    </Button>
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            Remove this store,
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
                        Are you sure you want to delete the store?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteStore} color="error" variant="outlined">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
