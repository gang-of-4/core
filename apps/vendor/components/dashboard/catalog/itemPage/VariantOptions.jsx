"use client"
import { Stack, Typography } from "@mui/material";


export default function VariantOptions({ options }) {

  return (
    <Stack spacing={1}>
      {options?.map((option, index) => (
        <Typography key={index} variant="body1">
          {option.label}
        </Typography>
      ))}
    </Stack>
  )
}
