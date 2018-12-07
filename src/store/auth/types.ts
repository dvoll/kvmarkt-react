
export interface Auth {
    authenticated: boolean;
    userId?: number;
    tokenId?: string;
} 

export const enum AuthActionTypes {
    LOGIN_REQUEST = "@@auth/LOGIN_REQUEST",
    LOGIN_SUCCESS = "@@auth/LOGIN_SUCCESS",
    LOGIN_ERROR = "@@auth/LOGIN_ERROR",
    LOGIN_CANCELED = "@@auth/LOGIN_CANCELED",
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface AuthState {
    readonly loading: boolean;
    readonly data: Auth;
    readonly errors?: string;
}