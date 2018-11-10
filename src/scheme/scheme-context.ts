import { createContext } from "react";
import { SchemesState } from "src/store/schemes/types";

const initialContext: SchemesState = {
    loading: false,
    data: []
}

export const SchemeContext = createContext(initialContext)