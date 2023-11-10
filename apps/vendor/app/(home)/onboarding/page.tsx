import React from 'react'
import Page from '@/components/onboarding/onboarding'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Onboarding',
  description: 'Vendor Onboarding',
}


export default function page() {
  return (
    <Page />
  )
}
