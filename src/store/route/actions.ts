import { action } from "typesafe-actions";
import { RouteActionTypes } from "./types";



export const changeTitle = (title: string) => action(RouteActionTypes.CHANGE_TITLE, title);

export const enableBackButton = () => action(RouteActionTypes.ENABLE_BACKBUTTON);

export const disableBackButton = () => action(RouteActionTypes.DISABLE_BACKBUTTON);
