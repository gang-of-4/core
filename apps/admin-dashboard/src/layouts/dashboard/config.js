import { SvgIcon } from '@mui/material';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03';
import LayoutAlt02 from '@untitled-ui/icons-react/build/esm/LayoutAlt02';
import { paths } from '../../paths';

export const getSections = () => [
  {
    items: [
      {
        title: 'Overview',
        path: paths.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Stores',
        path: paths.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
      },
      {
        title: 'Catalog',
        path: paths.dashboard.catalog.index,
        icon: (
          <SvgIcon fontSize="small">
            <LayoutAlt02 />
          </SvgIcon>
        ),
        items: [
          {
            title: 'Cars',
            path: paths.dashboard.catalog.items.index
          },
          {
            title: 'Categories',
            path: paths.dashboard.catalog.categories.index
          },
          {
            title: 'Options',
            path: paths.dashboard.catalog.options.index
          }
        ]
      },
    ]
  }
];
