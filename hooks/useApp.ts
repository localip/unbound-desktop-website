import type { Dispatch, SetStateAction } from 'react';
import type { Theme } from '@typings/context/app';
import { AppContext } from '@providers/app';
import { useContext } from 'react';

export default function useApp(): [Theme, Dispatch<SetStateAction<Theme>>] {
   const { theme, toggleTheme } = useContext(AppContext);

   return [theme, toggleTheme];
}