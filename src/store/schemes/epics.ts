import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, delay, map, mergeMap, takeUntil, tap } from "rxjs/operators";
import { addError, addSuccess, fetchError, fetchSuccess } from "./actions";
import { Scheme, SchemesActionTypes } from "./types";

export const schemesRequestEpic: Epic<AnyAction, AnyAction, void> = (
    action$,
    state
) => {
    return action$.pipe(
        // map(action => {
        //     console.log(action);
        //     return action;
        // }),
        ofType(SchemesActionTypes.FETCH_REQUEST),
        delay(1000),
        mergeMap(action => from(fetch("./schemes.mock.json")).pipe(
            tap(res => console.log("Response:", res)),
            mergeMap( (response: Response) => response.json()),
            tap(res => console.log("JSON:", res)),
            map( (response: {result: Scheme[]}) => response.result),
            map( (result) => fetchSuccess(result)),
            catchError(error => of(fetchError(error))),
            takeUntil(action$.pipe(ofType(SchemesActionTypes.FETCH_CANCELED)))
        ))
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