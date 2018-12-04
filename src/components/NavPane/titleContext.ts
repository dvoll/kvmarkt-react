import { createContext } from "react";

const initialContext: (title: string) => void = /* { setTitle: (title: string) => void } = { */
    (title: string) => null
;

export const TitleContext = createContext(initialContext);
