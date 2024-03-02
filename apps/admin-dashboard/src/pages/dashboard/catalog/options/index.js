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
  SvgIcon
} from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard';
import { BreadcrumbsSeparator } from '../../../../components/breadcrumbs-separator';
import { paths } from '../../../../paths';
import { OptionListTable } from '../../../../sections/dashboard/catalog/options/options-list-table';
import { useMounted } from '../../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { catalogApi } from '../../../../api/catalog';

const useOptions = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    options: [],
    optionsCount: 0
  });

  const getOptions = useCallback(async () => {
    try {
      const response = await catalogApi.getOptions();

      if (isMounted()) {
        setState({
          options: response.options,
          optionsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getOptions();
  }, []);

  return state;
};

const Page = () => {

  const { options, optionsCount } = useOptions();

  return (
    <>
      <Head>
        <title>
          Dashboard: Options | Admin
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
                  Options
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
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Options
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
                  href={paths.dashboard.catalog.options.groups.add}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            <Card>
              <Stack
                spacing={2}
                sx={{ p: 3 }}
              >
                <Typography
                  color="text.primary"
                  variant="h6"
                >
                  Option Groups
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Option groups are used to organize options into logical groups. You can create option groups and then add options to them.
                  <br />
                  For example, "Size" is an option group and "Small", "Medium", and "Large" are options.
                </Typography>
              </Stack>
              <OptionListTable
                options={options}
                optionsCount={optionsCount}
              />
            </Card>

          </Stack>
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
