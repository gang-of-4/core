import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatPrice } from "@/utils/format-price";
import CartItemAvatar from "../cartItems/CartItemAvatar";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

export const CheckoutSummary = (props) => {
  const { cart, ...other } = props;

  return (
    <Card variant="outlined" sx={{ p: 3 }} {...other}>
      <Typography variant="h6">
        {capitalize(config.order.name)} Summary
      </Typography>
      <List sx={{ mt: 2 }}>
        {cart?.cartItems?.map((cartItem) => (
          <ListItem disableGutters key={cartItem.id}>
            {cartItem.isVariant ? (
              <>
                <CartItemAvatar
                  url={cartItem.variant?.parent?.images?.[0]?.url}
                  alt={cartItem.variant?.parent?.name}
                />
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontWeight: "fontWeightBold" }}
                      variant="subtitle1"
                    >
                      {cartItem?.variant?.parent?.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                      variant="body2"
                    >
                      {formatPrice({ price: cartItem?.variant?.price })}
                    </Typography>
                  }
                />
              </>
            ) : (
              <>
                <CartItemAvatar
                  url={cartItem?.item?.images?.[0]?.url}
                  alt={cartItem?.item?.name}
                />
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontWeight: "fontWeightBold" }}
                      variant="subtitle2"
                    >
                      {cartItem?.item?.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                      variant="body1"
                    >
                      {formatPrice({ price: cartItem?.item?.price })}
                    </Typography>
                  }
                />
              </>
            )}
            <Typography
              sx={{ fontWeight: "fontWeightBold" }}
              variant="subtitle2"
            >
              {cartItem?.quantity}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      ></Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2">Subtotal</Typography>
        <Typography variant="subtitle2">
          {formatPrice({ price: cart.subtotal })}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2">Total</Typography>
        <Typography variant="subtitle2">
          {formatPrice({ price: cart.total })}
        </Typography>
      </Box>
    </Card>
  );
};
