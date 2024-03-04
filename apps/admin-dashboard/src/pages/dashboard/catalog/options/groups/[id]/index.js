import Head from 'next/head';
import NextLink from 'next/link';
import {
    Box,
    Container,
    Stack,
    Typography,
    Breadcrumbs,
    Link,
    Card,
    Button,
    SvgIcon,
    CardContent,
    CardHeader
} from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { paths } from '../../../../../../paths';
import { OptionDetails } from '../../../../../../sections/dashboard/catalog/options/details-option';
import { useMounted } from '../../../../../../hooks/use-mounted';
import { Layout as DashboardLayout } from '../../../../../../layouts/dashboard';
import { BreadcrumbsSeparator } from '../../../../../../components/breadcrumbs-separator';
import { catalogApi } from '../../../../../../api/catalog';
import { DeleteOptionDialog } from '../../../../../../sections/dashboard/catalog/options/delete-option-dialog';

const useOptions = (id) => {
    const isMounted = useMounted();
    const [state, setState] = useState({});

    const getOptionsGroup = useCallback(async (id) => {
        try {
            const response = await catalogApi.getOptionGroup(id);
            if (isMounted()) {
                setState(response);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMounted]);

    useEffect(() => {
        getOptionsGroup(id);
    }, [id]);

    return state;
};

const Page = () => {

    const router = useRouter();
    const id = router.query.id;
    const group = useOptions(id);

    return (
        <>
            <Head>
                <title>
                    {group?.title} Options | Admin
                </title>
            </Head>
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
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    {group?.title} Options
                                </Typography>
                                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                                    <Link
                                        color="text.primary"
                                        component={NextLink}
                                        href={paths.dashboard.index}
                                        variant="subtitle2"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        color="text.primary"
                                        component={NextLink}
                                        href={paths.dashboard.catalog.items.index}
                                        variant="subtitle2"
                                    >
                                        Catalog
                                    </Link>
                                    <Link
                                        color="text.primary"
                                        component={NextLink}
                                        href={paths.dashboard.catalog.options.index}
                                        variant="subtitle2"
                                    >
                                        Options
                                    </Link>
                                    <Typography
                                        color="text.secondary"
                                        variant="subtitle2"
                                    >
                                        {group?.title}
                                    </Typography>
                                </Breadcrumbs>
                            </Stack>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={3}
                            >
                                <Button
                                    component={NextLink}
                                    href={`${paths.dashboard.catalog.options.groups.index}/${id}/edit`}
                                    startIcon={(
                                        <SvgIcon>
                                            <Edit02Icon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    color='inherit'
                                >
                                    Edit
                                </Button>
                            </Stack>
                        </Stack>

                        <Card elevation={16}>
                            <CardContent>
                                {
                                    group && (
                                        <OptionDetails group={group} />
                                    )
                                }
                            </CardContent>
                        </Card>
                        <Card elevation={16}>
                            <CardHeader title='Manage Group' />
                            <CardContent sx={{ pt: 1 }}>
                                <DeleteOptionDialog group={group}/>
                            </CardContent>
                        </Card>

                    </Stack>
                </Container>
            </Box >
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
