"use client"

import React from 'react'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'
import { useAuth } from 'ui/hooks/use-auth'

function layout() {
    const { user } = useAuth();
  return (
    <div className='w-full flex items-center justify-center p-4'>
        Hello {user.name} 👋 
    </div>
  )
}

export default withAuthGuard(layout);