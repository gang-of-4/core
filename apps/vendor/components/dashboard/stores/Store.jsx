'use client'

import { useStores } from '@/hooks/useStores';
import { Box, Button, Container, Divider, Stack, SvgIcon, Tab, Tabs, Typography, Chip } from '@mui/material';
import { React, useCallback, useEffect, useState } from 'react';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import StoreLogo from './StoreLogo';
import StoreOverview from './StoreOverview';
import { Status } from '@/api/storeApi';



const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Items', value: 'items' },
  { label: 'Orders', value: 'orders' },
  { label: 'Settings', value: 'settings' }
];

const getStatusColor = (status) => {

  switch (status) {
    case Status.Approved:
      return { backgroundColor: 'success.main', color: 'white' };
    case Status.Pending:
      return { backgroundColor: 'neutral', color: 'black' };
    case Status.InReview:
      return { backgroundColor: 'primary.main', color: 'white' };
    case Status.Deleted:
      return { backgroundColor: 'error.main', color: 'white' };
    default:
      return { backgroundColor: 'neutral', color: 'black' };
  }
};


export default function Store({ params }) {

  const { stores } = useStores();
  const [currentStore, setCurrentStore] = useState();

  const [currentTab, setCurrentTab] = useState('overview');


  useEffect(() => {
    setCurrentStore(stores?.find(store => store.id === params.id[0]));
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
        <Container maxWidth="lg"

        >
          {currentStore?.logo && (
            <StoreLogo logo={currentStore.logo} />
          )}
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
              <Typography variant="h8">
                <Chip
                  label={currentStore?.status}
                  size="small"
                  sx={{...getStatusColor(currentStore?.status), px: 1}}
                />
              </Typography>
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
