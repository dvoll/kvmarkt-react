// import { getSimpleFetchReducer } from "../generic";
import { ReduxSimpleFetchState } from "../generic/index.class";

export interface SchemeCategory {
    id: number, 
    name: string,
}

// const categoryReduxData = getSimpleFetchReducer<SchemeCategory>('categories', []);

// export default categoryReduxData;

const CategoryStateObject = new ReduxSimpleFetchState<SchemeCategory>('categories', []);

export default CategoryStateObject;


