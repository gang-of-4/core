import { SvgIcon } from '@mui/material';
import HomeSmileIcon from 'ui/icons/untitled-ui/duocolor/home-smile';
import { paths } from 'ui/paths';

export const getSections = () => [
  {
    items: [
      {
        title: 'Home',
        path: paths.vendor.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Overview',
        //path: `${paths.vendor.dashboard.stores.index}/${id}`,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        )
      },
    ]
  },
];
