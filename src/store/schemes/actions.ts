import { action } from "typesafe-actions";

import { Scheme, SchemesActionTypes } from "./types";


export const fetchRequest = () => action(SchemesActionTypes.FETCH_REQUEST);

export const fetchAbort = () => action(SchemesActionTypes.FETCH_CANCELED);

export const fetchSuccess = (data: Scheme[]) =>
    action(SchemesActionTypes.FETCH_SUCCESS, data);

export const fetchError = (message: string) =>
    action(SchemesActionTypes.FETCH_ERROR, message);

    
export const addRequest = (data: Scheme) => 
    action(SchemesActionTypes.ADD_REQUEST, data);

export const addSuccess = (data: Scheme) => 
    action(SchemesActionTypes.ADD_SUCCESS, data);

export const addError = (schemeId: number, msg: string) => 
    action(SchemesActionTypes.ADD_ERROR, {schemeId, msg});

