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
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { useMounted } from "../../../hooks/use-mounted";
import { useCallback, useEffect, useState } from "react";
import { storesApi } from "../../../api/stores";
import { StoresListSearch } from "../../../sections/dashboard/stores/stores-list-search";
import { StoresListTable } from "../../../sections/dashboard/stores/stores-list-table";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { paths } from "../../../paths";
import { capitalize } from "../../../utils/format-string";
import { config } from "ui/config";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      status: [],
    },
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useStores = (search, hasUpdatedStores) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    stores: [],
    storesCount: 0,
  });

  const getStores = useCallback(async () => {
    try {
      const response = await storesApi.getStores(search);
      if (isMounted()) {
        setState({
          stores: response.data,
          storesCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
    getStores();
  }, [search, hasUpdatedStores]);

  return state;
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const [hasUpdatedStores, setHasUpdatedStores] = useState(false);
  const { stores, storesCount } = useStores(search, hasUpdatedStores);

  const storesName = capitalize(config.store.plural);

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  return (
    <>
      <Head>
        <title>Admin Dashboard | {storesName}</title>
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
                <Typography variant="h4">{storesName}</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {storesName}
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <StoresListSearch onFiltersChange={handleFiltersChange} />
              <StoresListTable
                stores={stores}
                storesCount={storesCount}
                hasUpdatedStores={hasUpdatedStores}
                setHasUpdatedStores={setHasUpdatedStores}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
