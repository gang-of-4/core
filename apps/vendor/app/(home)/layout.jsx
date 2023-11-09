import Header from '@/components/Header';
import React from 'react'

function layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default layout;