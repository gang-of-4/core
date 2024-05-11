import AuthGuard from "@/components/auth/auth-guard";
import OrderPage from "@/components/orders/orderPage/OrderPage";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | Order Details`,
};

export default async function page({ params }) {
  return (
    <AuthGuard role="customer">
      <OrderPage orderId={params.id} />
    </AuthGuard>
  );
}
