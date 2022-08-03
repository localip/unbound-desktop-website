import type Addon from '@typings/structures/addon';

import { Text, Card, useTheme, Collapse, Divider } from '@geist-ui/core';
import NavBar from '@components/partials/navbar';
import React, { CSSProperties } from 'react';

interface Themes {
   data: Addon[];
   count: number;
}

export default function Themes(): React.ReactNode {
   const styles = useStyles();

   return (<>
      <NavBar />
      <div style={styles.container}>
         <Text h3>Frequently Asked Questions</Text>
         <Divider />
         {/* <Card style={styles.card}> */}
         <div style={styles.collapsibles}>
            <Collapse
               style={styles.collapse}
               /* @ts-ignore */
               title={<Text h5 margin={0}>
                  Is this against Terms of Services (ToS)?
               </Text>}
            >
               <Text paddingBottom={0}>
                  Yes. Unbound violates Discord's terms of service by modifying the client, although there is no evidence that discord either cares or takes actions against users who modify their client. Your account is not at risk for simply using Unbound alone. Abusing the service or using plugins which further violate the Terms of Service can get your account terminated, however. All plugins from our official website are safe.
               </Text>
            </Collapse>
            <Collapse
               style={styles.collapse}
               /* @ts-ignore */
               title={<Text h5 margin={0}>
                  Can Unbound get me banned?
               </Text>}
            >
               <Text paddingBottom={0}>
                  Discord does not hand out bans for simply using Unbound. If you abuse the service to further violate discord's policies, you risk account suspension.
               </Text>
            </Collapse>
         </div>
         {/* </Card> */}
      </div>
   </>);
};

function useStyles(): Record<string, CSSProperties> {
   const theme = useTheme();

   return {
      container: {
         maxWidth: '1200px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'flex-start',
         margin: '50px auto 0 auto',
         paddingInline: 24
      },
      collapse: {
         borderTop: 'none'
      },
      collapsibles: {

      },
      card: {

      }
   };
}