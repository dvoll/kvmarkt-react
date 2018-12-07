import { Epic, ofType } from "redux-observable";

import { AnyAction } from "redux";

import { catchError, delay, map, mergeMap, takeUntil, tap } from "rxjs/operators";



import { of } from "rxjs";
import { loginError, loginSuccess } from "./actions";
import { Auth, AuthActionTypes } from "./types";

export const authLoginEpic: Epic<AnyAction, AnyAction, void> = (
    action$,
    state
) => {
    return action$.pipe(map(action => {
        return action;
    }),
        ofType(AuthActionTypes.LOGIN_REQUEST),
        takeUntil(action$.pipe(ofType(AuthActionTypes.LOGIN_CANCELED))),
        delay(1000), tap(), mergeMap(
            () => {
                const data: Auth = {
                    authenticated: true,
                    userId: 1,
                    tokenId: '2',
                }
                return of(data)
            }
        ), map(data =>
            loginSuccess(data)
        ), catchError(error => of(loginError(error))))
};