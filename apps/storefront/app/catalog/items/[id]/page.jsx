import ItemPage from "@/components/catalog/items/ItemPage";
import React from "react";
import { config } from "ui/config";

async function getItem(id) {
  const res = await fetch(`${process.env.CATALOG_API_URL}/items/${id}`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return data;
}

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  // fetch data
  const item = await getItem(id);

  return {
    title: `${config.platformName} | ${item?.name}`,
  };
}

export default async function page({ params }) {
  const item = await getItem(params.id);

  return (
    <>
      <ItemPage item={item} />
    </>
  );
}
