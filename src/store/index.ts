// import { routerReducer, RouterState } from 'react-router-redux'
import { Action, AnyAction, combineReducers, Dispatch } from 'redux'
// import { layoutReducer, LayoutState } from './layout'

import { schemesReducer } from "./schemes/reducers";

import { combineEpics } from 'redux-observable';
import { authLoginEpic } from './auth/epics';
import { authReducer } from './auth/reducers';
import { AuthState } from './auth/types';
import { blogPostsReducer } from './blogposts/reducers';
import { BlogPostsState } from './blogposts/types';
import { routeReducer } from './route/reducers';
import { RouteState } from './route/types';
import { schemesAddEpic, schemesRequestEpic } from './schemes/epics';
import { SchemesState } from "./schemes/types";

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
    schemesState: SchemesState,
    blogPostsState: BlogPostsState,
    authState: AuthState,
    routeState: RouteState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
    schemesState: schemesReducer,
    blogPostsState: blogPostsReducer,
    authState: authReducer,
    routeState: routeReducer
})

export const rootEpic = combineEpics(
    schemesRequestEpic,
    schemesAddEpic,
    authLoginEpic
);

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}