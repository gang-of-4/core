import React from 'react'
import { Metadata } from 'next';
import ViewItem from '@/components/dashboard/items/ViewItem';



export const metadata: Metadata = {
  title: 'View Car | Vendor',
  description: 'View car'
};

export default function page({ params }: { params: { id: string } }) {

  return (
    <>
    <ViewItem />
    </>
    
  )
}
