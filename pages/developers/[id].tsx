import type Developer from '@typings/structures/developer';
import type { GetServerSideProps } from 'next';

import NavBar from '@components/partials/navbar';
import { Image } from '@geist-ui/core';

interface DeveloperProps {
   developer: Developer;
}

export default function ({ developer }: DeveloperProps): React.ReactNode {
   const styles = useStyles();

   if (process.env.NODE_ENV === 'production') {
      return <>
         <NavBar />
         <div style={styles.comingSoon}>
            Coming Soon.
         </div>
      </>;
   }

   return <>
      <NavBar />
      <Image
         width={16}
         height={16}
         style={styles.image}
         src={developer.avatar}
      />
   </>;
};

function useStyles(): Record<string, Styling> {
   return {
      container: {
         maxWidth: 1200,
         margin: '50px auto 0 auto',
         paddingInline: 24
      },
      image: {
         marginLeft: '20px',
      },
      comingSoon: {
         marginTop: 25
      },
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
      const url = `http${dev ? '' : 's'}://${req.headers.host}/api/developers/${query.id}`;
      const developer = await fetch(url).then(r => r.json());

      return {
         props: {
            developer
         }
      };
   } catch (e) {
      return {
         props: {
            developer: null
         }
      };
   }
};