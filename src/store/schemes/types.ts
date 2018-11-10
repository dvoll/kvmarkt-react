
// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface Scheme {
    id: number;
    title: string;
    description: string;
    content?: string;
    placeName?: string;
    place: number;
    place2?: number;
    place3?: number;
    authorName?: string;
    author: number;
    categoryName?: string;
    category: number;
    ageStart: number;
    ageEnd: number;
    likeCount?: number;
    status?: string;
    created?: Date;
    updated?: string;
    isFavorite?: boolean;
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum SchemesActionTypes {
    FETCH_REQUEST = "@@schemes/FETCH_REQUEST",
    FETCH_SUCCESS = "@@schemes/FETCH_SUCCESS",
    FETCH_ERROR = "@@schemes/FETCH_ERROR",
    FETCH_CANCELED = "@@schemes/FETCH_ERROR",
    ADD_REQUEST = "@@schemes/ADD_REQUEST",
    ADD_SUCCESS = "@@schemes/ADD_SUCCESS",
    ADD_ERROR = "@@schemes/ADD_ERROR",
    SELECTED = "@@schemes/SELECTED"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface SchemesState {
    readonly loading: boolean
    readonly data: Scheme[]
    readonly errors?: string
}