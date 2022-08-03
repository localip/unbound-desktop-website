import React from 'react';

export default function usePersist(key: string, defaultValue: any) {
   const [value, setValue] = React.useState(defaultValue);
   let isMounted = false;

   React.useEffect(() => {
      const persist = window.localStorage.getItem(key);

      if (persist) {
         const res = JSON.parse(persist);
         setValue(res);
      }

      isMounted = true;
   }, [key]);

   React.useEffect(() => {
      if (isMounted) return;

      window.localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);

   return [value, setValue];
}