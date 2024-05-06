import {
  Box,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  FormControl,
} from "@mui/material";

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
                label="State"
                name="state"
                onChange={onChange}
                value={address.state}
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
        <Box width={"fit-content"}>
          <RadioGroup name="paymentMethod">
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                defaultValue={"cash"}
                sx={{
                  paddingLeft: 4,
                }}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <Tooltip title="To be added in future releases" arrow>
                  <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label="Visa Credit Card"
                    disabled
                  />
                </Tooltip>
                <Tooltip title="To be added in future releases" arrow>
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                    disabled
                  />
                </Tooltip>
              </RadioGroup>
            </FormControl>
          </RadioGroup>
        </Box>
      </Stack>
    </Stack>
  );
};
