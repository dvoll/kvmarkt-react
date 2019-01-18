import { Reducer } from 'redux';
import { action } from 'typesafe-actions';

export interface FetchActionTypes {
    FETCH_REQUEST: string;
    FETCH_SUCCESS: string;
    FETCH_ERROR: string;
    FETCH_CANCELED: string;
}

export interface FetchDataTypeState<T> {
    readonly loading: boolean;
    readonly data: T[];
    readonly errors?: string;
}

export class ReduxSimpleFetchState<T> {
    public readonly fetchActionTypes: FetchActionTypes;

    public readonly initialState: FetchDataTypeState<T>;
    private readonly name: string;

    constructor(name: string, initialData: T[] = []) {
        this.name = name;
        this.initialState = {
            loading: false,
            data: initialData,
        };
        this.fetchActionTypes = {
            FETCH_REQUEST: `@@${this.name}/FETCH_REQUEST`,
            FETCH_SUCCESS: `@@${this.name}/FETCH_SUCCESS`,
            FETCH_ERROR: `@@${this.name}/FETCH_ERROR`,
            FETCH_CANCELED: `@@${this.name}/FETCH_CANCELED`,
        };
    }

    public fetchRequest = () => action(this.fetchActionTypes.FETCH_REQUEST);

    public fetchAbort = () => action(this.fetchActionTypes.FETCH_CANCELED);

    public fetchSuccess = (data: T) => action(this.fetchActionTypes.FETCH_SUCCESS, data);

    public fetchError = (message: string) => action(this.fetchActionTypes.FETCH_ERROR, message);

    public reducer: Reducer<FetchDataTypeState<T>> = (state = this.initialState, fetchAction) => {
        switch (fetchAction.type) {
            case this.fetchActionTypes.FETCH_REQUEST: {
                return { ...state, loading: true };
            }
            case this.fetchActionTypes.FETCH_CANCELED: {
                return { ...state, loading: false };
            }
            case this.fetchActionTypes.FETCH_SUCCESS: {
                return { ...state, loading: false, data: fetchAction.payload };
            }
            case this.fetchActionTypes.FETCH_ERROR: {
                return { ...state, loading: false, errors: fetchAction.payload };
            }
            default: {
                return state;
            }
        }
    };

    public epics = () => {
        console.log('Epics of ' + this.name + ' called.');
    };
}
