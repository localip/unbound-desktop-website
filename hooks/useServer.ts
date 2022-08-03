import React from 'react';

interface Data {
   error: boolean;
   data: {
      plugins: string[];
      themes: string[];
   } | null;
}

export default (): [state: Data, refetch: () => void] => {
   const [state, setState] = React.useState<Data>({ data: null, error: false });

   async function fetchInfo() {
      try {
         const res = await fetch('http://localhost:9859/info').then(r => r.json());
         setState({ data: res, error: false });
      } catch (error) {
         console.info('Client not detected.');
         setState({ data: null, error: true });
      }
   }

   React.useEffect(() => void fetchInfo(), []);

   return [state, () => fetchInfo()];
};