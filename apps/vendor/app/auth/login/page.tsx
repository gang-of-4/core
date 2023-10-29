import React from 'react'
import Page from '../../../components/login'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Vendor',
  description: 'Vendor login page'
};


export default function page() {
  return (
    <Page />
  )
}
