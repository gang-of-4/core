"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";
import React from "react";

export default function CancelOrderDialog({
  isDialogOpen,
  handleDialogClose,
  handleCancelOrder,
}) {
  const orderName = capitalize(config.order.name);
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="cancel-order-dialog-title"
      aria-describedby="cancel-order-dialog-description"
    >
      <DialogTitle id="cancel-order-dialog-title">
        Confirm Cancellation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="cancel-order-dialog-description">
          Are you sure you want to cancel this {orderName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={handleCancelOrder} color="error" variant="outlined">
          Yes, Cancel {orderName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
