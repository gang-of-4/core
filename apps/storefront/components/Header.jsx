"use client"

import React from 'react'
import { Layout as MainLayout } from 'ui/layouts/marketing'
import { Box } from '@mui/material'
import { PagesPopover } from 'ui/layouts/marketing/pages-popover';
import { CartButton } from './CartButton';
import {Footer} from 'ui/layouts/marketing/footer';


export default function Header({ children, categories }) {


  const sections = [
    {
      items: categories.map(category => {
        return {
          title: category.name,
          path: `catalog/categories/${category.slug}`,
        }
      })
    },
  ];


  const sideItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Categories',
      children: [
        {
          items: categories.map(category => {
            return {
              title: category.name,
              path: `catalog/category/${category.slug}`
            }
          })
        }
      ]
    },
    {
      title: 'Stores',
      path: '/stores'
    }
  ];

  const topItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Categories',
      children: (<PagesPopover sections={sections} />)
    },
    {
      title: 'Stores',
      path: '/stores'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Contact',
      path: '/contact'
    }
  ];



  return (
    <>
      <MainLayout
        sideItems={sideItems}
        topItems={topItems}
        // @TODO: add currency selectors
        topButtons={<CartButton />}
      >
        <Box
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundImage: 'url("/vendor/assets/gradient-bg.svg")',
            pt: '120px',
            mb: '120px',
            minHeight: '100vh'
          }}
        >
          {children}
        </Box>
          <Footer />
      </MainLayout>
    </>
  )
}
