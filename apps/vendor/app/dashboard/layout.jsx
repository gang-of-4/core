"use client"

import { useStores } from '@/hooks/useStores'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'
import { Layout as DashboardLayout } from 'ui/layouts/dashboard'
import { Button, SvgIcon } from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import NextLink from 'next/link';
import { getSections } from '@/components/dashboard/Sections'
import { paths } from 'ui/paths'


function layout({ children }) {

  const router = useRouter();
  const params = useParams();

  const { stores } = useStores();
  
  const optionsList = stores?.map(store => store.name);


  function handleChange(storeName) {
    const store = stores.find(store => store.name === storeName);
    router.push(`${paths.vendor.dashboard.stores.index}/${store.id}`)
  }

  let currentStore = {};

  if (params?.id?.length > 0) {
    currentStore = stores?.find(store => store.id === params.id[0]);
  }

  useEffect(() => {
    console.log('stores', stores)
    if (stores?.length === 0) {
      console.log('No stores found for this vendor, redirecting to onboarding')

      // router.replace(paths.vendor.onboarding.index)

      // the redirect is done this way instead to force a hard navigation
      window.location.href = `/vendor${paths.vendor.onboarding.index}`;
    }
  }, [stores])


  const createStore = (
    <>
      <Button
        component={NextLink}
        href={`/${paths.vendor.dashboard.stores.create}`}
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
      <DashboardLayout
        options={options}
        sections={sections}
        bgUrl={'/vendor/assets/gradient-bg.svg'}
      >
        {children}
      </DashboardLayout>
    </>
  )
}

export default withAuthGuard(layout, { role: 'vendor' });