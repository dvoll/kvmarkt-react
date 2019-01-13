import { UlightThemeTypes } from '@dvll/ulight-react';

export interface AppState {
    readonly theme: UlightThemeTypes;
}

export const enum AppActionTypes {
    CHANGE_THEME = '@@app/CHANGE_THEME',
}
