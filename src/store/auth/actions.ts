import { action } from "typesafe-actions";
import { Auth, AuthActionTypes } from "./types";


export const login = (username: string, password: string) => action(AuthActionTypes.LOGIN_REQUEST, {username, password});

export const loginAbort = () => action(AuthActionTypes.LOGIN_CANCELED);

export const loginSuccess = (data: Auth) =>
    action(AuthActionTypes.LOGIN_SUCCESS, data);

export const loginError = (message: string) =>
    action(AuthActionTypes.LOGIN_ERROR, message);
