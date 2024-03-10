import React from 'react'
import EditItem from '@/components/dashboard/catalog/EditItem'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Car | Vendor',
  description: 'Edit car'
};

async function getItem(id: string) {

  const res = await fetch(
  `${process.env.CATALOG_API_URL}/items/${id}`,
    {
      method: "GET",
      next: { revalidate: 0 },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

export default async function page({ params }: { params: { id: string, itemId: string } }) {
  const item = await getItem(params.itemId);

  return (
    <EditItem storeId={params.id} item={item} />
  )
}
