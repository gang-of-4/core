import {
  CardContent,
  Divider,
  Grid,
  Typography,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";

export function DetailsItem({ item }) {
  return (
    <>
      <TableRow>
        <TableCell
          colSpan={7}
          sx={{
            p: 0,
            position: "relative",
            "&:after": {
              position: "absolute",
              content: '" "',
              top: 0,
              left: 0,
              backgroundColor: "primary.main",
              width: 3,
              height: "calc(100% + 1px)",
            },
          }}
        >
          <CardContent>
            <Grid item md={6} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography color="textPrimary" variant="h6">
                    SKU
                  </Typography>
                  <Typography color="textPrimary" variant="h7">
                    {item.sku}
                  </Typography>
                </Grid>
                {item.isVariant && (
                  <Grid item md={6} xs={12}>
                    <Typography color="textPrimary" variant="h6">
                      Options
                    </Typography>
                    <Typography color="textPrimary" variant="h7">
                      {item?.groups
                        ?.map(
                          (group) =>
                            `${group?.title}: 
                                      ${group?.values
                                        ?.map((option) => option?.label)
                                        .join(", ")}`
                        )
                        .join("  |  ")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </TableCell>
      </TableRow>
    </>
  );
}
