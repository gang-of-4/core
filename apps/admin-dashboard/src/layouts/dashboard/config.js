import { SvgIcon } from '@mui/material';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import LayoutAlt02 from '@untitled-ui/icons-react/build/esm/LayoutAlt02';
import { Building02, ReceiptCheck } from "@untitled-ui/icons-react";
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
            <Building02 />
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
      {
        title: capitalize(config.order.plural),
        path: paths.dashboard.orders.index,
        icon: (
          <SvgIcon fontSize="small">
            <ReceiptCheck />
          </SvgIcon>
        ),
      },
    ]
  }
];
