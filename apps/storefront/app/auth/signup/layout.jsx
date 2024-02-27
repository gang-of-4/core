"use client"

import { GuestGuard } from '@/utils/guards/guest-guard'
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