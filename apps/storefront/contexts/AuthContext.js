import fetchApi from "@/hooks/fetch-api";
import { decodeUser } from "@/utils/jwt-token";
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";


export const ActionType = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
    SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers = {
    [ActionType.INITIALIZE]: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    [ActionType.SIGN_IN]: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            user
        };
    },
    [ActionType.SIGN_UP]: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            user
        };
    },
    [ActionType.SIGN_OUT]: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            user
        };
    }
};

function reducer(state, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
};

export const AuthContext = createContext({
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    dispatch: () => { }
});

export function AuthProvider(props) {

    const { children, signOutCallback } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = useCallback(async () => {

        try {

            if (typeof window === 'undefined') {
                throw new Error('Window is not defined');
            }

            const token = localStorage.getItem('customerAccessToken');

            const user = await decodeUser(token);

            if (token) {
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: true,
                        user: user
                    }
                });
            } else {
                throw new Error('No token found');
            }
        } catch (err) {
            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            });
        }
    }, [dispatch]);

    const signIn = useCallback(async (request) => {
        const { email, password } = request;
        const { data, loading, error } = await fetchApi({
            url: '/api/auth/login',
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            },
            includeToken: false
        });

        const { accessToken } = data;
        const user  = await decodeUser(accessToken);

        if (accessToken) {

            if (window && window.localStorage) {
                localStorage.setItem('customerAccessToken', accessToken);
            }

            dispatch({
                type: ActionType.SIGN_IN,
                payload: {
                    isAuthenticated: true,
                    user: user
                }
            });
        }

        return { user, accessToken, loading, error };
    }, [dispatch]);

    const signUp = useCallback(async (request) => {
        const {
            firstName,
            lastName,
            email,
            phone = null,
            password,
            passwordConfirmation
        } = request;

        await fetchApi({
            url: '/api/auth/register',
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    passwordConfirmation
                })
            },
            includeToken: false
        });

        const { user, accessToken, loading, error } = signIn({ email, password });

        return { user, accessToken, loading, error };
    }, [dispatch]);

    const signOut = useCallback(() => {
        localStorage.removeItem('customerAccessToken');
        if (signOutCallback) {
            signOutCallback();
        }
        dispatch({
            type: ActionType.SIGN_OUT,
            payload: {
                isAuthenticated: false,
                user: null
            }
        });
    }, [dispatch]);

    return (
        <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};