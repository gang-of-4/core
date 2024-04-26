import AuthGuard from "@/components/auth/auth-guard";
import OrderDetails from "@/components/orders/orderPage/OrderDetails";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | Order Details`,
};

async function getOrder(id) {
  try {
    // @TODO: integrate with backend
    // const response = await fetch(`${process.env.ORDERS_API_URL}/${id}`, {
    //   next: { revalidate: 0 },
    // });

    // const data = await response.json();

    const data = {
      id: id,
      userId: `ijdladiw`,
      orderItems: [
        {
          id: "e185cffd-01a6-468f-93c9-d2fe52d8613d",
          name: "BMW m4",
          sku: "rpkfpk",
          quantity: 5,
          price: 20,
          storeId: "a3b636e5-26b0-4270-a563-6a509ca9ae52",
          status: "INPROGRESS",
          groups: [
            {
              id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
              type: "TEXT",
              title: "Seat",
              values: [
                {
                  id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
                  label: "Leather",
                  value: "Leather",
                },
              ],
            },
            {
              id: "e184cffd-01a6-468f-93c9-d2fe52d8612d",
              type: "COLOR",
              title: "Color",
              values: [
                {
                  id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
                  label: "Red",
                  value: "#ff0000",
                },
              ],
            },
          ],
          images: [
            {
              id: "1d85d5e2-467c-4233-9931-e198b515eb3d",
              name: "05398927-7bad-4269-9f53-ffda4ea61010.jpg",
              url: "https://media.cars4sale.tech/659073e8-8e22-45e7-81d3-3378b660bf8a/05398927-7bad-4269-9f53-ffda4ea61010.jpg",
              size: 7270,
              extension: "jpg",
              createdAt: "2024-04-23T14:08:02.757Z",
              updatedAt: "2024-04-23T14:08:02.757Z",
            },
          ],
          isVariant: true,
        },
        {
          id: "e184cffd-01a6-468f-93c9-a2fe52d8613d",
          name: "Lada Riva",
          sku: "rpkfpk",
          quantity: 5,
          price: 20,
          storeId: "a3b636e5-26b0-4270-a563-6a509ca9ae52",
          status: "DELIVEREDTOWAREHOUSE",
          images: [
            {
              id: "6490a30a-928c-4532-8aa8-3122f6b983f8",
              name: "a43fb12a-855c-4577-8401-4e2fc0ebf4d3.jpeg",
              extension: "jpeg",
              size: 55629,
              createdAt: "2024-04-25T07:37:51.156Z",
              updatedAt: "2024-04-25T07:37:51.156Z",
              url: "https://media.cars4sale.tech/d139c8eb-d578-4a80-a719-3ab582bb9223/a43fb12a-855c-4577-8401-4e2fc0ebf4d3.jpeg",
            },
          ],
          isVariant: false,
        },
      ],
      total: 200,
      subtota: 200,
      status: "DELIVERED",
      orderAddress: {
        id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
        country: "United States",
        city: "Los Angeles",
        street: "Eclipse St",
        postalCode: "1234",
        notes: "Next to the gas station.",
      },
      createdAt: "2024-04-23T14:08:02.757Z",
    };

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function page({ params }) {
  const order = await getOrder(params.id);

  return (
    <AuthGuard role="customer">
      <OrderDetails order={order} />
    </AuthGuard>
  );
}
