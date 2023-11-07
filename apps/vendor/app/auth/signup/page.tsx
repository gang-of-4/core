import React from 'react'
import Page from '@/components/auth/signup'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | Vendor',
  description: 'Vendor sign up page'
};

export default function page() {
  return (
    <Page />
  )
}
