'use client'

import React from 'react'
import { Box, Button, Card, CardContent, Container, Stack, SvgIcon, Typography } from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import NextLink from 'next/link';
import { paths } from 'ui/paths'
import { RefreshCw01 } from '@untitled-ui/icons-react';
import { useStores } from '@/hooks/useStores';
import { useAuth } from 'ui/hooks/use-auth';



export default function Home() {

  const { getStores } = useStores();
  const { user } = useAuth();

  function handleRefreshStores() {
    console.log('refreshing stores');
    getStores(user?.id);
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-around"
              spacing={4}
            >
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h4">
                      Welcome to the Vendor Dashboard
                    </Typography>
                    <Typography variant="body1">
                      Select a store from the left to manage it.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h4">
                      Manage Stores
                    </Typography>
                    <Stack spacing={1}>
                      
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

                      <Button
                        onClick={handleRefreshStores}
                        variant="outlined"
                        endIcon={(
                          <SvgIcon>
                            <RefreshCw01 />
                          </SvgIcon>
                        )}
                      >
                        Refresh Stores
                      </Button>

                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
