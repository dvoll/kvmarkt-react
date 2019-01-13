import { UlightThemeTypes } from '@dvll/ulight-react';
import { Reducer } from 'redux';
import { readFromPermanent, writePermanent } from 'src/utils';
import { AppActionTypes, AppState } from './types';

const themeTypeKey = 'ThemeType';
const storedThemeType = readFromPermanent(themeTypeKey);

export const initialState: AppState = {
    theme: storedThemeType !== null ? +storedThemeType : UlightThemeTypes.LIGHT,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AppState> = (state = initialState, action) => {
    //
    switch (action.type) {
        case AppActionTypes.CHANGE_THEME: {
            // TODO: Move side-effect to Epic
            writePermanent(themeTypeKey, '' + action.payload);
            return { ...state, theme: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as appReducer };
