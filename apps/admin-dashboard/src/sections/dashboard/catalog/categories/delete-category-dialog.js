import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { catalogApi } from '../../../../api/catalog';
import { useRouter } from 'next/navigation';
import { paths } from '../../../../paths';
import { useMounted } from '../../../../hooks/use-mounted';

export function DeleteCategoryDialog({ category, isOpen, setIsOpen }) {

    const router = useRouter();
    const isMounted = useMounted();


    async function handleDelete() {
        try {
            await catalogApi.deleteCategory(category.id)

        if (isMounted()) {
          router.push(paths.dashboard.catalog.categories.index);
        }
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(false)
        }
    }

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
