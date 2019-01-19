export interface Auth {
    loggedOut?: true;
    authenticated: boolean;
    userId?: number;
    tokenId?: string;
    readonly contributor?: Contributor;
}

export interface Contributor {
    id: number;
    firstname: string;
    lastname: string;
    association?: any;
    email: string;
}

export const enum AuthActionTypes {
    LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
    LOGIN_ERROR = '@@auth/LOGIN_ERROR',
    LOGIN_CANCELED = '@@auth/LOGIN_CANCELED',
    LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST',
    LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS',
    LOGOUT_ERROR = '@@auth/LOGOUT_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface AuthState {
    readonly loading: boolean;
    readonly data: Auth;
    readonly errors?: string;
}
