import Developer from '@typings/structures/developer';

import NavBar from '@components/partials/navbar';
import type { CSSProperties } from 'react';
import { Image } from '@geist-ui/core';
import type { GetServerSideProps } from 'next';

interface DeveloperProps {
   developer: Developer;
}

export default function ({ developer }: DeveloperProps): React.ReactNode {
   const styles = useStyles();

   console.log(developer);
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

function useStyles(): Record<string, CSSProperties> {
   return {
      image: {
         marginLeft: '20px',
      }
   };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { res, req, query } = context;

   res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate'
   );

   console.log(query);
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
      console.log('monkeys in my backyard');
      return {
         props: {
            developer: null
         }
      };
   }
};