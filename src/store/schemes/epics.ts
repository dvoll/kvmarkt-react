import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
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
        mergeMap(() => fetch('http://localhost:52833/api/scheme')
        ), 
        mergeMap(response => response.json()),
        // tap((data) => data),
        map(result =>
            fetchSuccess(result.result)
        ),
        catchError(error => of(fetchError(error))) )
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