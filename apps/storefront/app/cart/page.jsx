
import AuthGuard from '@/components/auth/auth-guard'
import CartPage from '@/components/cart/CartPage'
import React from 'react'

export default function page() {
  return (
    <AuthGuard role='customer'>
      <CartPage />
    </AuthGuard>
  )
}
