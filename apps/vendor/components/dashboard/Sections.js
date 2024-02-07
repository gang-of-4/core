import { SvgIcon } from '@mui/material';
import { HomeSmile } from 'ui/icons/untitled-ui/duocolor/home-smile';
import { paths } from 'ui/paths';

export const getSections = () => [
  {
    items: [
      {
        title: 'Overview',
        path: paths.vendor.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmile />
          </SvgIcon>
        )
      },
    ]
  },
];
