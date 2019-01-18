// import { getSimpleFetchReducer } from "../generic";
import { createContext } from 'react';
import { ReduxSimpleFetchState } from '../generic/index.class';

export interface SchemeCategory {
    id: number;
    name: string;
}

// const categoryReduxData = getSimpleFetchReducer<SchemeCategory>('categories', []);

// export default categoryReduxData;

const CategoryStateObject = new ReduxSimpleFetchState<SchemeCategory>('categories', []);

export default CategoryStateObject;

export const SchemeCategoryContext = createContext(CategoryStateObject.initialState);
