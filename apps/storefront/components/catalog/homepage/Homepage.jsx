"use client";

import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import CategoriesList from "./categories/CategoriesList";
import FeaturedItems from "./featured-items/FeaturedItems";
import Promotions from "./promotions/Promotions";
import BecomeVendor from "./become-vendor/BecomeVendor";

export default function Homepage({ categories, featuredItems }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      <Grid item xs={12}>
        <CategoriesList categories={categories} />
      </Grid>
      {mdUp ? (
        <>
          <Grid item xs={8}>
            <FeaturedItems items={featuredItems} />
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              <Grid item xs={12}>
                <Promotions />
              </Grid>
              <Grid item xs={12}>
                <BecomeVendor />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <FeaturedItems items={featuredItems} />
          </Grid>
          <Grid item xs={12}>
            <Promotions />
          </Grid>
          <Grid item xs={12}>
            <BecomeVendor />
          </Grid>
        </>
      )}
    </>
  );
}
