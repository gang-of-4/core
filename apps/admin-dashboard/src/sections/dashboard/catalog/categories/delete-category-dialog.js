import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

export function DeleteCategoryDialog({ category, isOpen, setIsOpen, handleDelete }) {

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
            >
                <DialogTitle id='delete-category-dialog'>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-category-dialog-description">
                        Are you sure you want to delete the category?
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
                        onClick={() => handleDelete(category.id)}
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
