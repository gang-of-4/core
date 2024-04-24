import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import { catalogApi } from "../../../../api/catalog";
import { config } from "ui/config";

export function DeleteCategory({ category }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete(categoryId) {
    try {
      await catalogApi.deleteCategory(categoryId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  }

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
          Remove this {config.catalog.category.name}, please be aware that what
          has been deleted can not be brought back.
        </Typography>
      </Box>
      <DeleteCategoryDialog
        category={category}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
