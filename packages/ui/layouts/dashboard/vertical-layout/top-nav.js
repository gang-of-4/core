import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { Box, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountButton } from '../account-button';
import { ContactsButton } from '../contacts-button';
import { LanguageSwitch } from '../language-switch';
import { NotificationsButton } from '../notifications-button';
import { SearchButton } from '../search-button';
import NextLink from 'next/link';
import { paths } from '../../../paths';
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';

const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 280;

export const TopNav = (props) => {
  const { onMobileNavOpen, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
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
            <IconButton onClick={onMobileNavOpen}>
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
          <LanguageSwitch />
          <NotificationsButton />
          <ContactsButton />
          <AccountButton>
            <Box sx={{ p: 1 }}>
              <ListItemButton
                component={NextLink}
                href={paths.dashboard.social.profile}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5
                }}
              >
                <ListItemIcon>
                  <SvgIcon fontSize="small">
                    <User03Icon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <Typography variant="body1">
                      Profile
                    </Typography>
                  )}
                />
              </ListItemButton>
              <ListItemButton
                component={NextLink}
                href={paths.dashboard.account}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5
                }}
              >
                <ListItemIcon>
                  <SvgIcon fontSize="small">
                    <Settings04Icon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <Typography variant="body1">
                      Settings
                    </Typography>
                  )}
                />
              </ListItemButton>
              <ListItemButton
                component={NextLink}
                href={paths.dashboard.index}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5
                }}
              >
                <ListItemIcon>
                  <SvgIcon fontSize="small">
                    <CreditCard01Icon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <Typography variant="body1">
                      Billing
                    </Typography>
                  )}
                />
              </ListItemButton>
            </Box>
          </AccountButton>
        </Stack>
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func
};
