import { AppContext as AppContextType, Theme } from '@typings/context/app';
import { createContext } from 'react';
import { usePersist } from '@hooks';

const ctx: AppContextType = {
   theme: Theme.DARK,
   toggleTheme: () => null
};

export const AppContext = createContext(ctx);

const AppProvider: React.FC<{ children: React.ReactElement; }> = ({ children }): React.ReactElement => {
   const [theme, setTheme] = usePersist('theme', Theme.DARK);

   const ctx = {
      theme: theme ? Theme.LIGHT : Theme.DARK,
      toggleTheme: () => setTheme(theme ? Theme.DARK : Theme.LIGHT)
   };

   return <AppContext.Provider value={ctx}>
      {children}
   </AppContext.Provider>;
};

export default AppProvider;