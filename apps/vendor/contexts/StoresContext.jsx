import { useAuth } from "@/contexts/AuthContext";
import fetchApi from "@/utils/fetch-api";
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = 'vendorStores';

const ActionType = {
    INITIALIZE: 'INITIALIZE',
    ADD_STORE: 'ADD_STORE',
    REMOVE_STORE: 'REMOVE_STORE',
    UPDATE_STORE: 'UPDATE_STORE',
};

const initialState = {
    stores: [],
    isInitialized: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.INITIALIZE:
            return {
                ...state,
                stores: action.payload,
                isInitialized: true,
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
    dispatch: () => { },
});

export const StoresProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user, isInitialized: isAuthInitialized } = useAuth();

    useEffect(() => {
        if (isAuthInitialized) {
            if (user?.id) {
                initialize(user?.id);
            }
        }
    }, [user, isAuthInitialized]);

    const initialize = useCallback(async (id) => {

        try {
            const { data } = await fetchApi({
                url: `/vendor/api/stores/vendor/${id}`,
                options: {
                    method: 'GET',
                },
            });

            if (typeof window === 'undefined') {
                throw new Error('Window is not defined');
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

            dispatch({ type: ActionType.INITIALIZE, payload: data, isInitialized: true});
        } catch (error) {
            console.error('Error initializing stores', error);
        }
    }, [dispatch]);

    const createIndividualStore = useCallback(async (vendorId) => {
        const { data } = await fetchApi({
            url: `/vendor/api/stores/individual`,
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vendorId }),
            },
        });

        if (typeof window === 'undefined') {
            throw new Error('Window is not defined');
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.stores, data]));

        dispatch({ type: ActionType.ADD_STORE, payload: data });

        return data;
    }, [dispatch, state.stores]);

    const createBusinessStore = useCallback(async ({
        vendorId,
        name,
        logo,
        vatNumber,
        crNumber,
        ownerNationalId,
    }) => {

        const formData = new FormData();
        formData.append('vendorId', vendorId);
        formData.append('name', name);
        formData.append('logo', logo);
        formData.append('vatNumber', vatNumber);
        formData.append('crNumber', crNumber);
        formData.append('ownerNationalId', ownerNationalId);

        const { data } = await fetchApi({
            url: `/vendor/api/stores/business`,
            options: {
                method: 'POST',
                body: formData,
            },
        });

        if (typeof window === 'undefined') {
            throw new Error('Window is not defined');
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.stores, data]));

        dispatch({ type: ActionType.ADD_STORE, payload: data });

        return data;
    }, [dispatch, state.stores]);

    const updateBusinessStore = useCallback(async ({ storeId, store }) => {
        const { data } = await fetchApi({
            url: `/vendor/api/stores/business/${storeId}`,
            options: {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...store,
                    logo: store.logo ? store.logo : 'default',
                }),
            },
        });

        if (typeof window === 'undefined') {
            throw new Error('Window is not defined');
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                state.stores.map((s) => (s.id === storeId ? data : s))
            )
        );

        dispatch({ type: ActionType.UPDATE_STORE, payload: data });

        return data;
    }, [dispatch, state.stores]);

    const deleteStore = useCallback(async (storeId) => {
        const { data } = await fetchApi({
            url: `/vendor/api/stores/${storeId}`,
            options: {
                method: 'DELETE',
            },
        });

        if (typeof window === 'undefined') {
            throw new Error('Window is not defined');
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.stores.filter((s) => s.id !== storeId))
        );

        dispatch({ type: ActionType.REMOVE_STORE, payload: storeId });

        return data;
    }, [dispatch, state.stores]);


    return (
        <StoresContext.Provider
            value={{
                ...state,
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

export const useStores = () => {
    const context = useContext(StoresContext);
    if (!context) {
        throw new Error('useStores must be used within a StoresProvider');
    }
    return context;
};

export function signOutCallback() {
    localStorage.removeItem(STORAGE_KEY);
}