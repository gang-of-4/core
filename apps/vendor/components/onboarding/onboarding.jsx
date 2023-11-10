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
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import { blueGrey } from '@mui/material/colors';


export default function page() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card elevation={16} sx={{ mt: { xs: 20, sm: 0 } }}>
                    <CardHeader
                        subheader={(
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                fontSize={20}
                            >
                                Select the store type
                            </Typography>
                        )}
                    />
                    <CardContent sx={{ mr: 4, ml: 4, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>

                        <Card sx={{ width: { xs: '90%', sm: '45%' } }}>
                            <CardContent>
                                <button
                                    //   disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    sx={{
                                        mt: 1,
                                    }}
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <PersonIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                                    <h1 className='text-primary text-xl'>Individual Store</h1>
                                    <p className='text-secondary-400'>Individual stores are designed to meet personal offering products and services.</p>
                                </button>
                            </CardContent>
                        </Card>

                        <Card sx={{ width: { xs: '90%', sm: '45%' } }}>
                            <CardContent>
                                <Link href="/vendor/stores/create" passHref>
                                    <a>
                                        <button
                                            //   disabled={formik.isSubmitting}
                                            fullWidth
                                            size="large"
                                            sx={{
                                                mt: 2,
                                            }}
                                            type="submit"
                                            variant="contained"
                                            style={{ backgroundColor: 'white' }}
                                        >
                                            <StoreIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                                            <h1 className='text-primary text-xl'>Business Store</h1>
                                            <p className='text-secondary-400'>Business stores are designed to meet branding and professional requirements, and meet the needs of companies and institutions with specialized products and services.</p>
                                        </button>
                                    </a>
                                </Link>
                            </CardContent>
                        </Card>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}


