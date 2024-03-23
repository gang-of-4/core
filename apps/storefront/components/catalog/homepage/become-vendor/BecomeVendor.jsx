'use client' 
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function BecomeVendor() {
    return (
        <Card
            sx={{
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'primary.darkest'
                    : 'primary.lightest',
            }}
        >
            <CardHeader title="Become a vendor" />
            <CardContent>
            <Typography variant="body1">
                Want to gain profit by selling cars on our platform?
                </Typography>
                <Typography 
                 variant="body1"
                    sx={{
                        '& a': {
                            color: 'primary.main'
                        },
                        '& a:hover': {
                            'textDecoration': 'underline'
                        }
                    }}
                >
                Start by &nbsp;
                <Link 
                    href="vendor/auth/signup"
                    target='_blank'
                >
                    creating a vendor account
                </Link>
                .
                </Typography>
            </CardContent>
        </Card>
    )
}
