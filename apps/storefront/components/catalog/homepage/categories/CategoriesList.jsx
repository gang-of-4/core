"use client";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  SvgIcon,
  CardHeader,
  Button,
} from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";
import { ArrowCircleRight } from "@untitled-ui/icons-react";
import NextLink from "next/link";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

export default function CategoriesList({ categories }) {
  return (
    <>
      <Card>
        <CardHeader
          title={`Browse ${capitalize(config.catalog.category.plural)}`}
        />
        <CardContent>
          {categories.length === 0 ? (
            <Typography variant="subtitle1" align="center">
              No {config.catalog.category.plural} found.
            </Typography>
          ) : (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                flexWrap: "wrap",
              }}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  image={category.banner}
                />
              ))}
              <Button
                component={NextLink}
                href={`/catalog/items`}
                variant="outlined"
                sx={{
                  height: 200,
                  width: 150,
                  marginRight: 2,
                  marginLeft: 0,
                  marginBottom: 2,
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: "20px",
                }}
              >
                <SvgIcon
                  sx={{
                    fontSize: 75,
                  }}
                >
                  <ArrowCircleRight />
                </SvgIcon>
                <Typography gutterBottom variant="h6" align="center">
                  Browse All {capitalize(config.catalog.item.plural)}
                </Typography>
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}
