import OrdersPage from "@/components/dashboard/orders/OrdersPage";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | ${capitalize(config.order.plural)}`,
};

export default function page({ params }) {
  let orders = [];
  let storeId = params.id;

  return (
    <>{!storeId ? <></> : <OrdersPage orders={orders} storeId={storeId} />}</>
  );
}
