import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import { AccountButton } from '../account-button';
import { NotificationsButton } from '../notifications-button';
import { SearchButton } from '../search-button';

const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 280;

export function TopNav(props) {
  const { onMobileNavOpen, children, auth, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
        },
        zIndex: (theme) => theme.zIndex.appBar
      }}
      {...other}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          {!lgUp && (
            <IconButton
              data-test="mobile-nav-open"
              onClick={onMobileNavOpen}
            >
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
          <SearchButton />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          {/* options under topnav go here */}
          {children}
          <NotificationsButton />
          <AccountButton auth={auth}>
            {/* options under account popover go here */}
          </AccountButton>
        </Stack>
      </Stack>
    </Box >
  );
}