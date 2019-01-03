import * as React from "react";
import { Redirect, Route } from "react-router";
import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, delay, map, mergeMap, takeUntil } from "rxjs/operators";
import { ReduxSimpleFetchState } from "./store/generic/index.class";

export const privateRoute = (Component: any, accessGranted: boolean, path: string) => {
    if (accessGranted) {
        // tslint:disable-next-line:jsx-no-lambda
        return <Route path={path} component={Component} />
    }
    return <Redirect to='/login' />
}

export function KvMarktApiSimpleElementFetchEpic<T>(identifier: string, element: ReduxSimpleFetchState<T>) {
    return KvMarktApiSimpleFetchEpic(identifier, element.fetchActionTypes.FETCH_REQUEST, element.fetchActionTypes.FETCH_CANCELED, element.fetchSuccess, element.fetchError);
}

export const KvMarktApiSimpleFetchEpic = (identifier: string, fetchRequestType: string, fetchCanceledType: string, fetchSuccess: any, fetchError: any) => {
    const schemesRequestEpic: Epic <AnyAction, AnyAction, void> = (
        action$,
        state
    ) => {
        return action$.pipe(
            ofType(fetchRequestType),
            takeUntil(action$.pipe(ofType(fetchCanceledType))),
            delay(1000),
            mergeMap(() => {
                return from( makeKvMarktApiRequest(identifier) )
                    .pipe(
                        map(result =>
                            fetchSuccess(result)
                        ),
                        catchError(error => of(fetchError(error)))
                    )
            }),
        )
    };
    return schemesRequestEpic;
}

export const makeKvMarktApiRequest = (identifier: string) => {
    return fetch("http://localhost:52833/api/" + identifier, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJpb3ZvbGwra3ZtYXJrdHRlc3RAZ21haWwuY29tIiwianRpIjoiMDMwZDllMTMtMjY3MS00ZjUzLWEyMjQtZmYxM2I0YzVlNGRmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwNjAxMjY0YS0zNzc2LTRiOWQtOWJiNi0yMzkyZTA2OTg1YWYiLCJleHAiOjE1NDY4OTE3ODEsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.VPwhA-aU6VEYVgtH6Jcq_gHicILtLUqTq75G_1pTSDk"
        }
    })
        .then(response => response.json())
        .then(response => response.result);
    // TODO: dispatch general laoding failed action; Find a better place for that
}