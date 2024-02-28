"use client"


import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Layout as DashboardLayout } from 'ui/layouts/dashboard'
import { Button, SvgIcon } from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import NextLink from 'next/link';
import { getSections } from '@/components/dashboard/Sections'
import { paths } from 'ui/paths'
import AuthGuard from '@/components/auth/auth-guard';
import { useAuth } from '@/contexts/AuthContext'
import { useStores } from '@/contexts/StoresContext';


export default function Layout({ children }) {

  const router = useRouter();
  const params = useParams();

  const { stores, isInitialized: isStoresInitialized } = useStores();
  const auth = useAuth();
  const user = auth?.user;


  async function checkStores() {

    console.log('Checking stores for vendor', stores)

    if (stores?.length === 0) {
      console.log('No stores found for this vendor, redirecting to onboarding')
      router.replace(paths.vendor.onboarding.index)
    }
  }

  const optionsList = stores?.map(store => {
    if (store?.individualStore) {
      return {
        id: store?.id,
        text: `${user?.firstName} ${user?.lastName}'s Store`
      }
    } else if (store?.businessStore) {
      return {
        id: store?.id,
        text: store?.businessStore?.name
      }
    }
    return {
      id: '',
      text: 'N/A'
    }
  });


  function handleChange(storeId) {
    router.push(`${paths.vendor.dashboard.stores.index}/${storeId}`)
  }

  let currentStore = {};

  if (params?.id?.length > 0) {
    currentStore = stores?.find(store => store.id === params.id[0]);
  }

  useEffect(() => {
    if (auth.isInitialized && isStoresInitialized) {
      checkStores();
    }
  }, [stores, auth.isInitialized, isStoresInitialized])

  const createStore = (
    <>
      <Button
        component={NextLink}
        href={`${paths.vendor.onboarding.index}`}
        variant="contained"
        endIcon={(
          <SvgIcon>
            <PlusIcon />
          </SvgIcon>
        )}
      >
        Create a Store
      </Button>
    </>
  );

  const options = {
    title: currentStore?.name || 'Select a Store',
    list: optionsList,
    handleChange: handleChange,
    firstOption: createStore
  }

  const sections = getSections();

  return (
    <>
      <AuthGuard role={'vendor'}>
        <DashboardLayout
          auth={auth}
          options={options}
          sections={sections}
          bgUrl={'/vendor/assets/gradient-bg.svg'}
        >
          {children}
        </DashboardLayout>
      </AuthGuard>
    </>
  )
}