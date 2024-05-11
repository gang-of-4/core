import Head from "next/head";
import NextLink from "next/link";
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
} from "@mui/material";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import { paths } from "../../../../paths";
import { OptionListTable } from "../../../../sections/dashboard/catalog/options/options-list-table";
import { useMounted } from "../../../../hooks/use-mounted";
import { useCallback, useEffect, useState } from "react";
import { catalogApi } from "../../../../api/catalog";
import { capitalize } from "../../../../utils/format-string";
import { config } from "ui/config";

const useOptions = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    options: [],
    optionsCount: 0,
  });

  const getOptions = useCallback(async () => {
    try {
      const response = await catalogApi.getOptionGroups();
      if (isMounted()) {
        setState({
          options: response.options,
          optionsCount: response.count,
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
  const optionsName = capitalize(config.catalog.option.plural);

  return (
    <>
      <Head>
        <title>Admin Dashboard | {optionsName}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{optionsName}</Typography>
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
                    {capitalize(config.catalog.name)}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {optionsName}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.catalog.options.groups.add}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            <Card>
              <Stack spacing={2} sx={{ p: 3 }}>
                <Typography color="text.primary" variant="h6">
                  {capitalize(config.catalog.optionGroup.plural)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {capitalize(config.catalog.optionGroup.plural)} are used to
                  organize {config.catalog.option.plural} into logical groups.
                  You can create {config.catalog.optionGroup.plural} and then
                  add {config.catalog.option.plural} to them.
                  <br />
                  {config.catalog.optionGroup.example}
                </Typography>
              </Stack>
              <OptionListTable options={options} optionsCount={optionsCount} />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
