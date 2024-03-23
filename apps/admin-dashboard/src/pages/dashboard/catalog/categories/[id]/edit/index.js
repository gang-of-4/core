import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Card, CardContent, CardHeader, Container, Link, SvgIcon, Typography } from '@mui/material';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { useRouter } from 'next/router';
import { catalogApi } from '../../../../../../api/catalog';
import { Layout as DashboardLayout } from '../../../../../../layouts/dashboard';
import { paths } from '../../../../../../paths';
import { useEffect, useState } from 'react';
import { CategoryEditForm } from '../../../../../../sections/dashboard/catalog/categories/edit-category';

const Page = () => {

    const router = useRouter();

    const id = router.query.id;

    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (id) {
            fetchCategory(id);
        }
    }, [id]);

    async function fetchCategory(id) {
        const Category = await catalogApi.getCategory(id);
        setCategory(Category);
    }


    return (
        <>
            <Head>
                <title>
                    Edit Category | Admin
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
                                href={paths.dashboard.catalog.categories.index}
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
                                    Back to Categories
                                </Typography>
                            </Link>
                        </Box>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title={`Edit Category: `}
                        />
                        <CardContent>
                            {
                                category && (
                                    <CategoryEditForm category={category} />
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
