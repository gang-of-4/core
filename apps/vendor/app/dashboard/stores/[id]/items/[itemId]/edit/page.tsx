import React from 'react'
import EditCar from '@/components/dashboard/items/EditCar'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Car | Vendor',
  description: 'Edit car'
};

async function getCar(id: string) {
  const car = await fetch(
      `${process.env.ITEMS_API_URL}/${id}`,
      { next: {revalidate: 0} }
  ).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
  });
  return car;
}

export default function page({ params }: { params: { id: string, carId: string } }) {
  const car = getCar(params.carId);
  return (
    <EditCar  storeId ={params.id} car={car} />
  )
}
