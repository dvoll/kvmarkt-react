import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, delay, map, mergeMap, takeUntil, tap } from "rxjs/operators";
import { addError, addSuccess, fetchError, fetchSuccess } from "./actions";
import { SchemesActionTypes } from "./types";

export const schemesRequestEpic: Epic<AnyAction, AnyAction, void> = (
    action$,
    state
) => {
    return action$.pipe( map(action => {
            console.log(action);
            return action;
        }), 
        ofType(SchemesActionTypes.FETCH_REQUEST), 
        takeUntil(action$.pipe(ofType(SchemesActionTypes.FETCH_CANCELED))),
        delay(1000), tap(), 
        // TODO: Get URL and token from store
        mergeMap(() => {
            return from(
                fetch('http://localhost:52833/api/scheme', {
                    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJpb3ZvbGwra3ZtYXJrdHRlc3RAZ21haWwuY29tIiwianRpIjoiMDMwZDllMTMtMjY3MS00ZjUzLWEyMjQtZmYxM2I0YzVlNGRmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwNjAxMjY0YS0zNzc2LTRiOWQtOWJiNi0yMzkyZTA2OTg1YWYiLCJleHAiOjE1NDY4OTE3ODEsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.VPwhA-aU6VEYVgtH6Jcq_gHicILtLUqTq75G_1pTSDk'}
                })
                .then(response => response.json())).pipe(
                    map(result =>
                        fetchSuccess(result.result)
                    ),
                    catchError(error => of(fetchError(error)))
                )
        }), 
        // mergeMap(response => response.json()),
        // tap((data) => data),
         )
};


export const schemesAddEpic: Epic<AnyAction, AnyAction, void> = (
    action$,
    state
) => {
    return action$.pipe( 
        // tap(action =>
        //     console.log("Action: ", action)
        // ), 
        ofType(SchemesActionTypes.ADD_REQUEST), delay(1000), mergeMap(
            action =>
                of({ result: { serverId: 1 } }).pipe(
                    // fetch("./schemes.mock.json")
                    tap(res => console.log("Response:", res)),
                    // mergeMap((response: Response) => response.json()),
                    map(response => response.result),
                    map(result =>
                        addSuccess(action.payload.id, result.serverId)
                    ),
                    catchError(error =>
                        of(addError(action.payload.id, error))
                    )
                    // takeUntil(action$.pipe(ofType(SchemesActionTypes.FETCH_CANCELED)))
                )
        ) );
};