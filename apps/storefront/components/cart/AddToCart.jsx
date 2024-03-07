"use client"
import React, { useEffect, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Minus from '@untitled-ui/icons-react/build/esm/Minus';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

export default function AddToCart({ item, isButtonDisabled }) {

    const pathname = usePathname();

    const { setCart } = useCart();
    const { isAuthenticated } = useAuth();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [error, setError] = useState();


    useEffect(() => {
        const newQuantity = parseInt(inputValue);
        if (isNaN(newQuantity) || newQuantity < 1) {
            return setError('Quantity must be a number and at least 1');
        }
        if (newQuantity > item.quantity) {
            return setError(`Quantity must be less than or equal to ${item.quantity}`);
        }

        setError(null);
        setQuantity(newQuantity);

    }, [inputValue]);

    async function handleAddToCart() {
        if (error || isButtonDisabled) {
            return;
        }

        if (!isAuthenticated) {
            setIsDialogOpen(true);
            return;
        }

        setLoading(true);
        try {
            await setCart({
                item: item,
                quantity: quantity
            });
            setInputValue(1);
        } catch (error) {
            console.error('Error adding to cart', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Stack
                direction='row'
                spacing={2}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <IconButton
                        onClick={() => { setInputValue(quantity - 1) }}
                        sx={{
                            color: 'primary.main'
                        }}
                        disabled={quantity === 1}
                    >
                        <SvgIcon>
                            <Minus />
                        </SvgIcon>
                    </IconButton>
                    <TextField
                        value={inputValue}
                        inputProps={{
                            style: {
                                textAlign: 'center',
                                cursor: 'default',
                            }
                        }}
                        onChange={(e) => setInputValue(e.target.value)}
                        error={!!error}
                        variant='outlined'
                        size='small'
                        sx={{ width: 50 }}
                    />
                    <IconButton
                        onClick={() => { setInputValue(quantity + 1) }}
                        sx={{
                            color: 'primary.main'
                        }}
                        disabled={quantity === item.quantity}
                    >
                        <SvgIcon>
                            <PlusIcon />
                        </SvgIcon>
                    </IconButton>
                </Stack>
                <Button
                    disabled={!!error || isButtonDisabled || loading}
                    onClick={handleAddToCart}
                    variant="outlined"
                    color="primary"
                >
                    {
                        loading
                            ? 'Adding...'
                            : 'Add to Cart'
                    }
                </Button>
            </Stack>
            <Stack
                spacing={1}
            >
                {error && (
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {error}
                    </Typography>
                )}
            </Stack>
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <DialogTitle>
                    Sign In Required
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sorry. You must be signed in to add items to your cart
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack
                        direction='row'
                        spacing={2}
                        
                    >

                    <Button
                        onClick={() => setIsDialogOpen(false)}
                        color="error"
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        component={NextLink}
                        href={`/auth/login?returnTo=${pathname}`}
                        variant='contained'
                    >
                        Sign In
                    </Button>

                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}
