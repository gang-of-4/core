import React from 'react'
import AddItem from '@/components/dashboard/catalog/AddItem'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Add Car | Vendor',
  description: 'Add car'
};

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

export default async function page({ params }: { params: { id: string, itemId: string } }) {

  const categories = await getCategories();
  const optionGroups = await getOptionGroups();

  return (
    <>
      <AddItem 
        storeId={params.id} 
        draftItemId={params.itemId}
        categories={categories}
        optionGroups={optionGroups}
       />
    </>

  )
}
