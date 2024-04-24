import { SvgIcon } from '@mui/material';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03';
import LayoutAlt02 from '@untitled-ui/icons-react/build/esm/LayoutAlt02';
import { paths } from '../../paths';
import { capitalize } from '../../utils/format-string';
import { config } from 'ui/config';

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
        title: capitalize(config.store.plural),
        path: paths.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
      },
      {
        title: capitalize(config.catalog.name),
        path: paths.dashboard.catalog.index,
        icon: (
          <SvgIcon fontSize="small">
            <LayoutAlt02 />
          </SvgIcon>
        ),
        items: [
          {
            title: capitalize(config.catalog.item.plural),
            path: paths.dashboard.catalog.items.index
          },
          {
            title: capitalize(config.catalog.category.plural),
            path: paths.dashboard.catalog.categories.index
          },
          {
            title: capitalize(config.catalog.option.plural),
            path: paths.dashboard.catalog.options.index
          }
        ]
      },
    ]
  }
];
