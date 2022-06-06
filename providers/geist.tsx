import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { useApp } from '@hooks';

interface Provider {
   children: React.ReactNode;
}

export default function Geist({ children }: Provider): React.ReactElement {
   const [theme] = useApp();

   return (
      <GeistProvider themeType={theme ? 'light' : 'dark'}>
         <CssBaseline />
         {children}
      </GeistProvider>
   );
};