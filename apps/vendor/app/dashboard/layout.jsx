"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'
import { useAuth } from 'ui/hooks/use-auth'
import { paths } from 'ui/paths';

function layout({ children }) {
  const auth = useAuth();
  const router = useRouter();
  return (
    <>
      <div className='w-full flex items-center justify-between p-4'>
        Hello {auth.user?.name} 👋
        <button
          onClick={async ()=>{
            await auth.signOut()
            router.push(paths.vendor.index)
          }}
        >
          Logout
        </button>
      </div>
      {children}
    </>
  )
}

export default withAuthGuard(layout, { role: 'vendor'});