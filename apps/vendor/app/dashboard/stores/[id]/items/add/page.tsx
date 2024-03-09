import React from 'react'
import AddItem from '@/components/dashboard/catalog/AddItem'
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Add Car | Vendor',
  description: 'Add car'
};

export default function page({ params }: { params: { id: string } }) {

  return (
    <>
      <AddItem storeId={params.id} />
    </>

  )
}
