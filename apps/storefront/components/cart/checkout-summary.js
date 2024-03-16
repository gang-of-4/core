import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

const calculateAmounts = (cartItems) => {

  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);
  const total =  + subtotal;

  return {
    total
  };
};

export const CheckoutSummary = (props) => {
  const { onQuantityChange, cartItems = [], ...other } = props;
  const { total } = calculateAmounts(cartItems);

  const formattedTotal = numeral(total).format('$00.00');

  return (
    <Card
      variant="outlined"
      sx={{ p: 3 }}
      {...other}>
      <Typography variant="h6">
        Order Summary
      </Typography>
      <List sx={{ mt: 2 }}>
        {cartItems.map((cartItem) => {
          const price = numeral(cartItem.price).format('$00.00');

          return (
            <ListItem
              disableGutters
              key={cartItem.id}
            >
              <ListItemAvatar sx={{ pr: 2 }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    height: 100,
                    justifyContent: 'center',
                    overflow: 'hidden',
                    width: 100,
                    '& img': {
                      width: '100%',
                      height: 'auto'
                    }
                  }}
                >
                  <img
                    alt={cartItem.name}
                    src={cartItem.image}
                  />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Typography
                    sx={{ fontWeight: 'fontWeightBold' }}
                    variant="subtitle2"
                  >
                    {cartItem.name}
                  </Typography>
                )}
                secondary={(
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body1"
                  >
                    {price}
                  </Typography>
                )}
              />
              <Typography
                sx={{ fontWeight: 'fontWeightBold' }}
                variant="subtitle2"
              >
                {cartItem.quantity}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      {/* <OutlinedInput
        fullWidth
        placeholder="Discount Code"
        size="small"
        sx={{ mt: 2 }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2
        }}
      >
        <Button type="button">
          Apply Coupon
        </Button>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle2">
          Total
        </Typography>
        <Typography variant="subtitle2">
          {formattedTotal}
        </Typography>
      </Box>
    </Card>
  );
};

CheckoutSummary.propTypes = {
  // @ts-ignore
  cartItems: PropTypes.array
};
