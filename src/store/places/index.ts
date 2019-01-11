// import { getSimpleFetchReducer } from "../generic";
import { ReduxSimpleFetchState } from '../generic/index.class';

export interface Place {
    id: number;
    name: string;
}

// const categoryReduxData = getSimpleFetchReducer<SchemeCategory>('categories', []);

// export default categoryReduxData;

const PlaceStateObject = new ReduxSimpleFetchState<Place>('places', []);

export default PlaceStateObject;
