import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MobileNav } from "../mobile-nav";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

const SIDE_NAV_WIDTH = 280;

const useMobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const VerticalLayout = (props) => {
  const {
    children,
    sections,
    navColor,
    bgUrl = "/admin/assets/gradient-bg.svg",
  } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const mobileNav = useMobileNav();

  return (
    <>
      <Box
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundImage: `url(${bgUrl})`,
          height: "100vh",
        }}
      >
        <TopNav onMobileNavOpen={mobileNav.handleOpen} />
        {lgUp && <SideNav color={navColor} sections={sections} />}
        {!lgUp && (
          <MobileNav
            color={navColor}
            onClose={mobileNav.handleClose}
            open={mobileNav.isOpen}
            sections={sections}
          />
        )}
        <VerticalLayoutRoot>
          <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
        </VerticalLayoutRoot>
      </Box>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
};
