"use client"
import React, { useEffect, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Minus from '@untitled-ui/icons-react/build/esm/Minus';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';


export default function AddToCart({ activeItem }) {

    const pathname = usePathname();

    const { isAuthenticated } = useAuth();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [error, setError] = useState();

    useEffect(() => {
        const newQuantity = parseInt(inputValue);

        if (isNaN(newQuantity)) return setError('Quantity must be a number');
        if (newQuantity < 1) return setError('Quantity must be at least 1');
        if (newQuantity > activeItem?.quantity) return setError(`Sorry. Only ${activeItem?.quantity} are available`);

        setError(null);
        setQuantity(newQuantity);

    }, [inputValue]);

    async function handleAddToCart() {
        if (error) return;

        if (!isAuthenticated) {
            setIsDialogOpen(true);
            return;
        }

        setLoading(true);
        try {
            // await setCart({
            //     item: activeItem,
            //     quantity: quantity
            // });
            console.log('Added to cart', { item: activeItem, quantity: quantity });
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
                        sx={{ width: 150 }}
                    />
                    <IconButton
                        onClick={() => { setInputValue(quantity + 1) }}
                        sx={{
                            color: 'primary.main'
                        }}
                        disabled={quantity === activeItem?.quantity}
                    >
                        <SvgIcon>
                            <PlusIcon />
                        </SvgIcon>
                    </IconButton>
                </Stack>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={!!error || !activeItem || loading}
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
