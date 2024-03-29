import { createBusinessStoreApi, createIndividualStoreApi, deleteStoreApi, getStoresApi, updateBusinessStoreApi } from "@/api/storeApi";
import { createContext, useCallback, useEffect, useReducer } from "react";

const STORAGE_KEY = 'vendorStores';

const ActionType = {
    INITIALIZE: 'INITIALIZE',
    ADD_STORE: 'ADD_STORE',
    REMOVE_STORE: 'REMOVE_STORE',
    UPDATE_STORE: 'UPDATE_STORE',
};

function getInitialState() {
    if (typeof window !== 'undefined') {
        const stores = localStorage.getItem(STORAGE_KEY);
        return stores ?
            {
                stores: JSON.parse(stores),
            }
            : {
                stores: [],
            };
    }
};

const initialState = getInitialState();


const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.INITIALIZE:
            return {
                ...state,
                stores: action.payload,
            };
        case ActionType.ADD_STORE:
            return {
                ...state,
                stores: [...state.stores, action.payload],
            };
        case ActionType.REMOVE_STORE:
            return {
                ...state,
                stores: state.stores.filter(
                    (store) => store.id !== action.payload
                ),
            };
        case ActionType.UPDATE_STORE:
            return {
                ...state,
                stores: state.stores.map((store) =>
                    store.id === action.payload.id ? action.payload : store
                ),
            };
        default:
            return state;
    }
};

export const StoresContext = createContext({
    ...initialState,
    getStores: (vendorId) => Promise.resolve(),
    createIndividualStore: (vendorId) => Promise.resolve(),
    createBusinessStore: (store) => Promise.resolve(),
    updateBusinessStore: (store) => Promise.resolve(),
    deleteStore: (storeId) => Promise.resolve(),
});

export const StoresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getStores = useCallback(async (vendorId) => {
        try {
            const res = await getStoresApi(vendorId);
            dispatch({ type: ActionType.INITIALIZE, payload: res });
            return res;
        } catch (err) {
            console.error(err);
        };
    }, [dispatch]);

    const createIndividualStore = useCallback(async (vendorId) => {
        try {
            const res = await createIndividualStoreApi(vendorId);
            dispatch({ type: ActionType.ADD_STORE, payload: res });
        } catch (err) {
            console.error(err);
        };
    }, [dispatch]);

    const createBusinessStore = useCallback(async (store) => {
        try {
            const res = await createBusinessStoreApi(store);
            dispatch({ type: ActionType.ADD_STORE, payload: res });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const updateBusinessStore = useCallback(async ({ storeId, store }) => {
        try {
            const res = await updateBusinessStoreApi({ storeId, updateBusinessStoreDto: store });
            dispatch({ type: ActionType.UPDATE_STORE, payload: res });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const deleteStore = useCallback(async (storeId) => {
        try {
            await deleteStoreApi(storeId);
            dispatch({ type: ActionType.REMOVE_STORE, payload: storeId });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stores));
    }, [state.stores]);

    return (
        <StoresContext.Provider
            value={{
                ...state,
                getStores,
                createIndividualStore,
                createBusinessStore,
                updateBusinessStore,
                deleteStore,
            }}
        >
            {children}
        </StoresContext.Provider>
    );
};


export function signOutCallback() {
    localStorage.removeItem(STORAGE_KEY);
};



