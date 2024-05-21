"use client";
import { useState, useEffect } from "react";
import { formatStore } from "@/utils/format-store";
import { useAuth } from "@/contexts/AuthContext";
import EditStoreForm from "./EditStoreForm";
import AtomicSpinner from "atomic-spinner";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import NextLink from "next/link";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export default function EditStore({ unformattedStore }) {
  const { user } = useAuth();
  const [store, setStore] = useState(null);

  useEffect(() => {
    format(unformattedStore);
  }, [unformattedStore]);

  async function format(store) {
    const formattedStore = await formatStore({
      store,
      user,
    });
    setStore(formattedStore);
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card elevation={16}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-start",
                px: 2,
                pt: 4,
              }}
            >
              <Link
                color="primary"
                component={NextLink}
                href={`/dashboard/stores/${unformattedStore?.id}`}
                sx={{
                  alignItems: "center",
                  display: "inline-flex",
                }}
                underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">
                  Back to {capitalize(config.store.name)}
                </Typography>
              </Link>
            </Box>
            <CardHeader
              sx={{ pb: 0 }}
              title={`Edit ${capitalize(config.store.business.name)}`}
            />

            <CardContent>
              {store ? (
                <EditStoreForm store={store} />
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "100%" }}
                  spacing={2}
                >
                  <AtomicSpinner
                    atomSize={200}
                    electronColorPalette={["#C90000", "#F75C5C", "#FF8787"]}
                  />
                  <Typography variant="h6" align="center">
                    Loading...
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
