

// export interface Route {
//     location?: string;
//     title?: string;
//     backButton?: boolean;
// }

export const enum RouteActionTypes {
    CHANGE_TITLE = "@@route/CHANGE_TITLE",
    ENABLE_BACKBUTTON = "@@route/ENABLE_BACKBUTTON",
    DISABLE_BACKBUTTON = "@@route/DISABLE_BACKBUTTON"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface RouteState {
    readonly location?: string;
    readonly title?: string;
    readonly backButton?: boolean;
}