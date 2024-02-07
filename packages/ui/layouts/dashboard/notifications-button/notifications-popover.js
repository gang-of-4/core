import { format } from 'date-fns';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import Mail04Icon from '@untitled-ui/icons-react/build/esm/Mail04';
import MessageChatSquareIcon from '@untitled-ui/icons-react/build/esm/MessageChatSquare';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
  Avatar,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';

const renderContent = (notification) => {
  switch (notification.type) {
    case 'job_add': {
      const createdAt = format(notification.createdAt, 'MMM dd, h:mm a');

      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            <Avatar src={notification.avatar}>
              <SvgIcon>
                <User01Icon />
              </SvgIcon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="subtitle2"
                >
                  {notification.author}
                </Typography>
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="body2"
                >
                  added a new job
                </Typography>
                <Link
                  href="#"
                  underline="always"
                  variant="body2"
                >
                  {notification.job}
                </Link>
              </Box>
            )}
            secondary={(
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {createdAt}
              </Typography>
            )}
            sx={{ my: 0 }}
          />
        </>
      );
    }
    case 'new_feature': {
      const createdAt = format(notification.createdAt, 'MMM dd, h:mm a');

      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            <Avatar>
              <SvgIcon>
                <MessageChatSquareIcon />
              </SvgIcon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="subtitle2"
                >
                  New feature!
                </Typography>
                <Typography variant="body2">
                  {notification.description}
                </Typography>
              </Box>
            )}
            secondary={(
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {createdAt}
              </Typography>
            )}
            sx={{ my: 0 }}
          />
        </>
      );
    }
    case 'company_created': {
      const createdAt = format(notification.createdAt, 'MMM dd, h:mm a');

      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            <Avatar src={notification.avatar}>
              <SvgIcon>
                <User01Icon />
              </SvgIcon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  m: 0
                }}
              >
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="subtitle2"
                >
                  {notification.author}
                </Typography>
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="body2"
                >
                  created
                </Typography>
                <Link
                  href="#"
                  underline="always"
                  variant="body2"
                >
                  {notification.company}
                </Link>
              </Box>
            )}
            secondary={(
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {createdAt}
              </Typography>
            )}
            sx={{ my: 0 }}
          />
        </>
      );
    }
    default:
      return null;
  }
};

export function NotificationsPopover(props) {
  const {
    anchorEl,
    notifications,
    onClose,
    onMarkAllAsRead,
    onRemoveOne,
    open = false,
    ...other
  } = props;

  const isEmpty = notifications.length === 0;

  return (
    <Popover
      PaperProps={{ sx: { width: 380 } }}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={open}
      {...other}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography
          color="inherit"
          variant="h6"
        >
          Notifications
        </Typography>
        <Tooltip title="Mark all as read">
          <IconButton
            color="inherit"
            onClick={onMarkAllAsRead}
            size="small"
          >
            <SvgIcon>
              <Mail04Icon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </Stack>
      {isEmpty
        ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              There are no notifications
            </Typography>
          </Box>
        )
        : (
          <Scrollbar sx={{ maxHeight: 400 }}>
            <List disablePadding>
              {notifications.map((notification) => (
                <ListItem
                  divider
                  key={notification.id}
                  secondaryAction={(
                    <Tooltip title="Remove">
                      <IconButton
                        edge="end"
                        onClick={() => onRemoveOne?.(notification.id)}
                        size="small"
                      >
                        <SvgIcon>
                          <XIcon />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  )}
                  sx={{
                    alignItems: 'flex-start',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    },
                    '& .MuiListItemSecondaryAction-root': {
                      top: '24%'
                    }
                  }}
                >
                  {renderContent(notification)}
                </ListItem>
              ))}
            </List>
          </Scrollbar>
        )}
    </Popover>
  );
}