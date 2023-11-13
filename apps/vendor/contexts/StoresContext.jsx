import { createStoreApi, deleteStoreApi, getStoresApi, updateStoreApi } from "@/api/storeApi";
import { createContext, useCallback, useReducer } from "react";

const STORAGE_KEY = 'vendorStores';

const ActionType = {
    INITIALIZE: 'INITIALIZE',
    ADD_STORE: 'ADD_STORE',
    REMOVE_STORE: 'REMOVE_STORE',
    UPDATE_STORE: 'UPDATE_STORE',
};

const initialState = {
    stores: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
};

function addLocalStorage(store) {
    const stores = JSON.parse(localStorage.getItem(STORAGE_KEY));
    stores.push(store);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
}

function updateLocalStorage(store) {
    const stores = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const storeIndex = stores.findIndex((s) => s.id === store.id);
    stores[storeIndex] = store;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
}

function removeLocalStorage(storeId) {
    const stores = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const storeIndex = stores.findIndex((s) => s.id === storeId);
    stores.splice(storeIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
}

const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.INITIALIZE:
            console.log('action.payload', action.payload);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
            return {
                ...state,
                stores: action.payload,
            };
        case ActionType.ADD_STORE:
            addLocalStorage(action.payload);
            return {
                ...state,
                stores: [...state.stores, action.payload],
            };
        case ActionType.REMOVE_STORE:
            removeLocalStorage(action.payload);
            return {
                ...state,
                stores: state.stores.filter(
                    (store) => store.id !== action.payload
                ),
            };
        case ActionType.UPDATE_STORE:
            updateLocalStorage(action.payload);
            return {
                ...state,
                stores: state.stores.map((store) =>
                    store.id === action.payload.id ? action.payload : store
                ),
            };
        default:
            return state;
    }
}

export const StoresContext = createContext({
    ...initialState,
    getStores: (vendorId) => Promise.resolve(),
    createStore: (store) => Promise.resolve(),
    updateStore: (store) => Promise.resolve(),
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
        }
    }, [dispatch]);

    const createStore = useCallback(async (store) => {
        try {
            const res = await createStoreApi(store);
            dispatch({ type: ActionType.ADD_STORE, payload: res });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const updateStore = useCallback(async (store) => {
        try {
            const res = await updateStoreApi(store);
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

    return (
        <StoresContext.Provider
            value={{
                ...state,
                getStores,
                createStore,
                updateStore,
                deleteStore,
            }}
        >
            {children}
        </StoresContext.Provider>
    );
};


export function signOutCallback(){
    localStorage.removeItem(STORAGE_KEY);
  }



