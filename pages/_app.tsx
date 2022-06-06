import AppProvider from '@providers/app';
import type { AppProps } from 'next/app';
import Geist from '@providers/geist';
import Head from 'next/head';

import '@styles/globals.css';
import { useTheme } from '@geist-ui/core';

function MyApp({ Component, pageProps }: AppProps) {
   const theme = useTheme();

   return <AppProvider>
      <Geist>
         <Head>
            <title>Unbound</title>
            <meta name='description' content='A discord client aimed at giving the user control, stability, a beautiful appearance, and freeing them from the shackles of other client modifications.' />
            <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
            <link rel='manifest' href='/site.webmanifest' />
            <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
            <meta name='msapplication-TileColor' content='#da532c' />
            <meta name='theme-color' content='#ffffff' />
         </Head>
         <div id='root' style={{
            '--scrollbar-colour': theme.palette.accents_3
         } as any}>
            <Component {...pageProps} />
         </div>
      </Geist>
   </AppProvider>;
}

export default MyApp;