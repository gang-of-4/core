import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';



export const CheckoutAddress = (props) => {
  const { address, onChange, ...other } = props;

  return (
    <Stack {...other}
           spacing={6}
    >
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              1
            </Typography>
          </Box>
          <Typography variant="h6">
            Billing Address
          </Typography>
        </Stack>
        <div>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={onChange}
                value={address.country}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={onChange}
                value={address.city}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Street"
                name="street"
                onChange={onChange}
                value={address.street}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Postal Code"
                name="zipostalCodep"
                onChange={onChange}
                value={address.postalCode}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                onChange={onChange}
                value={address.description}
                multiline
              />
            </Grid>
          </Grid>
        </div>
      </Stack>
      
    
    </Stack>
  );
};

// Checkoutaddress.propTypes = {
//   // @ts-ignore
//   address: PropTypes.object,
//   onChange: PropTypes.func
// };
