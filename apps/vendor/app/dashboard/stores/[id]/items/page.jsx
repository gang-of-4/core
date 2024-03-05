import Page from "@/components/dashboard/items/ItemsPage";
import React from "react";

export const metadata = {
  title: "Cars | Vendor",
};

async function getItems(storeId) {

  // @TODO integrate with the catalog API
  // const res = await fetch(
  //   `${process.env.CATALOG_API_URL}/items/store/${storeId}`,
  //   {
  //     method: "GET",
  //     next: { revalidate: 0 },
  //   }
  // );

  // const data = await res.json();

  // if (!res.ok) {
  //   throw new Error("Failed to fetch");
  // }

  const data = [
    { id: 1, name: 'Car 1', status: 'Active' },
    { id: 2, name: 'Car 2', status: 'Inactive' },
  ];

  return data;
}

export default async function page({ params }) {

  let items = [];

  if (params.id) {
    items = await getItems(params.id);
  }

  return (
    <>
      <Page items={items} />
    </>
  );
}
