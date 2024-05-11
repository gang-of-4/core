import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { catalogApi } from "../../../../api/catalog";
import { useRouter } from "next/navigation";
import { paths } from "../../../../paths";
import { useMounted } from "../../../../hooks/use-mounted";
import { config } from "ui/config";

export function DeleteOptionDialog({ group, isOpen, setIsOpen }) {
  const router = useRouter();
  const isMounted = useMounted();

  async function handleDelete() {
    try {
      await catalogApi.deleteOptionGroup(group.id);

      if (isMounted()) {
        router.push(paths.dashboard.catalog.options.index);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle id="delete-option-dialog">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-option-dialog-description">
            Are you sure you want to delete this{" "}
            {config.catalog.optionGroup.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            color="inherit"
          >
            Cancel
          </Button>
          <Tooltip title="This action will be added in a future release">
            <div>
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                disabled
              >
                Delete
              </Button>
            </div>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}
