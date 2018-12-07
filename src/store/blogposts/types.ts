
export interface BlogPost {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    content?: string;
}

export const enum BlogPostsActionTypes {
    FETCH_REQUEST = "@@blogPosts/FETCH_REQUEST",
    FETCH_SUCCESS = "@@blogPosts/FETCH_SUCCESS",
    FETCH_ERROR = "@@blogPosts/FETCH_ERROR",
    FETCH_CANCELED = "@@blogPosts/FETCH_CANCELED",
    SELECTED = "@@blogPosts/SELECTED"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface BlogPostsState {
    readonly loading: boolean;
    readonly data: BlogPost[];
    readonly errors?: string;
}