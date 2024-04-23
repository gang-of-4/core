"use client";

import SearchBar from "@/components/catalog/SearchBar";
import { Box, Container, Grid } from "@mui/material";
import React from "react";

function layout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid
          container
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          {children}
        </Grid>
      </Container>
    </Box>
  );
}

export default layout;
