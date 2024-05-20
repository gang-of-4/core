"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import { blueGrey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { paths } from "ui/paths";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useStores } from "@/contexts/StoresContext";
import { config } from "ui/config";
import { capitalize, getIndefiniteArticle } from "@/utils/format-string";

const useStyles = makeStyles((theme) => ({
  card: {
    "&:hover": {
      boxShadow: 20,
      backgroundColor: blueGrey[50],
      "& $cardText": {
        color: blueGrey[900],
      },
    },
    transition: "all 0.3s ease",
  },
  cardText: {
    transition: "all 0.3s ease",
  },
}));

export default function Page() {
  const classes = useStyles();

  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const { createIndividualStore, stores } = useStores();
  const [hasIndividual, setHasIndividual] = useState(false);

  const storeName = config.store.name;
  const individualStoreName = config.store.individual.name;
  const businessStoreName = config.store.business.name;

  async function handleCreateIndividual() {
    try {
      await createIndividualStore(user.id);
      router.push(paths.vendor.dashboard.index);
    } catch (error) {
      console.error(error);
    }
  }

  function checkHasIndividual() {
    let has = false;
    stores?.forEach((store) => {
      if (store?.individualStore) {
        has = true;
      }
    });
    setHasIndividual(has);
  }

  useEffect(() => {
    if (isInitialized) {
      checkHasIndividual();
    }
  }, [stores, isInitialized]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Card elevation={16} sx={{ mt: { xs: 20, sm: 0 } }}>
            <CardHeader
              subheader={
                <Typography
                  color="text.secondary"
                  variant="body2"
                  fontSize={20}
                >
                  Select the {storeName} type
                </Typography>
              }
            />
            <CardContent
              sx={{
                mr: 4,
                ml: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "stretch" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Card
                sx={{
                  width: { xs: "90%", sm: "45%" },
                }}
                className={hasIndividual ? "" : classes.card}
                style={hasIndividual ? { backgroundColor: blueGrey[50] } : {}}
              >
                <CardContent>
                  {hasIndividual ? (
                    <Tooltip
                      title={`You already have ${getIndefiniteArticle(
                        individualStoreName
                      )} ${individualStoreName}`}
                    >
                      <span>
                        <button
                          id="individualStoreButton"
                          disabled
                          style={{ width: "100%" }}
                          data-test="individual-store-button"
                        >
                          <PersonIcon
                            sx={{ fontSize: 100, color: blueGrey[600] }}
                          />
                          <h1 className="text-primary text-xl">
                            {capitalize(individualStoreName)}
                          </h1>
                          <Typography
                            variant="body1"
                            sx={{
                              color: blueGrey[400],
                            }}
                            className={classes.cardText}
                          >
                            {config.store.individual.description}
                          </Typography>
                        </button>
                      </span>
                    </Tooltip>
                  ) : (
                    <button
                      onClick={handleCreateIndividual}
                      id="individualStoreButton"
                      style={{ width: "100%" }}
                      data-test="individual-store-button"
                    >
                      <PersonIcon
                        sx={{ fontSize: 100, color: blueGrey[600] }}
                      />
                      <h1 className="text-primary text-xl">
                        {capitalize(individualStoreName)}
                      </h1>
                      <Typography
                        variant="body1"
                        sx={{
                          color: blueGrey[400],
                        }}
                        className={classes.cardText}
                      >
                        {config.store.individual.description}
                      </Typography>
                    </button>
                  )}
                </CardContent>
              </Card>

              <Card
                sx={{ width: { xs: "90%", sm: "45%" } }}
                className={classes.card}
              >
                <CardContent>
                  <Link
                    href={paths.vendor.dashboard.stores.create}
                    data-test="business-store-button"
                  >
                    <button id="businessStoreButton" style={{ width: "100%" }}>
                      <StoreIcon sx={{ fontSize: 100, color: blueGrey[600] }} />
                      <h1 className="text-primary text-xl">
                        {capitalize(businessStoreName)}
                      </h1>
                      <Typography
                        variant="body1"
                        sx={{
                          color: blueGrey[400],
                        }}
                        className={classes.cardText}
                      >
                        {config.store.business.description}
                      </Typography>
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}
