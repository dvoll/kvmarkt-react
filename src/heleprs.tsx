import * as React from "react";
import { Redirect, Route } from "react-router";

export const privateRoute = (Component: any, accessGranted: boolean, path: string) => {
    if (accessGranted) {
        // tslint:disable-next-line:jsx-no-lambda
        return <Route path={path} component={Component} />
    }
    return <Redirect to='login' />
}