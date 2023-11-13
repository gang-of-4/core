"use client"

import { useStores } from '@/hooks/useStores'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'
import { Layout as DashboardLayout } from 'ui/layouts/dashboard'
import { Button, SvgIcon } from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import NextLink from 'next/link';
import { getSections } from '@/components/dashboard/Sections'


function layout({ children }) {

  const router = useRouter();
  const params = useParams();

  const { stores } = useStores();
  
  const optionsList = stores?.map(store => store.name);

  // const [currentStore, setCurrentStore] = useState();

  function handleChange(storeName) {
    const store = stores.find(store => store.name === storeName);
    router.push(`/dashboard/stores/${store.id}`)
  }

  let currentStore = {};

  if (params?.id?.length > 0) {
    currentStore = stores?.find(store => store.id === params.id[0]);
  }


  const createStore = (
    <>
      <Button
        component={NextLink}
        href={'/'}
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
      >
        {children}
      </DashboardLayout>
    </>
  )
}

export default withAuthGuard(layout, { role: 'vendor' });