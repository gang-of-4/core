import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import fetchApi from "@/utils/fetch-api";

const STORAGE_KEY = 'cartItems';

const ActionType = {
    INITIALIZE: 'INITIALIZE',
    SET_CART: 'SET_CART',
    CLEAR_CART: 'CLEAR_CART',
};

const initialState = {
    cartItems: [],
    isInitialized: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.INITIALIZE:
            return {
                ...state,
                cartItems: action.payload,
                isInitialized: true,
            };
        case ActionType.SET_CART:
            return {
                ...state,
                cartItems: action.payload,
            };
        case ActionType.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

const CartContext = createContext({
    ...initialState,
    dispatch: () => { },
});

export function CartProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { user, isInitialized: isAuthInitialized, isAuthenticated } = useAuth();

    useEffect(() => {
        
        if (isAuthInitialized) {
            if (user?.id) {
                initialize(user?.id);
            }
        }

        if (isAuthInitialized && !isAuthenticated) {
            dispatch({ type: ActionType.CLEAR_CART });
        }

    }, [isAuthInitialized, user, isAuthenticated]);


    const initialize = useCallback(async (userId) => {
        try {
            const { data: cartItems } = await fetchApi({
                url: `/api/cart?userId=${userId}`,
                method: 'GET',
            });

            if (typeof window === 'undefined') {
                throw new Error('Window is not defined');
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));

            dispatch({ type: ActionType.INITIALIZE, payload: cartItems });
        } catch (error) {
            console.error('Error initializing cart', error);
        }
    }, [dispatch]);

    const setCart = useCallback(async (cartItem) => {

        const newCartItems = [...state.cartItems];
        const index = newCartItems.findIndex((i) => i?.item?.id === cartItem?.item?.id);
        if (index === -1) {
            newCartItems.push(cartItem);
        } else {
            newCartItems[index].quantity += cartItem.quantity;
        }

        try {
            const { data, error } = await fetchApi({
                url: `/api/cart`,
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cartItems: newCartItems
                    })
                },
            });

            if (error) {
                throw new Error('Error adding to cart');
            }

            dispatch({ type: ActionType.SET_CART, payload: newCartItems });

        } catch (error) {
            console.error('Error adding to cart', error);
        }
    }, [dispatch, state.cartItems]);

    const removeFromCart = useCallback(async (id) => {
        const newCartItems = state.cartItems.filter((item) => item.id !== id);

        try {
            const { data, error } = await fetchApi({
                url: `/api/cart`,
                options: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cartItems: newCartItems
                    })
                },
            });

            if (error) {
                throw new Error('Error removing from cart');
            }

            dispatch({ type: ActionType.SET_CART, payload: newCartItems });

        } catch (error) {
            console.error('Error removing from cart', error);
        }
    }, [dispatch, state.cartItems]);

    const clearCart = useCallback(async () => {
        try {
            const { data, error } = await fetchApi({
                url: `/api/cart`,
                options: {
                    method: 'DELETE',
                },
            });

            if (error) {
                throw new Error('Error clearing cart');
            }

            dispatch({ type: ActionType.CLEAR_CART });

        } catch (error) {
            console.error('Error clearing cart', error);
        }
    }, [dispatch]);


    return (
        <CartContext.Provider value={{
            ...state,
            setCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );

};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export function signOutCallback() {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem(STORAGE_KEY);
}