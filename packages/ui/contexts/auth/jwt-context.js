import { createContext, useCallback, useEffect, useReducer } from 'react';
import { authApi } from '../../api/auth';
import { Issuer } from '../../utils/auth';


export const ActionType = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT'
};

function getInitialState(STORAGE_KEY) {
  const accessToken = localStorage.getItem(STORAGE_KEY);

  if (accessToken) {
    return {
      isAuthenticated: true,
      isInitialized: false,
      user: null
    };
  }

  return {
    isAuthenticated: false,
    isInitialized: false,
    user: null
  };

}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  SIGN_IN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_UP: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_OUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

export const AuthContext = createContext({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});

export function AuthProvider(props) {
  const { children, STORAGE_KEY, signOutCallback, apiURL } = props;
  const initializedState = getInitialState(STORAGE_KEY);
  const [state, dispatch] = useReducer(reducer, initializedState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = globalThis.localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        const user = await authApi.me({ accessToken });

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user
          }
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
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

  useEffect(() => {
    initialize();
  },
     
    []);

  const signIn = useCallback(async (userInfo, role) => {

    let res;

    switch (role) {
      case 'vendor':
        res = await authApi.vendorSignIn(
          {
            request: {
              email: userInfo.email,
              password: userInfo.password,
            },
            apiURL
          }
        );
        break;
      case 'customer':
        res = await authApi.customerSignIn(
          {
            request: {
              email: userInfo.email,
              password: userInfo.password,
            },
            apiURL
          }
        );
        break;
      case 'admin':
        res = await authApi.adminSignIn(
          {
            request: {
              email: userInfo.email,
              password: userInfo.password,
            },
            apiURL
          }
        );
        break;
      default:
        break;
    }

    const { accessToken } = res;

    const user = await authApi.me({ accessToken });

    localStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: ActionType.SIGN_IN,
      payload: {
        user
      }
    });

    return user;
  }, [dispatch]);

  const signUp = useCallback(async (userInfo, role) => {

    let res;

    switch (role) {
      case 'vendor':
        await authApi.vendorSignUp(
          {
            request: {
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: userInfo.email,
              phone: userInfo?.phone,
              password: userInfo.password,
              passwordConfirmation: userInfo.passwordConfirmation
            },
            apiURL
          },
        );

        res = await authApi.vendorSignIn(
          {
            request: {
              email: userInfo.email,
              password: userInfo.password
            },
            apiURL
          },
        );
        break;

      case 'customer':
        await authApi.customerSignUp(
          {
            request: {
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: userInfo.email,
              phone: userInfo?.phone,
              password: userInfo.password,
              passwordConfirmation: userInfo.passwordConfirmation
            },
            apiURL
          },
        );

        res = await authApi.customerSignIn(
          {
            request: {
              email: userInfo.email,
              password: userInfo.password
            },
            apiURL
          }
        );
        break;

      default:
        break;
    }

    const { accessToken } = res;
    const user = await authApi.me({ accessToken });

    localStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: ActionType.SIGN_UP,
      payload: {
        user
      }
    });
  }, [dispatch]);

  const signOut = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    if (signOutCallback) {
      signOutCallback();
    }
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
