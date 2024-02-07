import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MobileNav } from '../mobile-nav';
import { TopNav } from './top-nav';

const useMobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
      handlePathnameChange();
    },
     
    [pathname]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    handleOpen,
    handleClose
  };
};

const HorizontalLayoutRoot = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%'
});

const HorizontalLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export function HorizontalLayout(props) {
  const { children, navColor, sections } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav
        color={navColor}
        onMobileNav={mobileNav.handleOpen}
        sections={sections}
      >
        {/* options under top nav go here */}
      </TopNav>
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.isOpen}
          sections={sections}
        />
      )}
      <HorizontalLayoutRoot>
        <HorizontalLayoutContainer>
          {children}
        </HorizontalLayoutContainer>
      </HorizontalLayoutRoot>
    </>
  );
}
