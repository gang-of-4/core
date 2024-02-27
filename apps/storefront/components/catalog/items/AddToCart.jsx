import React, { useEffect, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Minus from '@untitled-ui/icons-react/build/esm/Minus';
import { Button, IconButton, Stack, SvgIcon, TextField, Typography } from '@mui/material'


export default function AddToCart({ item, isButtonDisabled }) {

    // @TODO: integrate with the cart context
    // to be replaced with the actual cart state using context in sprint 4
    const [cart, setCart] = useState([]);
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
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setCart([
                            ...cart,
                            {
                                ...item,
                                quantity
                            }
                        ])
                    }}
                    disabled={!!error || isButtonDisabled}
                >
                    Add to Cart
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
        </>
    )
}
