import { Reducer } from 'redux';
import { AuthActionTypes, AuthState } from './types';

export const initialState: AuthState = {
    data: {
        authenticated: true,
        tokenId:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJpb3ZvbGwra3ZtYXJrdHRlc3RAZ21haWwuY29tIiwianRpIjoiYjc5MDM3OWUtOTQwZC00NmNlLThiZGYtNDI3MzcyMjI2NDYxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwNjAxMjY0YS0zNzc2LTRiOWQtOWJiNi0yMzkyZTA2OTg1YWYiLCJleHAiOjE1NDk1NDkzMzYsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.5E9yNDI4cSo8eKi1JDWriVgfFjMKHrJQMoO-cgkfq3s',
        userId: 1,
        // firstname: Max,
        // lastname: Mustermann
    },
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
