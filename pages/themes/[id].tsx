import Addon from '@typings/structures/addon';

import NavBar from '@components/partials/navbar';
import { Carousel } from '@components/partials';
import { GetServerSideProps } from 'next';
import { Frown } from '@geist-ui/icons';
import { Image } from '@geist-ui/core';
import { ReactNode } from 'react';

interface PluginProps {
   addon: Addon;
}

export default function Plugin({ addon }: PluginProps): ReactNode {
   const styles = useStyles();

   if (process.env.NODE_ENV === 'production') {
      return <>
         <NavBar />
         <div style={styles.container}>
            <div style={styles.comingSoon}>
               Coming Soon.
            </div>
         </div>
      </>;
   }

   if (!addon) {
      return <>
         <NavBar />
         <div>
            <div style={styles.notFound}>
               <Frown size={128} />
               <div style={styles.notFoundText}>
                  Addon not found.
               </div>
            </div>
         </div>
      </>;
   }

   return <>
      <NavBar />
      <div style={styles.container}>

         {addon.previews && <Carousel
            items={addon.previews.map((preview, index) => <Image
               style={styles.preview}
               src={preview}
               /* @ts-ignore */
               alt={index}
               key={index}
               draggable={false}
               onError={({ currentTarget }) => {
                  console.log(currentTarget.src);
                  currentTarget.src = '/assets/package_placeholder.svg';
               }}
            />)}
         >
         </Carousel>}
      </div>
   </>;
};

function useStyles(): Record<string, Styling> {
   return {
      container: {
         maxWidth: 1200,
         padding: 50,
         margin: '0 auto',
         paddingInline: 24
      },
      comingSoon: {
         marginTop: 25
      },
      notFound: {
         display: 'flex',
         alignItems: 'center',
         flexDirection: 'column',
         marginTop: '25vh'
      },
      notFoundText: {
         marginTop: 25
      },
      carousel: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
      },
      preview: {
         objectFit: 'cover',
         borderRadius: 10
      }
   };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { res, req, query } = context;

   res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate'
   );

   const dev = process.env.NODE_ENV !== 'production';
   try {
      const url = `http${dev ? '' : 's'}://${req.headers.host}/api/themes/${query.id}`;
      const addon = await fetch(url).then(r => r.json());

      return {
         props: {
            addon
         }
      };
   } catch {
      return {
         props: {
            addon: null
         }
      };
   }
};