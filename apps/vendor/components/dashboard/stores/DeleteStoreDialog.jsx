import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

export default function DeleteStoreDialog() {
    return (
        <>
            <Card>
                <CardHeader title="Store Management" />
                <CardContent sx={{ pt: 0 }}>
                    <Button
                        color="error"
                        variant="outlined"
                    >
                        Delete Store
                    </Button>
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            Remove this store,
                            please be aware that what has been deleted can never be brought
                            back.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}
