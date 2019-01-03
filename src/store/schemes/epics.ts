import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, delay, map, mergeMap, tap } from "rxjs/operators";
import { KvMarktApiSimpleFetchEpic } from "src/utils";
import { addError, addSuccess, fetchError, fetchSuccess } from "./actions";
import { SchemesActionTypes } from "./types";

export const schemesRequestEpic = KvMarktApiSimpleFetchEpic("scheme", SchemesActionTypes.FETCH_REQUEST, SchemesActionTypes.FETCH_CANCELED, fetchSuccess, fetchError);


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