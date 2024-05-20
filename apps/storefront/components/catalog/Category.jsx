"use client";
import { Box, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import ItemsList from "./items/ItemsList";

function getHierarchy(category) {
  if (category.parent) {
    return [...getHierarchy(category.parent), category];
  }
  return [category];
}

export default function Category({ category, items }) {
  const hierarchy = getHierarchy(category);

  return (
    <>
      {category.banner?.url && (
        <Grid item xs={12}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%" }}
          >
            <Box
              component={"img"}
              src={category.banner?.url}
              alt={category.banner?.alt}
              sx={{
                height: 300,
                objectFit: "cover",
              }}
              borderRadius={2}
            />
          </Stack>
        </Grid>
      )}

      <Grid item xs={12}>
        <Stack spacing={4}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Stack spacing={2} direction={"row"} alignItems={"center"}>
              {category.logo?.url && (
                <Box
                  component={"img"}
                  src={category.logo?.url}
                  alt={category.logo?.alt}
                  sx={{
                    height: 100,
                    width: 100,
                    objectFit: "cover",
                  }}
                  borderRadius={2}
                />
              )}
              <Stack spacing={1}>
                <Typography variant="h4">{category.name}</Typography>
                {hierarchy?.length > 1 && (
                  <Stack direction={"row"} spacing={1}>
                    {hierarchy?.map((category, index) => (
                      <Link
                        key={category.id}
                        color={"text.secondary"}
                        component={NextLink}
                        href={`/catalog/categories/${category.id}`}
                        variant={"subtitle2"}
                      >
                        {category.name}
                        {index < hierarchy.length - 1 && " > "}
                      </Link>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
          <div>
            <Typography variant="body1">{category.description}</Typography>
          </div>
          <Divider />
          <Stack>
            <ItemsList items={items} />
          </Stack>
        </Stack>
      </Grid>
    </>
  );
}
