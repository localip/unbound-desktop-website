import type Addon from '@typings/structures/addon';

import NavBar from '@components/partials/navbar';
import { Text, Divider } from '@geist-ui/core';
import React from 'react';

interface Themes {
   data: Addon[];
   count: number;
}

export default function Themes(): React.ReactNode {
   const styles = useStyles();

   return (<>
      <NavBar />
      <div style={styles.container}>
         <Text h3>Contributors</Text>
         <Divider />
         <span style={styles.comingSoon}>
            Coming Soon.
         </span>
      </div>
   </>);
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
      }
   };
}