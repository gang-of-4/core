"use client";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  SvgIcon,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { ArrowCircleRight } from "@untitled-ui/icons-react";
import Item from "../../items/Item";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export default function FeaturedItems({ items }) {
  const itemsName = config.catalog.item.plural;

  return (
    <>
      <Card
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "primary.darkest"
              : "primary.lightest",
        }}
      >
        <CardHeader title={`Featured ${capitalize(itemsName)}`} />
        <CardContent>
          {items && items?.length > 0 ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                flexWrap: "wrap",
              }}
            >
              {items.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  sx={{
                    width: 200,
                    marginRight: 2,
                    marginLeft: 0,
                    marginBottom: 2,
                    marginTop: 0,
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              No featured {itemsName} found.
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "end",
            px: 3,
            pt: 0,
            pb: 4,
          }}
        >
          <Button
            component={NextLink}
            href={`/catalog/items`}
            variant="contained"
          >
            Browse All {capitalize(itemsName)}
            <SvgIcon
              sx={{
                marginLeft: 1,
              }}
            >
              <ArrowCircleRight />
            </SvgIcon>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
