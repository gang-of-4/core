'use client'
import AuthGuard from '@/components/auth/auth-guard'


export default function layout({ children }) {
    return (
        <>
            <AuthGuard role={'vendor'}>
                {children}
            </AuthGuard>
        </>
    )
}
