import AuthGuard from "@/components/auth/auth-guard";
import OrdersPage from "@/components/orders/ordersList/OrdersPage";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | My Orders`,
};

export default function page() {
  return (
    <AuthGuard role="customer">
      <OrdersPage />
    </AuthGuard>
  );
}
