import { Reducer } from "redux";
import { RouteActionTypes, RouteState } from "./types";


export const initialState: RouteState = {
    // data: {
    title: '',
    backButton: false
    // },
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<RouteState> = (state = initialState, action) => {
    //
    switch (action.type) {
        case RouteActionTypes.CHANGE_TITLE: {
            return { ...state, title: action.payload };
        }
        case RouteActionTypes.ENABLE_BACKBUTTON: {
            return { ...state, backButton: true };
        }
        case RouteActionTypes.DISABLE_BACKBUTTON: {
            return { ...state, backButton: false };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as routeReducer };