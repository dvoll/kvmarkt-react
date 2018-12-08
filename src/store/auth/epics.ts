import { Epic, ofType } from "redux-observable";

import { AnyAction } from "redux";

import { catchError, delay, map, mergeMap, takeUntil, tap } from "rxjs/operators";



import { from, of } from "rxjs";
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
            (action) => {
                const loginAction = action.payload;
                const creds = {
                    Email: loginAction.username,
                    Password: loginAction.password,
                }
                // const da = action.pay
                // const data: Auth = {
                //     authenticated: true,
                //     userId: 1,
                //     tokenId: '2',
                // }
                // return of(data)
                return from(
                    fetch("http://localhost:52833/api/account/login", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify(creds)
                    }).then(response => response.json())
                ).pipe(
                    map(response => response.result),
                    map(data => {
                        const payload: Auth = {
                            authenticated: true,
                            tokenId: data.token,
                            contributor: { 
                                id: data.id,
                                firstname: data.firstname,
                                lastname: data.lastname,
                                email: data.email,
                            }
                        }
                        return loginSuccess(payload)
                    }),
                    catchError(error => of (loginError(error)))
                );
            }
        ),
    ) 
        // map(data =>
        //     loginSuccess(data)
        // ), catchError(error => of(loginError(error))))
};