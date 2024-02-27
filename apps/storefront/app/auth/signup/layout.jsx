"use client"

import { GuestGuard } from '@/components/auth/guest-guard'
import React from 'react'

export default function layout({ children }) {
    return (
        <>
            <GuestGuard>
                {children}
            </GuestGuard>
        </>
    )
};