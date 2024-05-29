'use client'
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Link,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';
import { BreadcrumbsSeparator } from 'ui/components/breadcrumbs-separator';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import NextLink from 'next/link';
import { SeverityPill } from 'ui/components/severity-pill';
import ItemBasicInfo from './ItemBasicInfo';
import ItemOptions from './ItemOptions';
import ItemAttributes from './ItemAttributes';
import ItemVariants from './ItemVariants';
import { useEffect, useState } from 'react';
import fetchApi from '@/utils/fetch-api';
import ItemImages from './ItemImages';
import { capitalize } from '@/utils/format-string';
import { config } from 'ui/config';

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
            url: `/api/catalog/items/${itemId}`,
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
                        <Stack spacing={4}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                            >
                                <Stack spacing={1}>
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        spacing={2}
                                    >
                                        <Typography variant="h5">
                                            {item.name ? item.name : 'Not Named Yet'}
                                        </Typography>
                                        <SeverityPill color={getStatusColor(item?.status)}>
                                            {item?.status}
                                        </SeverityPill>
                                    </Stack>
                                    <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                                        <Link
                                            color="text.primary"
                                            component={NextLink}
                                            href='/dashboard'
                                            variant="subtitle2"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            color="text.primary"
                                            component={NextLink}
                                            href={`/dashboard/stores/${storeId}`}
                                            variant="subtitle2"
                                        >
                                            {capitalize(config.store.plural)}
                                        </Link>
                                        <Link
                                            color="text.primary"
                                            component={NextLink}
                                            href={`/dashboard/stores/${storeId}/items`}
                                            variant="subtitle2"
                                        >
                                            {capitalize(config.catalog.item.plural)}
                                        </Link>
                                        {item.name && (
                                            <Typography
                                                color="text.secondary"
                                                variant="subtitle2"
                                            >
                                                {item.name}
                                            </Typography>
                                        )}
                                    </Breadcrumbs>
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
                                        Edit {capitalize(config.catalog.item.name)}
                                    </Button>
                                </Stack>
                            </Stack>

                            <Stack
                                direction={'column'}
                            >

                                <ItemBasicInfo item={item} />

                                {item?.images?.length > 0 && (
                                    <ItemImages images={item.images} />
                                )}

                                {item?.groups?.length > 0 && (
                                    <ItemOptions item={item} />
                                )}

                                {item?.attributes?.length > 0 && (
                                    <ItemAttributes item={item} />
                                )}

                                {item?.variants?.length > 0 && (
                                    <ItemVariants item={item} />
                                )}
                            </Stack>
                        </Stack>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default ViewItem;
