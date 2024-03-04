import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Card, CardContent, CardHeader, Container, Link, SvgIcon, Typography } from '@mui/material';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { useRouter } from 'next/router';
import { catalogApi } from '../../../../../../../api/catalog';
import { OptionEditForm } from '../../../../../../../sections/dashboard/catalog/options/edit-option';
import { Layout as DashboardLayout } from '../../../../../../../layouts/dashboard';
import { paths } from '../../../../../../../paths';
import { useEffect, useState } from 'react';

const Page = () => {

    const router = useRouter();

    const id = router.query.id;

    const [optionGroup, setOptionGroup] = useState(null);

    useEffect(() => {
        if (id) {
            fetchOptionGroup(id);
        }
    }, [id]);

    async function fetchOptionGroup(id) {
        const optionGroup = await catalogApi.getOptionGroup(id);
        setOptionGroup(optionGroup);
    }


    return (
        <>
            <Head>
                <title>
                    Edit Option Group | Admin
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
                    <Card elevation={16}>
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
                                href={paths.dashboard.catalog.options.index}
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
                                    Back to Options
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title={`Edit Option Group: ${optionGroup?.title}`}
                        />
                        <CardContent>
                            {
                                optionGroup && (

                                    <OptionEditForm group={optionGroup} />
                                )
                            }
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
