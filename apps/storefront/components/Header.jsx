"use client"

import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Layout as MainLayout } from 'ui/layouts/marketing'

export default function Header() {

  const auth = useAuth();

  return (
    <>
      <MainLayout auth={auth}>
        {/* place nav items here */}
      </MainLayout>
    </>
  )
}
