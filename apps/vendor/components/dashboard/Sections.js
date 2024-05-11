import { capitalize } from "@/utils/format-string";
import { SvgIcon } from "@mui/material";
import { Building02, Package, ReceiptCheck } from "@untitled-ui/icons-react";
import { config } from "ui/config";
import { HomeSmile } from "ui/icons/untitled-ui/duocolor/home-smile";
import { paths } from "ui/paths";

export const getSections = (activeStore) => [
  {
    items: [
      {
        title: "Home",
        path: paths.vendor.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmile />
          </SvgIcon>
        ),
      },
      {
        title: "Overview",
        path: activeStore
          ? `${paths.vendor.dashboard.stores.index}/${activeStore?.id}`
          : paths.vendor.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <Building02 />
          </SvgIcon>
        ),
      },
      {
        title: capitalize(config.catalog.item.plural),
        path: activeStore
          ? `${paths.vendor.dashboard.stores.index}/${activeStore?.id}/items`
          : paths.vendor.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <Package />
          </SvgIcon>
        ),
      },
      {
        title: capitalize(config.order.plural),
        path: activeStore
          ? `${paths.vendor.dashboard.stores.index}/${activeStore?.id}/orders`
          : paths.vendor.dashboard.stores.index,
        icon: (
          <SvgIcon fontSize="small">
            <ReceiptCheck />
          </SvgIcon>
        ),
      },
    ],
  },
];
