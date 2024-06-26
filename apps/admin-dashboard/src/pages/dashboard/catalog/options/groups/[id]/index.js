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
  CardContent,
  CardHeader,
} from "@mui/material";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { paths } from "../../../../../../paths";
import { OptionDetails } from "../../../../../../sections/dashboard/catalog/options/details-option";
import { useMounted } from "../../../../../../hooks/use-mounted";
import { Layout as DashboardLayout } from "../../../../../../layouts/dashboard";
import { BreadcrumbsSeparator } from "../../../../../../components/breadcrumbs-separator";
import { catalogApi } from "../../../../../../api/catalog";
import { DeleteOption } from "../../../../../../sections/dashboard/catalog/options/delete-option";
import { capitalize } from "../../../../../../utils/format-string";
import { config } from "ui/config";

const useOptions = (id) => {
  const isMounted = useMounted();
  const [state, setState] = useState({});

  const getOptionsGroup = useCallback(
    async (id) => {
      try {
        const response = await catalogApi.getOptionGroup(id);
        if (isMounted()) {
          setState(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted]
  );

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
        <title>Admin Dashboard | {capitalize(group?.title)}</title>
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
                <Typography variant="h4">
                  {group?.title} {capitalize(config.catalog.option.plural)}
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
                    {capitalize(config.catalog.name)}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.catalog.options.index}
                    variant="subtitle2"
                  >
                    {capitalize(config.catalog.option.plural)}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {capitalize(group?.title)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={`${paths.dashboard.catalog.options.groups.index}/${id}/edit`}
                  startIcon={
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  }
                  variant="contained"
                  color="inherit"
                >
                  Edit
                </Button>
              </Stack>
            </Stack>

            <Card elevation={16}>
              <CardContent>
                {group && <OptionDetails group={group} />}
              </CardContent>
            </Card>
            <Card elevation={16}>
              <CardHeader
                title={`Manage ${capitalize(config.catalog.optionGroup.name)}`}
              />
              <CardContent sx={{ pt: 1 }}>
                <DeleteOption group={group} />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
