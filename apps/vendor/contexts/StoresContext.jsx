import { createStoreApi, deleteStoreApi, getStoresApi, updateStoreApi } from "@/api/storeApi";
import { createContext, useCallback, useReducer } from "react";

const ActionType = {
    INITIALIZE: 'INITIALIZE',
    ADD_STORE: 'ADD_STORE',
    REMOVE_STORE: 'REMOVE_STORE',
    UPDATE_STORE: 'UPDATE_STORE',
};

const initialState = {
    stores: [],
};

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
}

export const StoresContext = createContext({
    ...initialState,
    getStores: ({ vendorId } ) => Promise.resolve(),
    createStore: (store) => Promise.resolve(),
    updateStore: (store) => Promise.resolve(),
    deleteStore: (storeId) => Promise.resolve(),
});

export const StoresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const getStores = useCallback(async ({ vendorId }) => {
        const res = await getStoresApi({ vendorId });
        dispatch({ type: ActionType.INITIALIZE, payload: res });
    }, [dispatch]);

    const createStore = useCallback(async (store) => {
        const res = await createStoreApi(store);
        dispatch({ type: ActionType.ADD_STORE, payload: res });
    }, [dispatch]);

    const updateStore = useCallback(async (store) => {
        const res = await updateStoreApi(store);
        dispatch({ type: ActionType.UPDATE_STORE, payload: res });
    }, [dispatch]);

    const deleteStore = useCallback(async (storeId) => {
        await deleteStoreApi(storeId);
        dispatch({ type: ActionType.REMOVE_STORE, payload: storeId });
    }, [dispatch]);

    return (
        <StoresContext.Provider 
            value={{ 
                state,
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



