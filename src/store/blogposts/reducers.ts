import { Reducer } from "redux";
import { BlogPostsActionTypes, BlogPostsState } from "./types";

export const initialState: BlogPostsState = {
    data: [
        {
            id: 1,
            title: "New Title",
            subtitle: "04. Dezember",
            imageUrl: "https://picsum.photos/275/350"
        },
        {
            id: 2,
            title: "New Title",
            subtitle: "04. Dezember",
            imageUrl: "https://picsum.photos/275/340"
        },
        {
            id: 3,
            title: "Blogpost",
            subtitle: "02. Dezember",
            imageUrl: "https://picsum.photos/275/330"
        }
    ],
    errors: undefined,
    loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<BlogPostsState> = (state = initialState, action) => { // 
    switch (action.type) {
        case BlogPostsActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case BlogPostsActionTypes.FETCH_CANCELED: {
            return { ...state, loading: false }
        }
        case BlogPostsActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case BlogPostsActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as blogPostsReducer }