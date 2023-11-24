'use client'

import { useStores } from '@/hooks/useStores';
import { Box, Button, Container, Divider, Stack, SvgIcon, Tab, Tabs, Typography, Chip, Avatar } from '@mui/material';
import { React, useCallback, useEffect, useState } from 'react';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import StoreLogo from './StoreLogo';
import StoreOverview from './StoreOverview';
import { Status } from '@/api/storeApi';
import { getInitials } from 'ui/utils/get-initials';
import { useAuth } from 'ui/hooks/use-auth';
import { SeverityPill } from 'ui/components/severity-pill';


const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Items', value: 'items' },
  { label: 'Orders', value: 'orders' },
  { label: 'Settings', value: 'settings' }
];

const getStatusColor = (status) => {
  switch (status) {
      case Status.APPROVED:
          return 'success';
      case Status.PENDING:
          return 'warning';
      case Status.INREVIEW:
          return 'info';
      case Status.REJECTED:
          return 'error';
      default:
          return 'info';
  }
};

function formatStore(store, vendor) {
  if (store?.individualStore) {
    return {
      id: store?.id,
      vendorId: vendor?.id,
      name: `${vendor?.firstName} ${vendor?.lastName}'s Store`,
      status: store?.status,
      logo: vendor?.avatar || getInitials(`${vendor?.firstName} ${vendor?.lastName}`),
      type: 'individual'
    }
  } else if (store?.businessStore) {
    return {
      id: store?.id,
      vendorId: vendor?.id,
      name: store?.businessStore?.name,
      status: store?.status,
      vatNumber: store?.businessStore?.vat_number,
      crNumber: store?.businessStore?.cr_number,
      ownerNationalId: store?.businessStore?.owner_national_id,
      logo: store?.businessStore?.logo,
      type: 'business'
    }
  } else {
    return { ...store, type: 'unknown' };
  }
}

export default function Store({ params }) {

  const { stores } = useStores();
  const [currentStore, setCurrentStore] = useState();
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState('overview');

  function changeCurrentStore(store) {
    const formattedStore = formatStore(store, user);
    setCurrentStore(formattedStore);
  }


  useEffect(() => {
    const store = stores?.find(store => store.id === params.id);
    changeCurrentStore(store);
    console.log(store)
  }, [params])

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          {currentStore?.type === 'individual' ?
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Avatar
                sx={{
                  height: 128,
                  width: 128,
                  fontSize: 64,
                }}
                src={currentStore?.logo}
              >
                {currentStore?.logo}
              </Avatar>
            </Box>
            : (currentStore?.logo !== 'default') && (
              <StoreLogo logo={currentStore?.logo} />
            )
          }
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 5 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Typography variant="h5">
                {currentStore?.name}
              </Typography>
              <SeverityPill color={getStatusColor(currentStore?.status)}>
                {currentStore?.status}
              </SeverityPill>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Button
                size="small"
                startIcon={(
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="outlined"
              >
                Add Items
              </Button>
              <Button
                size="small"
                startIcon={(
                  <SvgIcon>
                    <Edit02Icon />
                  </SvgIcon>
                )}
                variant="contained"
                style={{ backgroundColor: '#2970FF' }}
              >
                Edit Store
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider />
          </Stack>
          {currentTab === 'overview' && (
            <StoreOverview store={currentStore} />
          )}
        </Container>
      </Box>
    </>
  )
}
