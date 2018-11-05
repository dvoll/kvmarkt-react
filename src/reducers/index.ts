import { combineReducers } from 'redux'
import * as fromSchemes from './schemes'

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    schemes: fromSchemes.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
    schemes: fromSchemes.initialState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    schemes: fromSchemes.reducer
})