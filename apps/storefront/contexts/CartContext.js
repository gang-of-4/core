import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";
import fetchApi from "@/utils/fetch-api";

const STORAGE_KEY = "cart";

const ActionType = {
  INITIALIZE: "INITIALIZE",
  SET_CART: "SET_CART",
  CLEAR_CART: "CLEAR_CART",
  CHECKOUT: "CHECKOUT",
};

const initialState = {
  cart: {},
  isInitialized: false,
  checkedOut: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.INITIALIZE:
      return {
        ...state,
        cart: action.payload,
        isInitialized: true,
        checkedOut: false,
      };
    case ActionType.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ActionType.CLEAR_CART:
      return {
        ...state,
        cart: {},
      };
    case ActionType.CHECKOUT:
      return {
        ...state,
        checkedOut: true,
      };
    default:
      return state;
  }
};

const CartContext = createContext({
  ...initialState,
  dispatch: () => {},
});

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, isInitialized: isAuthInitialized, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthInitialized) {
      if (user?.id) {
        initialize();
      }
    }

    if (isAuthInitialized && !isAuthenticated) {
      dispatch({ type: ActionType.CLEAR_CART });
    }
  }, [isAuthInitialized, user, isAuthenticated, state.checkedOut]);

  const initialize = useCallback(async () => {
    try {
      const { data: cart } = await fetchApi({
        url: `/api/cart`,
        options: {
          method: "POST",
        },
      });

      if (typeof window === "undefined") {
        throw new Error("Window is not defined");
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

      dispatch({ type: ActionType.INITIALIZE, payload: cart });
    } catch (error) {
      console.error("Error initializing cart", error);
    }
  }, [dispatch]);

  const addCartItem = useCallback(
    async ({ itemId, quantity, isVariant }) => {
      try {
        const { data: cart, error } = await fetchApi({
          url: `/api/cart/${state.cart?.id}/items`,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              itemId,
              quantity,
              isVariant,
            }),
          },
        });

        if (error) {
          throw new Error("Error adding to cart");
        }

        dispatch({ type: ActionType.SET_CART, payload: cart });
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    },
    [dispatch, state.cart]
  );

  const modifyCartItem = useCallback(
    async (cartItem) => {
      try {
        const { data: cart, error } = await fetchApi({
          url: `/api/cart/${state.cart?.id}/items/${cartItem?.id}`,
          options: {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: +cartItem.quantity,
            }),
          },
        });

        if (error) {
          throw new Error("Error modifying cart");
        }

        dispatch({ type: ActionType.SET_CART, payload: cart });
      } catch (error) {
        console.error("Error modifying cart", error);
      }
    },
    [dispatch, state.cart]
  );

  const removeCartItem = useCallback(
    async (cartItemId) => {
      try {
        const { data: cart, error } = await fetchApi({
          url: `/api/cart/${state.cart?.id}/items/${cartItemId}`,
          options: {
            method: "DELETE",
          },
        });

        if (error) {
          throw new Error("Error removing from cart");
        }

        dispatch({ type: ActionType.SET_CART, payload: cart });
      } catch (error) {
        console.error("Error removing from cart", error);
      }
    },
    [dispatch, state.cart]
  );

  const clearCart = useCallback(async () => {
    dispatch({ type: ActionType.CLEAR_CART });
  }, [dispatch]);

  const checkout = useCallback(async () => {
    dispatch({ type: ActionType.CHECKOUT });
  }, [dispatch]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addCartItem,
        modifyCartItem,
        removeCartItem,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function signOutCallback() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}
