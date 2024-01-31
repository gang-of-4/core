import React from 'react'
import EditCar from '@/components/dashboard/cars/EditCar'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Car | Vendor',
  description: 'Edit car'
};

async function getCar(id: string, carId: string) {
  const car = await fetch(
      `${process.env.STORES_API_URL}/${id}/cars/${carId}`,
      { next: {revalidate: 0} }
  ).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
  });
  const formattedCar = await formatCar(car);
  return formattedCar;
}

export default function page({ params }: { params: { id: string } }) {

  const car = await getCar(params.id);
  return (
    <EditCar  storeId ={params.id} car={car} />
  )
}
