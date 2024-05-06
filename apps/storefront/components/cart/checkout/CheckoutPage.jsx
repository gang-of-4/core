"use client";
import { useCallback, useEffect, useState } from "react";
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
import { CheckoutAddress } from "./CheckoutAddress";
import { CheckoutSummary } from "./CheckoutSummary";
import { useCart } from "@/contexts/CartContext";
import fetchApi from "@/utils/fetch-api";
import { useRouter } from "next/navigation";
import { capitalize } from "@/utils/format-string";
import { config } from "ui/config";

const initialAddress = {
  country: "",
  state: "",
  city: "",
  street: "",
  postalCode: "",
  notes: "",
};

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(initialAddress);
  const { cart, isInitialized } = useCart();

  const handleAddress = useCallback((event) => {
    setAddress((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const { data, error } = await fetchApi({
          url: `/api/cart/${cart?.id}/checkout`,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address,
            }),
          },
        });

        if (error) {
          console.error("Error during checkout:", error);
          return;
        }

        console.log("Checkout Successful");

        if (data?.redirectUrl) {
          router.push(data.redirectUrl);
        } else {
          router.push("/orders");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      } finally {
        setLoading(false);
      }
    },
    [address, cart]
  );

  useEffect(() => {
    if (isInitialized) {
      if (cart?.cartItems.length === 0 || !cart.isAvailable) {
        router.push("/cart");
      }
    }
  }, [cart, isInitialized]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box
                component={NextLink}
                href={`/cart`}
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
                <Typography variant="subtitle2">
                  Back to {capitalize(config.cart.name)}
                </Typography>
              </Box>
              <Typography variant="h3">Checkout</Typography>
            </Stack>
            <Box mt={6}>
              <Grid container spacing={6}>
                <Grid md={7} xs={12}>
                  <CheckoutAddress address={address} onChange={handleAddress} />
                </Grid>
                <Grid md={5} xs={12}>
                  {isInitialized && <CheckoutSummary cart={cart} />}
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
                disabled={loading || !isInitialized}
              >
                {loading
                  ? "Processing..."
                  : `Complete ${capitalize(config.order.name)}`}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
