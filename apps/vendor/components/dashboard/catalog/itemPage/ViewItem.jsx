'use client'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Link,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import NextLink from 'next/link';
import { SeverityPill } from 'ui/components/severity-pill';
import ItemBasicInfo from './ItemBasicInfo';
import ItemOptions from './ItemOptions';
import ItemAttributes from './ItemAttributes';
import ItemVariants from './ItemVariants';
import { useEffect, useState } from 'react';
import fetchApi from '@/utils/fetch-api';

const Status = {
    PENDING: "PENDING",
    INREVIEW: "INREVIEW",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    DRAFT: "DRAFT",
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
        case Status.DRAFT:
            return 'info';
        default:
            return 'info';
    }
};

const ViewItem = ({ storeId, itemId }) => {

    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItem(itemId);
    }, [itemId]);

    async function fetchItem(itemId) {
        const { data, error } = await fetchApi({
            url: `/vendor/api/catalog/items/${itemId}`,
            options: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });

        if (error) {
            console.error(error);
            return;
        }

        setItem(data);
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
                <Container maxWidth="lg">
                    {item && (
                        <Card
                            elevation={16}
                            sx={{
                                pb: 0
                            }}
                        >
                            <Box sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                px: 2,
                                pt: 4
                            }}>
                                <Link
                                    color="primary"
                                    component={NextLink}
                                    href={`/dashboard/stores/${storeId}/items`}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'inline-flex'
                                    }}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <ArrowLeftIcon />
                                    </SvgIcon>
                                    <Typography variant="subtitle2">
                                        Back to Cars
                                    </Typography>
                                </Link>
                            </Box>

                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                sx={{ mt: 2, px: 6 }}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Typography variant="h6">
                                        View Item: {item.name ? item.name : 'Not Named Yet'}
                                    </Typography>
                                    <SeverityPill color={getStatusColor(item?.status)}>
                                        {item?.status}
                                    </SeverityPill>
                                </Stack>
                                <Box sx={{ flexGrow: 1 }} />
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        startIcon={(
                                            <SvgIcon>
                                                <Edit02Icon />
                                            </SvgIcon>
                                        )}
                                        size='small'
                                        variant="outlined"
                                        component={NextLink}
                                        href={`/dashboard/stores/${storeId}/items/${item.id}/edit`}
                                    >
                                        Edit Car
                                    </Button>
                                </Stack>
                            </Stack>

                            <CardContent
                                sx={{
                                    pt: 2,
                                    pb: 0
                                }}
                            >

                                <ItemBasicInfo item={item} />

                                {item?.groups?.length > 0 && (
                                    <ItemOptions item={item} />
                                )}

                                {item?.attributes?.length > 0 && (
                                    <ItemAttributes item={item} />
                                )}

                                {/* @TODO: item images similar to storefront */}

                                {item?.variants?.length > 0 && (
                                    <ItemVariants item={item} />
                                )}
                            </CardContent>
                        </Card>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default ViewItem;
