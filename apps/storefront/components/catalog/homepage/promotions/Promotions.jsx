import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";

export default function Promotions() {
  return (
    <Card
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "primary.darkest"
            : "primary.lightest",
      }}
    >
      <CardHeader title="Promotions" />
      <CardContent>There are no promotions at the moment.</CardContent>
    </Card>
  );
}
