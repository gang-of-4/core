"use client"

import React from 'react'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'

function layout({ children }) {
  return (
    <>
      {children}
    </>
  )
}

export default withAuthGuard(layout, { role: 'vendor'});