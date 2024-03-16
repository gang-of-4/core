import CheckoutPage from '@/components/cart/CheckoutPage'
import AuthGuard from '@/components/auth/auth-guard'
import React from 'react'

export const meta = {
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
