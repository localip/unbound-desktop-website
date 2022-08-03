import type { Dispatch, SetStateAction } from 'react';

export enum Theme {
   DARK,
   LIGHT
}

export interface AppContext {
   theme: Theme;
   toggleTheme: Dispatch<SetStateAction<Theme>>;
}