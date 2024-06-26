import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Logo } from "../../../components/logo";
import { Scrollbar } from "../../../components/scrollbar";
import { paths } from "../../../paths";
import { OptionSwitch } from "../option-switch";
import { SideNavSection } from "../vertical-layout/side-nav-section";
import { config } from "../../../config";

const MOBILE_NAV_WIDTH = 280;

const useCssVars = (color) => {
  const theme = useTheme();

  return useMemo(() => {
    switch (color) {
      // Blend-in and discreet have no difference on mobile because
      // there's a backdrop and differences are not visible
      case "blend-in":
      case "discreet":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.background.default,
            "--nav-color": theme.palette.neutral[100],
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.text.primary,
            "--nav-item-disabled-color": theme.palette.neutral[600],
            "--nav-item-icon-color": theme.palette.neutral[500],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[700],
            "--nav-item-chevron-color": theme.palette.neutral[700],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        }
        return {
          "--nav-bg": theme.palette.background.default,
          "--nav-color": theme.palette.text.primary,
          "--nav-logo-border": theme.palette.neutral[100],
          "--nav-section-title-color": theme.palette.neutral[400],
          "--nav-item-color": theme.palette.text.secondary,
          "--nav-item-hover-bg": theme.palette.action.hover,
          "--nav-item-active-bg": theme.palette.action.selected,
          "--nav-item-active-color": theme.palette.text.primary,
          "--nav-item-disabled-color": theme.palette.neutral[400],
          "--nav-item-icon-color": theme.palette.neutral[400],
          "--nav-item-icon-active-color": theme.palette.primary.main,
          "--nav-item-icon-disabled-color": theme.palette.neutral[400],
          "--nav-item-chevron-color": theme.palette.neutral[400],
          "--nav-scrollbar-color": theme.palette.neutral[900],
        };

      case "evident":
        if (theme.palette.mode === "dark") {
          return {
            "--nav-bg": theme.palette.neutral[800],
            "--nav-color": theme.palette.common.white,
            "--nav-logo-border": theme.palette.neutral[700],
            "--nav-section-title-color": theme.palette.neutral[400],
            "--nav-item-color": theme.palette.neutral[400],
            "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
            "--nav-item-active-color": theme.palette.common.white,
            "--nav-item-disabled-color": theme.palette.neutral[500],
            "--nav-item-icon-color": theme.palette.neutral[400],
            "--nav-item-icon-active-color": theme.palette.primary.main,
            "--nav-item-icon-disabled-color": theme.palette.neutral[500],
            "--nav-item-chevron-color": theme.palette.neutral[600],
            "--nav-scrollbar-color": theme.palette.neutral[400],
          };
        }
        return {
          "--nav-bg": theme.palette.neutral[800],
          "--nav-color": theme.palette.common.white,
          "--nav-logo-border": theme.palette.neutral[700],
          "--nav-section-title-color": theme.palette.neutral[400],
          "--nav-item-color": theme.palette.neutral[400],
          "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-color": theme.palette.common.white,
          "--nav-item-disabled-color": theme.palette.neutral[500],
          "--nav-item-icon-color": theme.palette.neutral[400],
          "--nav-item-icon-active-color": theme.palette.primary.main,
          "--nav-item-icon-disabled-color": theme.palette.neutral[500],
          "--nav-item-chevron-color": theme.palette.neutral[600],
          "--nav-scrollbar-color": theme.palette.neutral[400],
        };

      default:
        return {};
    }
  }, [theme, color]);
};

export function MobileNav(props) {
  const { color = "evident", open, onClose, sections = [], options } = props;
  const pathname = usePathname();
  const cssVars = useCssVars(color);

  return (
    <Drawer
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: "var(--nav-bg)",
          color: "var(--nav-color)",
          width: MOBILE_NAV_WIDTH,
        },
      }}
      anchor="left"
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              p: 3,
            }}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Box
                component={NextLink}
                href={paths.index}
                sx={{
                  borderColor: "var(--nav-logo-border)",
                  borderRadius: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  display: "flex",
                  height: 40,
                  p: "4px",
                  width: 40,
                }}
              >
                <Logo />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography color="inherit" variant="h6">
                  {config.platformName}
                </Typography>
              </Box>
            </Stack>
            <Stack>
              <Typography color="inherit" variant="subtitle2">
                <Box sx={{ fontStyle: "oblique" }}>Vendor Dashboard</Box>
              </Typography>
            </Stack>
          </Stack>
          <Stack
            component="nav"
            spacing={2}
            sx={{
              flexGrow: 1,
              px: 2,
            }}
          >
            {options ? (
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                }}
              >
                <OptionSwitch
                  firstOption={options.firstOption}
                  handleOptionsChange={options.handleChange}
                  options={options.list}
                  optionsSubtitle={options.subtitle}
                  optionsTitle={options.title}
                  sx={{ flexGrow: 1 }}
                />
              </Stack>
            ) : null}
            {sections.map((section, index) => (
              <SideNavSection
                items={section.items}
                key={index}
                pathname={pathname}
                subheader={section.subheader}
              />
            ))}
          </Stack>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
