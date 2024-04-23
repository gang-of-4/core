import CheckoutPage from '@/components/cart/checkout/CheckoutPage'
import AuthGuard from '@/components/auth/auth-guard'
import React from 'react'

export const metadata = {
  title: 'Checkout',
  description: 'Your checkout',
}

export default function page() {
  return (
    <AuthGuard role='customer'>
      <CheckoutPage />
    </AuthGuard>
  )
}
