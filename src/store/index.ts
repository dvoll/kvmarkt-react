// import { routerReducer, RouterState } from 'react-router-redux'
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
// import { layoutReducer, LayoutState } from './layout'

import { schemesReducer } from './schemes/reducers';

import { combineEpics, Epic } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import { KvMarktApiSimpleElementFetchEpic } from 'src/utils';
import { authLoginEpic } from './auth/epics';
import { authReducer } from './auth/reducers';
import { AuthState } from './auth/types';
import { blogPostsReducer } from './blogposts/reducers';
import { BlogPostsState } from './blogposts/types';
import { FetchDataTypeState } from './generic/index.class';
import PlaceStateObject from './places';
import { routeReducer } from './route/reducers';
import { RouteState } from './route/types';
import CategoryStateObject, { SchemeCategory } from './scheme-categories/index.generic';
import { schemesAddEpic, schemesRequestEpic } from './schemes/epics';
import { SchemesState } from './schemes/types';

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
    schemesState: SchemesState;
    blogPostsState: BlogPostsState;
    authState: AuthState;
    routeState: RouteState;
    categoriesState: FetchDataTypeState<SchemeCategory>;
    placesState: FetchDataTypeState<SchemeCategory>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
    schemesState: schemesReducer,
    blogPostsState: blogPostsReducer,
    authState: authReducer,
    routeState: routeReducer,
    categoriesState: CategoryStateObject.reducer,
    placesState: PlaceStateObject.reducer,
});

const loggerEpic: Epic<AnyAction, AnyAction, void> = (action$, state) => {
    return action$.pipe(
        tap(action => console.log('Action: ', action.type)),
        ignoreElements()
    );
};

export const rootEpic = combineEpics(
    loggerEpic,
    schemesRequestEpic,
    schemesAddEpic,
    authLoginEpic,
    KvMarktApiSimpleElementFetchEpic('category', CategoryStateObject),
    KvMarktApiSimpleElementFetchEpic('place', PlaceStateObject)
);

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}
