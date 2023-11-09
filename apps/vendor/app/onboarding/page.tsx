'use client'
import { Metadata } from 'next'
import React from 'react'
import {
    // Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    Link,
    Stack,
    TextField,
    Typography
} from '@mui/material';

export const metadata: Metadata = {
  title: 'Vendor Onboarding',
  description: 'Vendor Onboarding',
}

export default function page() {
  return (
    <>
      <Card elevation={16}>
            <CardHeader
              subheader={(
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                    Select the store type
                </Typography>
              )}
              sx={{ pb: 0 }}
              title="Vendor Onboarding"
            />
            <CardContent>
                <Button
                //   disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: 'white' }}
                >
                  <h1 className='text-primary'>Individual Store</h1>
                  <p className='text-secondary-300'>Individual stores are designed to meet personal offering products and services.</p>
                </Button>
                <Button
                //   disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: 'white' }}
                >
                  <h1 className='text-primary'>Business Store</h1>
                  <p className='text-secondary-300'>Business stores are designed to meet branding and professional requirements, and meet the needs of companies and institutions with specialized products and services.</p>
                </Button>
            </CardContent>
          </Card>
    </>
  )
}
