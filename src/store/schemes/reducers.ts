import { AnyAction, Reducer } from 'redux';
import { SchemesActionTypes, SchemesState } from './types'

// Type-safe initialState!
export const initialState: SchemesState = {
    data: [],
    errors: undefined,
    loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<SchemesState> = (state: SchemesState = initialState, action: AnyAction) => { // 
    switch (action.type) {
        case SchemesActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case SchemesActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case SchemesActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as heroesReducer }