import { Reducer } from 'redux';
import { Scheme, SchemesActionTypes, SchemesState } from './types'

// Type-safe initialState!
export const initialState: SchemesState = {
    data: [],
    errors: undefined,
    loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<SchemesState> = (state = initialState, action) => { // 
    switch (action.type) {
        case SchemesActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case SchemesActionTypes.FETCH_CANCELED: {
            return { ...state, loading: false }
        }
        case SchemesActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case SchemesActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        case SchemesActionTypes.ADD_REQUEST: {
            const data = state.data.concat(action.payload as Scheme)
            return { ...state, loading: true, data }
        }
        case SchemesActionTypes.ADD_SUCCESS: {
            // const {internalId, serverId} = action.payload as {internalId: number, serverId: number}
            // const internalId = action.payload.internalId;
            // const serverId = action.payload.serverId;
            const data = [...state.data].map( (s) => {
                if (s.id === action.payload.internalId) { s.id = action.payload.serverId; }
                return s;
            })
            return { ...state, loading: false, data }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as schemesReducer }