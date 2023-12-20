import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Drawer, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Logo } from '../../../components/logo';
import { Scrollbar } from '../../../components/scrollbar';
import { paths } from '../../../paths';
import { SideNavSection } from './side-nav-section';
import { organization } from 'ui/config'


const SIDE_NAV_WIDTH = 280;

const useCssVars = (color) => {
  const theme = useTheme();

  return useMemo(() => {
    if (theme.palette.mode === 'dark') {
      return {
        '--nav-bg': theme.palette.neutral[800],
        '--nav-color': theme.palette.common.white,
        '--nav-border-color': 'transparent',
        '--nav-logo-border': theme.palette.neutral[700],
        '--nav-section-title-color': theme.palette.neutral[400],
        '--nav-item-color': theme.palette.neutral[400],
        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-color': theme.palette.common.white,
        '--nav-item-disabled-color': theme.palette.neutral[500],
        '--nav-item-icon-color': theme.palette.neutral[400],
        '--nav-item-icon-active-color': theme.palette.primary.main,
        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
        '--nav-item-chevron-color': theme.palette.neutral[600],
        '--nav-scrollbar-color': theme.palette.neutral[400]
      };
    } else {
      return {
        '--nav-bg': theme.palette.neutral[800],
        '--nav-color': theme.palette.common.white,
        '--nav-border-color': 'transparent',
        '--nav-logo-border': theme.palette.neutral[700],
        '--nav-section-title-color': theme.palette.neutral[400],
        '--nav-item-color': theme.palette.neutral[400],
        '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
        '--nav-item-active-color': theme.palette.common.white,
        '--nav-item-disabled-color': theme.palette.neutral[500],
        '--nav-item-icon-color': theme.palette.neutral[400],
        '--nav-item-icon-active-color': theme.palette.primary.main,
        '--nav-item-icon-disabled-color': theme.palette.neutral[500],
        '--nav-item-chevron-color': theme.palette.neutral[600],
        '--nav-scrollbar-color': theme.palette.neutral[400]
      };
    }
  }, [theme, color]);
};

export const SideNav = (props) => {
  const { color = 'evident', sections = [] } = props;
  const pathname = usePathname();
  const cssVars = useCssVars(color);

  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: 'var(--nav-bg)',
          borderRightColor: 'var(--nav-border-color)',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          color: 'var(--nav-color)',
          width: SIDE_NAV_WIDTH
        }
      }}
      variant="permanent"
    >
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          },
          '& .simplebar-scrollbar:before': {
            background: 'var(--nav-scrollbar-color)'
          }
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Box
              component={NextLink}
              href={paths.index}
              sx={{
                borderColor: 'var(--nav-logo-border)',
                borderRadius: 1,
                borderStyle: 'solid',
                borderWidth: 1,
                display: 'flex',
                height: 40,
                p: '4px',
                width: 40
              }}
            >
              <Logo />
            </Box>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              {...props}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  color="inherit"
                  variant="h6"
                >
                  {organization.name}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack
            component="nav"
            spacing={2}
            sx={{
              flexGrow: 1,
              px: 2
            }}
          >
            {sections.map((section, index) => (
              <SideNavSection
                items={section.items}
                key={index}
                pathname={pathname}
                subheader={section.subheader}
              />
            ))}
          </Stack>
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle1">
              Need help?
            </Typography>
            <Typography
              color="neutral.400"
              variant="body2"
            >
              Feel free to contact us.
            </Typography>
          </Box>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
};

SideNav.propTypes = {
  color: PropTypes.oneOf(['evident']),
  sections: PropTypes.array
};
