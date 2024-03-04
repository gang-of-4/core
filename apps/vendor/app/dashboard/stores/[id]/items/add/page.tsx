import React from 'react'
import AddCar from '@/components/dashboard/items/AddCar'
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Add Car | Vendor',
  description: 'Add car'
};

export default function page({ params }: { params: { id: string } }) {

  return (
    <>
    <AddCar  storeId ={params.id}/>
    </>
    
  )
}
