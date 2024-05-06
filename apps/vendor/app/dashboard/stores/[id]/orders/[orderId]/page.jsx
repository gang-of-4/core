import OrderDetailsPage from "@/components/dashboard/orders/OrderDetailsPage";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | ${capitalize(config.order.name)} Details`,
};

export default function page({ params }) {
  return (
    <>
      {!params.id ? (
        <></>
      ) : (
        <OrderDetailsPage orderId={params.orderId} storeId={params.id} />
      )}
    </>
  );
}
