import Header from '@/components/Header';
import React from 'react'

function layout({ children }) {
  return (
    <>
      <Header>
        {children}
      </Header>
    </>
  )
}

export default layout;