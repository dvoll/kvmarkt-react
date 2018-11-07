// import { routerReducer, RouterState } from 'react-router-redux'
import { Action, AnyAction, combineReducers, Dispatch } from 'redux'
// import { layoutReducer, LayoutState } from './layout'

import { heroesReducer } from "./schemes/reducers";

import { combineEpics } from 'redux-observable';
import { schemesRequestEpic } from './schemes/epics';
import { SchemesState } from "./schemes/types";

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
    schemes: SchemesState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
    schemes: heroesReducer,
})

export const rootEpic = combineEpics(
    schemesRequestEpic
);

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}