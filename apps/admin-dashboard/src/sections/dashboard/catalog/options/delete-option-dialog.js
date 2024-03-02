import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export function DeleteOptionDialog({ group }) {

    const [isOpen, setIsOpen] = useState(false);

    async function handleDelete() {
        try {
            // @NOW-TODO delete option
            console.log('Deleting...', group);
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(false)
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true)
                }}
                variant="contained"
                color='error'

            >
                Delete
            </Button>
            <Box
                sx={{ mt: 3 }}
            >
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Remove this option group,
                    please be aware that what has been deleted can not be brought back.
                </Typography>
            </Box>
            <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
            >
                <DialogTitle id='delete-option-dialog'>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-option-dialog-description">
                        Are you sure you want to delete the option group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => { setIsOpen(false) }}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant='contained'
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
