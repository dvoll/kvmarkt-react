import Scheme from "src/models/Scheme";


let nextId = 0

export enum ActionTypes {
    ADD_SCHEME = '[schemes] ADD_SCHEME'
}

export interface AddSchemeAction {
    type: ActionTypes.ADD_SCHEME, payload: {scheme: Scheme}
}

export function addTodo(title: string): AddSchemeAction {
    return {
        type: ActionTypes.ADD_SCHEME,
        payload: {
            scheme: {
                id: nextId++,
                title
            }
        }
    }
}

export type Action = AddSchemeAction;