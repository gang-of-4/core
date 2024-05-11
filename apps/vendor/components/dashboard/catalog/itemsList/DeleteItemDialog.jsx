'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { config } from "ui/config"


export default function DeleteItemDialog({
    isOpen,
    handleClose,
    handleDelete,
    itemId
}) {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle id="delete-item-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-item-dialog-description">
                    Are you sure you want to delete this {config.catalog.item.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleDelete(itemId)} color="error" variant='contained'>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
