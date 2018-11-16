import { AnyAction } from "redux";
import { Epic, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, delay, map, mergeMap, takeUntil, tap } from "rxjs/operators";
import { firestore } from "src/initializeFirebase";
import { addError, addSuccess, fetchError, fetchSuccess } from "./actions";
import { Scheme, SchemesActionTypes } from "./types";

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
        delay(1000), tap(), mergeMap(
            () => {
                return Observable.create((observer: any) => {
                    firestore()
                        .collection("Schemes")
                        .onSnapshot({
                            next: (snapshot: any) => {
                                observer.next(snapshot);
                            },
                            error: (err: any) => {
                                observer.error(err);
                            },
                            complete: () => {
                                observer.complete();
                            }
                        });
                    return () => {
                        console.log("remove");
                    };
                });
            }
        ), map((querySnapshot: any) => {
            // firestore.QuerySnapshot
            return querySnapshot.docs.map((r: any) => {
                const { id, title, description, ageStart, ageEnd, place, category, author } = r.data();
                const scheme: Scheme = { id, title, place, category, description, ageStart, ageEnd, author };
                return scheme;
            });
        }), map(schemes =>
            fetchSuccess(schemes)
        ), catchError(error => of(fetchError(error))) )
};


export const schemesAddEpic: Epic<AnyAction, AnyAction, void> = (
    action$,
    state
) => {
    return action$.pipe( tap(action =>
            console.log("Action: ", action)
        ), ofType(SchemesActionTypes.ADD_REQUEST), delay(1000), mergeMap(
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