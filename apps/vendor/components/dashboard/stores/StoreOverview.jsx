import { Card, CardHeader, Grid, Stack } from '@mui/material'
import React from 'react'
import { PropertyList } from 'ui/components/property-list'
import { PropertyListItem } from 'ui/components/property-list-item'
import DeleteStoreDialog from './DeleteStoreDialog'

export default function StoreOverview({ store }) {
    return (
        <>
            <Stack
                spacing={3}
                sx={{ mt: 3 }}
            >
                <Grid
                    xs={12}
                    lg={4}
                >
                    <Card>
                        <CardHeader title="Store Overview" />
                        <PropertyList>
                            <PropertyListItem label="Name" value={store?.name} />
                            {store?.vatNumber &&
                                <PropertyListItem label="VAT Number" value={store?.vatNumber} />
                            }
                            {store?.crNumber &&
                                <PropertyListItem label="CR Number" value={store?.crNumber} />
                            }
                        </PropertyList>
                    </Card>
                </Grid>
                <Grid
                    xs={12}
                    lg={8}
                >
                    <DeleteStoreDialog />
                </Grid>
            </Stack>
        </>
    )
}
