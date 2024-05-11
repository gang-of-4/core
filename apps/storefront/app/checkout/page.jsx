import CheckoutPage from '@/components/cart/checkout/CheckoutPage'
import AuthGuard from '@/components/auth/auth-guard'
import React from 'react'
import { config } from 'ui/config'

export const metadata = {
  title: `${config.platformName} | Checkout`,
}

export default function page() {
  return (
    <AuthGuard role='customer'>
      <CheckoutPage />
    </AuthGuard>
  )
}
