
import AuthGuard from '@/components/auth/auth-guard'
import CartPage from '@/components/cart/CartPage'
import React from 'react'

export const metadata = {
  title: 'Cart',
  description: 'Your cart',
}

export default function page() {
  return (
    <AuthGuard role='customer'>
      <CartPage />
    </AuthGuard>
  )
}
