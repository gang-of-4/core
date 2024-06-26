import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ name, image, id }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 150,
        marginRight: 2,
        marginLeft: 0,
        marginBottom: 2,
        marginTop: 0,
      }}
    >
      <CardActionArea>
        <Link href={`catalog/categories/${id}`}>
          <CardContent
            sx={{
              background: image
                ? `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url(${image?.url})`
                : "linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) )",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 200,
              width: 150,
              display: "flex",
              alignItems: "flex-end",
              color: "white",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
