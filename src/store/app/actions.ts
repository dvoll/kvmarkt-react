import { UlightThemeTypes } from '@dvll/ulight-react';
import { action } from 'typesafe-actions';
import { AppActionTypes } from './types';

export const changeTheme = (themeId: UlightThemeTypes) => action(AppActionTypes.CHANGE_THEME, themeId);
