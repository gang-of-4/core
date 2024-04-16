import Catalog from '@/components/catalog/Catalog'
import React from 'react'
import { organization } from 'ui/config'

export const metadata = {
  title: `${organization.name} | Catalog`,
  description: 'Catalog of items',
}

async function getCategories() {
  const res = await fetch(
    `${process.env.CATALOG_API_URL}/categories`,
    { next: { revalidate: 0 } }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

async function getItems() {

  const res = await fetch(
    `${process.env.CATALOG_API_URL}/items`,
    { next: { revalidate: 0 } }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

async function getOptionGroups() {
  const res = await fetch(
    `${process.env.CATALOG_API_URL}/option-groups`,
    { next: { revalidate: 0 } }
  );

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
    optionGroups
  }

  return (
    <>
      <Catalog items={items} filters={filters} title={'Catalog'} />
    </>
  )
}
