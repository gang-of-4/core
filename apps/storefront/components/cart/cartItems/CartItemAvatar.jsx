"use client";
import { Box, ListItemAvatar, Stack, SvgIcon } from "@mui/material";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import React from "react";

export default function CartItemAvatar({ url, alt }) {
  return (
    <ListItemAvatar sx={{ pr: 2 }}>
      {url ? (
        <Box
          sx={{
            borderRadius: 2,
            objectFit: "cover",
          }}
          component={"img"}
          width={100}
          height={100}
          src={url}
          alt={alt}
        />
      ) : (
        <Stack
          width={100}
          height={100}
          sx={{
            bgcolor: "grey.100",
            borderRadius: 2,
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <SvgIcon>
            <Image01Icon />
          </SvgIcon>
        </Stack>
      )}
    </ListItemAvatar>
  );
}
