'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Tooltip,
    Typography,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import { blueGrey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { paths } from 'ui/paths';
import Link from 'next/link';
import { useStores } from '@/hooks/useStores';
import { useAuth } from 'ui/hooks/use-auth';
import { useRouter } from 'next/navigation';


const useStyles = makeStyles((theme) => ({
    card: {
        '&:hover': {
            boxShadow: 20,
            backgroundColor: blueGrey[50],
            '& $cardText': {
                color: blueGrey[900],
            }
        },
        transition: 'all 0.3s ease'
    },
    cardText: {
        transition: 'all 0.3s ease',
    }
}));


export default function page() {

    const classes = useStyles();

    const router = useRouter();
    const { user } = useAuth();
    const { createIndividualStore, stores } = useStores();
    const [hasIndividual, setHasIndividual] = useState(false);

    async function handleCreateIndividual() {
        try {
            await createIndividualStore(user.id);
            router.push(paths.vendor.dashboard.index);
        } catch (error) {
            console.error(error);
        }
    }

    function checkHasIndividual() {
        let has = false;
        stores?.forEach(store => {
            if (store?.individualStore) {
                has = true;
            }
        });
        setHasIndividual(has);
    }

    useEffect(() => {
        checkHasIndividual();
    }, [stores]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Container maxWidth="lg">
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
                        <CardContent sx={{ mr: 4, ml: 4, display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'stretch' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <Card
                                sx={{
                                    width: { xs: '90%', sm: '45%' }
                                }}
                                className={hasIndividual ? '' : classes.card}
                                style={hasIndividual ?
                                    { backgroundColor: blueGrey[50] }
                                    : {}
                                }
                            >
                                <CardContent>
                                    {
                                        hasIndividual ? (
                                            <Tooltip title="You already have an individual store">
                                                <span>
                                                    <button
                                                        id='individualStoreButton'
                                                        disabled
                                                        style={{ width: '100%' }}
                                                    >
                                                        <PersonIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                                                        <h1 className='text-primary text-xl'>Individual Store</h1>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: blueGrey[400]
                                                            }}
                                                            className={classes.cardText}
                                                        >
                                                            Individual stores are designed to meet personal offering of products and services.
                                                        </Typography>
                                                    </button>
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <button
                                                onClick={handleCreateIndividual}
                                                id='individualStoreButton'
                                                style={{ width: '100%' }}
                                            >
                                                <PersonIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                                                <h1 className='text-primary text-xl'>Individual Store</h1>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: blueGrey[400]
                                                    }}
                                                    className={classes.cardText}
                                                >
                                                    Individual stores are designed to meet personal offering of products and services.
                                                </Typography>
                                            </button>
                                        )
                                    }

                                </CardContent>
                            </Card>

                            <Card
                                sx={{ width: { xs: '90%', sm: '45%' } }}
                                className={classes.card}
                            >
                                <CardContent>
                                    <Link href={paths.vendor.dashboard.stores.create}>
                                        <button
                                            id='businessStoreButton'
                                            style={{ width: '100%' }}
                                        >
                                            <StoreIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                                            <h1 className='text-primary text-xl'>Business Store</h1>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: blueGrey[400]
                                                }}
                                                className={classes.cardText}
                                            >
                                                Business stores are designed to meet branding and professional requirements, as well as the needs of companies and institutions with specialized products and services.
                                            </Typography>
                                        </button>
                                    </Link>
                                </CardContent>
                            </Card>

                        </CardContent>
                    </Card>
                </Container>
            </div>
        </>
    )
}


