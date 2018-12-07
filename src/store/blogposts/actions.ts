import { action } from "typesafe-actions";
import { BlogPost, BlogPostsActionTypes } from "./types";


export const fetchRequest = () => action(BlogPostsActionTypes.FETCH_REQUEST);

export const fetchAbort = () => action(BlogPostsActionTypes.FETCH_CANCELED);

export const fetchSuccess = (data: BlogPost[]) =>
    action(BlogPostsActionTypes.FETCH_SUCCESS, data);

export const fetchError = (message: string) =>
    action(BlogPostsActionTypes.FETCH_ERROR, message);
