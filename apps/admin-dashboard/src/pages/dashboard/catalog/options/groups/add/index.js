import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Card, CardContent, CardHeader, Container, Link, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../../../../../../layouts/dashboard';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { paths } from '../../../../../../paths';
import { OptionCreateForm } from '../../../../../../sections/dashboard/catalog/options/create-option';

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Create Option Group | Admin
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
                            title="Add New Option Group"
                        />
                        <CardContent>
                            <OptionCreateForm />
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
