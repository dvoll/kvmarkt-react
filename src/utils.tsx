import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { AnyAction } from 'redux';
import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, delay, map, mergeMap, takeUntil } from 'rxjs/operators';
import { ApplicationState } from './store';
import { ReduxSimpleFetchState } from './store/generic/index.class';

export const privateRoute = (Component: any, accessGranted: boolean, path: string) => {
    if (accessGranted) {
        // tslint:disable-next-line:jsx-no-lambda
        return <Route path={path} component={Component} />;
    }
    return <Redirect to="/login" />;
};

export function KvMarktApiSimpleElementFetchEpic<T>(identifier: string, element: ReduxSimpleFetchState<T>) {
    return KvMarktApiSimpleFetchEpic(
        identifier,
        element.fetchActionTypes.FETCH_REQUEST,
        element.fetchActionTypes.FETCH_CANCELED,
        element.fetchSuccess,
        element.fetchError
    );
}

export const KvMarktApiSimpleFetchEpic = (
    identifier: string,
    fetchRequestType: string,
    fetchCanceledType: string,
    fetchSuccess: any,
    fetchError: any
) => {
    const schemesRequestEpic: Epic<AnyAction, AnyAction, ApplicationState> = (action$, state) => {
        return action$.pipe(
            ofType(fetchRequestType),
            takeUntil(action$.pipe(ofType(fetchCanceledType))),
            delay(1000),
            mergeMap(() => {
                return from(makeKvMarktApiRequest(identifier, state.value.authState.data.tokenId || '')).pipe(
                    map(result => fetchSuccess(result)),
                    catchError(error => of(fetchError(error)))
                );
            })
        );
    };
    return schemesRequestEpic;
};

export const makeKvMarktApiRequest = (identifier: string, authToken: string) => {
    return fetch('http://localhost:52833/api/' + identifier, {
        headers: {
            Authorization: 'Bearer ' + authToken,
        },
    })
        .then(response => response.json())
        .then(response => response.result);
    // TODO: dispatch general laoding failed action; Find a better place for that
};

export const localStoragePrefix = 'KvMarkt-';

export const writePermanent = (key: string, value: string) => {
    localStorage.setItem(localStoragePrefix + key, value);
};
export const readFromPermanent = (key: string) => {
    return localStorage.getItem(localStoragePrefix + key);
};
