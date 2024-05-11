'use client'

import React from 'react'
import { Box, Button, Card, CardContent, Container, Stack, SvgIcon, Typography } from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import NextLink from 'next/link';
import { paths } from 'ui/paths'
import { config } from 'ui/config';
import { capitalize, getIndefiniteArticle } from '@/utils/format-string';


export default function Home() {

  const storeName = config.store.name;

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
                      Select {getIndefiniteArticle(storeName)} {storeName} from the left to manage it.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h4">
                      Manage {capitalize(config.store.plural)}
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
                        Create {getIndefiniteArticle(storeName)} {capitalize(storeName)}
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
