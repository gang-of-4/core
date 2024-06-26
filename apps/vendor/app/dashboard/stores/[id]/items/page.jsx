import Page from "@/components/dashboard/catalog/itemsList/ItemsPage";
import SelectStore from "@/components/dashboard/catalog/SelectStore";
import { capitalize } from "@/utils/format-string";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | ${capitalize(config.catalog.item.plural)}`,
};

async function getItems(storeId) {

  const res = await fetch(
    `${process.env.CATALOG_API_URL}/items?store_id=${storeId}`,
    { next: { revalidate: 0 } }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}


export default async function page({ params }) {

  let items = [];

  if (params.id) {
    items = await getItems(params.id);
  }

  return (
    <>
      {!params.id ?
        <SelectStore />
        :
        <Page
          items={items}
          storeId={params.id}
        />
      }
    </>
  );
}
