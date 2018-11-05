import { Action, ActionTypes } from '../actions/schemes'
import Scheme from '../models/Scheme'

// Define our State interface for the current reducer
export interface State {
    schemes: Scheme[]
}

// Define our initialState
export const initialState: State = {
    schemes: [] // We don't have any schemes at the start of the app
}

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in schemes reducer, action type is Action defined in our actions/schemes file.
 */
export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {

        case ActionTypes.ADD_SCHEME: {
            /*
             * We have autocompletion here
             * Typescript knows the action is type of AddTodoAction thanks to the ActionTypes enum
             * scheme is type of Todo
             */
            const scheme = action.payload.scheme

            return {
                ...state,
                schemes: [...state.schemes, scheme] // Add scheme to schemes array
            }
        }

        // case ActionTypes.TOGGLE_SCHEME: {
        //     /*
        //      * This is the same as 
        //      * const schemeId = action.payload.schemeId
        //      */
        //     const { schemeId } = action.payload
        //     return {
        //         ...state,
        //         schemes: state.schemes.map(scheme => scheme.id === schemeId ? { ...scheme, done: !scheme.done } : scheme)
        //     }
        // }

        default:
            return state
    }
}