import { useActiveStore } from '@/contexts/ActiveStoreContext';
import { SvgIcon } from '@mui/material';
import { Building02, Package } from '@untitled-ui/icons-react';
import { HomeSmile } from 'ui/icons/untitled-ui/duocolor/home-smile';
import { paths } from 'ui/paths';

export const getSections = (activeStore) => [
  {
    items: [
      {
        title: 'Home',
        path: paths.vendor.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmile />
          </SvgIcon>
        )
      },
      {
        title: 'Overview',
        path: activeStore ?
          `${paths.vendor.dashboard.stores.index}/${activeStore?.id}`
          : paths.vendor.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <Building02 />
          </SvgIcon>
        )
      },
      {
        title: 'Cars',
        path: activeStore ?
          `${paths.vendor.dashboard.stores.index}/${activeStore?.id}/items` 
          : paths.vendor.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <Package />
          </SvgIcon>
        )
      },
    ]
  },
];
