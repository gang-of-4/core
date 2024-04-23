import {
  Box,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

// These will be returned from the Payment Service API in the future
const paymentMethods = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "Visa Credit",
    value: "visa",
  },
  {
    label: "PayPal",
    value: "paypal",
  },
];

export const CheckoutAddress = (props) => {
  const { address, onChange, ...other } = props;

  return (
    <Stack {...other} spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              1
            </Typography>
          </Box>
          <Typography variant="h6">Address</Typography>
        </Stack>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={onChange}
                value={address.country}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={onChange}
                value={address.city}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                onChange={onChange}
                value={address.street}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                onChange={onChange}
                value={address.postalCode}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                onChange={onChange}
                value={address.notes}
                multiline
              />
            </Grid>
          </Grid>
        </div>
      </Stack>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              2
            </Typography>
          </Box>
          <Typography variant="h6">Payment Method</Typography>
        </Stack>
        <div>
          <div>
            <RadioGroup
              name="paymentMethod"
              defaultValue={"Cash"}
              sx={{ flexDirection: "column" }}
            >
              {paymentMethods.map((paymentMethod) => (
                <FormControlLabel
                  control={<Radio />}
                  key={paymentMethod.value}
                  label={
                    <Typography
                      variant="body1"
                      style={{
                        opacity: paymentMethod.value === "Cash" ? 1 : 0.5,
                      }}
                    >
                      {paymentMethod.label}
                    </Typography>
                  }
                  value={paymentMethod.value}
                  disabled={paymentMethod.value !== "Cash"}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};
