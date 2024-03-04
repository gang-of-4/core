import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav';
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

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%'
}));

export function Layout(props) {
  const { children, app, auth } = props;
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
        app={app} 
        auth={auth}
        items={topItems} 
        onMobileNavOpen={mobileNav.handleOpen} 
        openSide={sideItems.length > 0} 
      />
      {!lgUp &&
        sideItems.length > 0 &&
        (
          <SideNav
            items={sideItems}
            onClose={mobileNav.handleClose}
            open={mobileNav.isOpen}
          />
        )}
      <LayoutRoot>
        {children}
      </LayoutRoot>
    </>
  );
}
