import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material'
import React from 'react'
import { PropertyList } from 'ui/components/property-list'
import { PropertyListItem } from 'ui/components/property-list-item'
import DeleteStoreDialog from './DeleteStoreDialog'
import { capitalize } from '@/utils/format-string'
import { config } from 'ui/config'

export default function StoreOverview({ store }) {
    return (
        <>
            <Stack
                spacing={3}
                sx={{ mt: 3 }}
            >
                <Grid>
                    <Card>
                        <CardHeader title={`${capitalize(config.store.name)} Overview`} sx={{pb: '12px'}} />
                        <CardContent sx={{ pt: 0 }}>
                            <PropertyList>
                                <PropertyListItem label="Name" value={store?.name} />
                                {store?.vatNumber &&
                                    <PropertyListItem label="VAT Number" value={store?.vatNumber} />
                                }
                                {store?.crNumber &&
                                    <PropertyListItem label="CR Number" value={store?.crNumber} />
                                }
                                {store?.ownerNationalId &&
                                    <PropertyListItem label="Owner National ID" value={store?.ownerNationalId} />
                                }
                            </PropertyList>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <DeleteStoreDialog store={store} />
                </Grid>
            </Stack>
        </>
    )
}
