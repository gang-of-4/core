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
import { useAuth } from '../../../hooks/use-auth';
import { paths } from '../../../paths';
import { Issuer } from '../../../utils/auth';

export function AccountPopover(props) {
  const { anchorEl, onClose, open, listItems, ...other } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      onClose?.();

      switch (auth.issuer) {
        case Issuer.Amplify: {
          await auth.signOut();
          break;
        }

        case Issuer.Auth0: {
          await auth.logout();
          break;
        }

        case Issuer.Firebase: {
          await auth.signOut();
          break;
        }

        case Issuer.JWT: {
          await auth.signOut();
          break;
        }

        default: {
          throw new Error('Unsupported issuer');
        }
      }

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