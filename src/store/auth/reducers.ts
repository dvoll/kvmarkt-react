import { Reducer } from 'redux';
import { readFromPermanent, writePermanent } from 'src/utils';
import { Auth, AuthActionTypes, AuthState } from './types';

const storageTokenKey = 'auth-token';
const storageUserKey = 'auth-id';
const storageFirstnameKey = 'auth-firstname';
const storageLastnameKey = 'auth-lastname';
const storageEmailKey = 'auth-lastname';

const initialAuthData: () => Auth = () => {
    const tokenString = readFromPermanent(storageTokenKey);
    if (tokenString !== null) {
        const userIdString = readFromPermanent(storageUserKey);
        return {
            authenticated: true,
            tokenId: tokenString,
            contributor: {
                id: userIdString ? +userIdString : -1,
                firstname: readFromPermanent(storageFirstnameKey) || '',
                lastname: readFromPermanent(storageLastnameKey) || '',
                email: readFromPermanent(storageEmailKey) || '',
            },
        };
    }
    return {
        authenticated: false,
    };
};

export const initialState: AuthState = {
    data: initialAuthData(),
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AuthState> = (state = initialState, action) => {
    //
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST: {
            return { ...state, loading: true, errors: undefined };
        }
        case AuthActionTypes.LOGIN_CANCELED: {
            return { ...state, loading: false };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            // TODO: Move side-effects to epic
            writePermanent(storageTokenKey, action.payload.tokenId);
            writePermanent(storageUserKey, action.payload.contributor.id);
            writePermanent(storageFirstnameKey, action.payload.contributor.firstname);
            writePermanent(storageLastnameKey, action.payload.contributor.lastname);
            writePermanent(storageEmailKey, action.payload.contributor.email);

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
