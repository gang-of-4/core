"use client";
import { useCallback, useState } from "react";
import NextLink from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { CheckoutAddress } from "./checkout-address";
import { CheckoutSummary } from "./checkout-summary";
import { useCart } from "@/contexts/CartContext";

const initialAddress = {
  country: "",
  city: "",
  street: "",
  postalCode: "",
  notes: "",
};

const Page = () => {
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethodId, setPaymentMethodId] = useState();
  const { cart } = useCart();

  const handleAddress = useCallback((event) => {
    setAddress((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const { data, error } = await fetchApi({
          url: `/api/cart/${cart?.id}/checkout`,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethodId,
              address,
            }),
          },
        });

        if (error) {
          console.error("Error during checkout:", error);
          return;
        }

        console.log("Checkout Successful", response.data);
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    },
    [address, cart]
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box
                component={NextLink}
                href={`/catalog/items`}
                color="primary.main"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                  px: 2,
                  pt: 4,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">Back to Cart</Typography>
              </Box>
              <Typography variant="h3">Checkout</Typography>
            </Stack>
            <Box mt={6}>
              <Grid container spacing={6}>
                <Grid md={7} xs={12}>
                  <CheckoutAddress
                    address={address}
                    onChange={handleAddress}
                    onPaymentChange={setPaymentMethodId}
                  />
                </Grid>
                <Grid md={5} xs={12}>
                  <CheckoutSummary cart={cart} />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 6 }}>
              <Button
                color="primary"
                endIcon={
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                }
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="outlined"
              >
                Complete Order
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
