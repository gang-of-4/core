
import AuthGuard from '@/components/auth/auth-guard'
import CartPage from '@/components/cart/CartPage'
import React from 'react'
import { config } from 'ui/config'

export const metadata = {
  title: `${config.platformName} | Cart`,
}

export default function page() {
  return (
    <AuthGuard role='customer'>
      <CartPage />
    </AuthGuard>
  )
}
