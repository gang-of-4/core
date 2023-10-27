"use client"

import Link from 'next/link';
import React from 'react'
import { useAuth } from 'ui/hooks/use-auth';
import { paths } from 'ui/paths';

export default function UserAuth() {

    const { user, isAuthenticated, signOut} = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Logged in as {user.name}</p>
                    <button
                        onClick={signOut}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <p>Not logged in</p>
                    <Link href={paths.auth.login}>Login</Link>
                </div>
            )}
        </div>
    )
}
