import Home from '@/components/dashboard/Home'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Vendor Dashboard',
  description: 'Vendor Dashboard',
}

export default function page() {
  return (
    <>
      <Home />
    </>
  )
}
