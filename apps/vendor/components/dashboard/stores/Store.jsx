'use client'

import { Box, Button, Container, Divider, Stack, SvgIcon, Tab, Tabs, Typography, Avatar, Tooltip } from '@mui/material';
import { React, useCallback, useState } from 'react';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import StoreOverview from './StoreOverview';
import { SeverityPill } from 'ui/components/severity-pill';
import NextLink from 'next/link';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import { useAuth } from '@/contexts/AuthContext';
import { formatStore } from '@/utils/format-store';

const Status = {
  PENDING: "PENDING",
  INREVIEW: "INREVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}

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

export default function Store({ unformattedStore }) {

  const { user } = useAuth();
  
  const store = formatStore({ store: unformattedStore, user });
  const [currentTab, setCurrentTab] = useState('overview');

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
          {store?.type === 'individual' ?
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
                src={store?.logo}
              >
                {store?.logo}
              </Avatar>
            </Box>
            : (
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
                >
                  <SvgIcon>
                    <Image01Icon />
                  </SvgIcon>
                </Avatar>
              </Box>
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
                {store?.name}
              </Typography>
              <SeverityPill color={getStatusColor(store?.status)}>
                {store?.status}
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
              {
                store.type === 'individual' ?
                  (
                    <Tooltip title="Individual stores cannot be edited">
                      <span>

                        <Button
                          size="small"
                          startIcon={(
                            <SvgIcon>
                              <Edit02Icon />
                            </SvgIcon>
                          )}
                          variant="contained"
                          disabled
                        >
                          Edit Store
                        </Button>
                      </span>
                    </Tooltip>
                  ) : (

                    <Button
                      size="small"
                      startIcon={(
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      style={{ backgroundColor: '#2970FF' }}
                      component={NextLink}
                      href={`${store?.id}/edit`}
                    >
                      Edit Store
                    </Button>
                  )
              }
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
            <StoreOverview store={store} />
          )}
        </Container>
      </Box>
    </>
  )
}
