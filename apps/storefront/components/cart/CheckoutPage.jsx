"use client"
import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Lock01Icon from '@untitled-ui/icons-react/build/esm/Lock01';
import {
    Box,
    Button,
    Container,
    Link,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { CheckoutAddress } from './checkout-address';
import { CheckoutSummary } from './checkout-summary';
import { useCart } from '@/contexts/CartContext';


const initialAddress = {
    country: '',
    city: '',
    street: '',
    postalCode: '',
    description: ''
};


const Page = () => {
    const [address, setAddress] = useState(initialAddress);
    const { cartItems } = useCart();
    

    const handleAddress = useCallback((event) => {
        setAddress((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }, []);


    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        
        try {
            const cartId = cartItems.id;; 

            const response = await axios.post(`/api/v1/cart/${cartId}/checkout`, {
                address: address,
                cartItems: cartItems
            });

            console.log('Checkout Successful', response.data);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    }, [address, cartItems]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <div>
                                <Link
                                    color="text.primary"
                                    component={NextLink}
                                    href={`/cart`}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'inline-flex'
                                    }}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <ArrowLeftIcon />
                                    </SvgIcon>
                                    <Typography variant="subtitle2">
                                        Cart
                                    </Typography>
                                </Link>
                            </div>
                            <Typography variant="h3">
                                Checkout
                            </Typography>
                        </Stack>
                        <Box mt={6}>
                            <Grid
                                container
                                spacing={6}
                            >
                                <Grid
                                    md={7}
                                    xs={12}
                                >
                                    <CheckoutAddress
                                        address={address}
                                        onChange={handleAddress}
                                    />
                                </Grid>
                                <Grid
                                    md={5}
                                    xs={12}
                                >
                                    <CheckoutSummary
                                        cartItems={cartItems}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ mt: 6 }}>
                            <Button
                                color="primary"
                                endIcon={(
                                    <SvgIcon>
                                        <ArrowRightIcon />
                                    </SvgIcon>
                                )}
                                size="large"
                                sx={{ mt: 3}}
                                type="submit"
                                variant="outlined"
                            >
                                Complete order
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Page;