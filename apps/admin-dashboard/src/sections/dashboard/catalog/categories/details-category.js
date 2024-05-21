import { Link, Stack, Typography } from "@mui/material";
import { paths } from "../../../../paths";
import NextLink from "next/link";

export function CategoryDetails({ category }) {
  return (
    <>
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Typography color="textPrimary" variant="h6">
            Name
          </Typography>
          <Typography
            color="textPrimary"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {category?.name}
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <Typography color="textPrimary" variant="h6">
            Parent
          </Typography>
          {category?.parent ? (
            <Link
              color="textPrimary"
              component={NextLink}
              href={`${paths.dashboard.catalog.categories.index}/${category?.parent?.id}`}
            >
              {category?.parent?.name}
            </Link>
          ) : (
            <Typography color="textPrimary">None</Typography>
          )}
        </Stack>

        <Stack spacing={2}>
          <Typography color="textPrimary" variant="h6">
            Description
          </Typography>
          <Typography color="textPrimary">{category?.description}</Typography>
        </Stack>
      </Stack>
    </>
  );
}
