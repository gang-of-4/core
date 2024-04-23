import Catalog from "@/components/catalog/Catalog";
import { capitalize } from "@/utils/format-string";
import React from "react";
import { config } from "ui/config";

const catalogName = capitalize(config.catalog.name);

export const metadata = {
  title: `${config.platformName} | ${catalogName}`,
};

async function getCategories() {
  const res = await fetch(`${process.env.CATALOG_API_URL}/categories`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

async function getItems() {
  const res = await fetch(`${process.env.CATALOG_API_URL}/items`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

async function getOptionGroups() {
  const res = await fetch(`${process.env.CATALOG_API_URL}/option-groups`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

export default async function page() {
  const categories = await getCategories();
  const items = await getItems();
  const optionGroups = await getOptionGroups();

  const filters = {
    categories,
    optionGroups,
  };

  return (
    <>
      <Catalog items={items} filters={filters} title={catalogName} />
    </>
  );
}
