'use client'

import { Box, Button, Container, Stack, SvgIcon, Typography, Avatar, Tooltip } from '@mui/material';
import { React } from 'react';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
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
              <SeverityPill color={getStatusColor(store?.status)} data-test="store-status-pill">
                {store?.status}
              </SeverityPill>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
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
                          data-test="edit-store-button"
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
                      data-test="edit-store-button"
                    >
                      Edit Store
                    </Button>
                  )
              }
            </Stack>
          </Stack>
          <StoreOverview store={store} />
        </Container>
      </Box>
    </>
  )
}
