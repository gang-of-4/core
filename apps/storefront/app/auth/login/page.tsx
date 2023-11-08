import React from 'react'
import Page from '@/components/auth/login'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Customer',
  description: 'Customer login page'
};


export default function page() {
  return (
    <Page />
  )
}
