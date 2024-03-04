import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Divider,
  Popover,
  Typography
} from '@mui/material';
import { paths } from '../../../paths';

export function AccountPopover(props) {
  const { anchorEl, auth, onClose, open, listItems, ...other } = props;
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      onClose();
      await auth.signOut();
      router.push(paths.index);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }, [auth, router, onClose]);

  return (
    <Popover
      PaperProps={{ sx: { width: 200 } }}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={Boolean(open)}
      {...other}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          {auth.user?.firstName} {auth.user?.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth.user?.email}
        </Typography>
      </Box>
      <Divider />
      {listItems}
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center'
        }}
      >
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
}