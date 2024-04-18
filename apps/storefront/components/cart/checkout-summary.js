import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { formatPrice } from "@/utils/format-price";

export const CheckoutSummary = (props) => {
  const { cart, ...other } = props;

  return (
    <Card variant="outlined" sx={{ p: 3 }} {...other}>
      <Typography variant="h6">Order Summary</Typography>
      <List sx={{ mt: 2 }}>
        {cart?.cartItems?.map((cartItem) => {
          const price = formatPrice({ price: cartItem?.item?.price });

          return (
            <ListItem disableGutters key={cartItem.id}>
              <ListItemAvatar sx={{ pr: 2 }}>
                {cartItem?.item?.images?.[0]?.url ? (
                  <Box
                    sx={{ borderRadius: 2 }}
                    component={"img"}
                    width={100}
                    height={100}
                    src={cartItem.item.images[0].url}
                    alt={cartItem.item?.name}
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
                    {price}
                  </Typography>
                }
              />
              <Typography
                sx={{ fontWeight: "fontWeightBold" }}
                variant="subtitle2"
              >
                {cartItem?.quantity}
              </Typography>
            </ListItem>
          );
        })}
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
