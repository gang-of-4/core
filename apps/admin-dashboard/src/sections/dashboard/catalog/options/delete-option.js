import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { DeleteOptionDialog } from "./delete-option-dialog";
import { config } from "ui/config";

export function DeleteOption({ group }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        variant="contained"
        color="error"
      >
        Delete
      </Button>
      <Box sx={{ mt: 3 }}>
        <Typography color="text.secondary" variant="body2">
          Remove this {config.catalog.optionGroup.name}, please be aware that
          what has been deleted can not be brought back.
        </Typography>
      </Box>
      <DeleteOptionDialog group={group} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
