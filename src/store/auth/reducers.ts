import { Reducer } from "redux";
import { AuthActionTypes, AuthState } from "./types";


export const initialState: AuthState = {
    data: {
        authenticated: false
    },
    errors: undefined,
    loading: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AuthState> = (state = initialState, action) => {
    //
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST: {
            return { ...state, loading: true };
        }
        case AuthActionTypes.LOGIN_CANCELED: {
            return { ...state, loading: false };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        case AuthActionTypes.LOGIN_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as authReducer };