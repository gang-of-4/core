import { Stack, Typography } from "@mui/material";

export function DetailsUser({ order }) {
  return (
    <>
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
        direction={"row"}
        marginBottom={1}
      >
        <Typography color="textPrimary" variant="h6">
          Customer Details
        </Typography>
      </Stack>
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
        direction={"row"}
        justifyContent={"space-around"}
      >
        <Stack>
          <Typography color="textPrimary" variant="h6">
            Name
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {order.user?.name}
          </Typography>
        </Stack>

        <Stack>
          <Typography color="textPrimary" variant="h6">
            Email
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {order.user?.email}
          </Typography>
        </Stack>

        <Stack>
          <Typography color="textPrimary" variant="h6">
            Phone Number
          </Typography>
          <Typography color="textPrimary" variant="h7">
            {order.user?.phone}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
