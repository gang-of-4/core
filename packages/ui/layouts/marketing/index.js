import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { styled } from '@mui/material/styles';


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%'
}));

export const Layout = (props) => {
  const { children, app } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  const sideItems = [];
  const topItems = [];

  // Refer to the following structure when passing sideItems

  /** 
  const items = [
    {
      title: 'Components',
      path: paths.components.index
    },
    {
      title: 'Pages',
      children: [
        {
          subheader: 'Dashboard',
          items: [
            {
              title: 'Overview',
              path: paths.dashboard.index
            },
            ...
          ]
        },
        {
          subheader: 'Other',
          items: [
            {
              title: 'Blog',
              path: paths.dashboard.blog.index
            },
            ...
          ]
        },
           ...
      ]
    },
     ...
  ];
  */

  // For topItems, the children should be a component
  // e.g. <PagesPopover /> from ui/layouts/marketing/pages-popover.js

  // If no children are used, both can use the same array

  return (
    <>
      <TopNav 
        onMobileNavOpen={mobileNav.handleOpen} 
        items={topItems} 
        openSide={sideItems.length > 0} 
        app={app} 
      />
      {!lgUp &&
        sideItems.length > 0 &&
        (
          <SideNav
            onClose={mobileNav.handleClose}
            open={mobileNav.isOpen}
            items={sideItems}
          />
        )}
      <LayoutRoot>
        {children}
      </LayoutRoot>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
