import React from 'react'
import { Metadata } from 'next';
import ViewItem from '@/components/dashboard/catalog/itemPage/ViewItem';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';



export const metadata: Metadata = {
  title: `${config.platformName} | View ${capitalize(config.catalog.item.name)}`,
};

export default function page({ params }: { params: { id: string, itemId: string } }) {

  return (
    <>
      <ViewItem
        itemId={params.itemId}
        storeId={params.id}
      />
    </>

  )
}
