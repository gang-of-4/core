import OrderDetailsPage from "@/components/dashboard/orders/OrderDetailsPage";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | ${capitalize(config.order.plural)}`,
};

async function getOrder(orderId) {
  //   const res = await fetch(
  //     `${process.env.ORDERS_API_URL}/orders?store_id=${storeId}`,
  //     { next: { revalidate: 0 } }
  //   );

  //   const data = await res.json();

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch");
  //   }

  const data = {
    id: "e184cffd-01a6-568f-93c9-d2fe52d8613d",
    userId: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
    orderItems: [
      {
        id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
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
              {
                id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
                label: "Weave",
                value: "Weave",
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
    ],
    total: 100,
    subtota: 100,
    status: "INPROGRESS",
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
}

export default async function page({ params }) {
  let order = [];

  if (params.id) {
    order = await getOrder(params.orderId);
  }

  return (
    <>
      {!params.id ? (
        <></>
      ) : (
        <OrderDetailsPage order={order} storeId={params.id} />
      )}
    </>
  );
}
