import { SvgIcon } from '@mui/material';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03';
import { tokens } from '../../locales/tokens';
import { paths } from '../../paths';

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        )
      },
      {
        title: t(tokens.nav.stores),
        path: paths.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
      },
    ]
  }
];
