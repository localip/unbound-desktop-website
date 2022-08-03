import type Addon from '@typings/structures/addon';

import { Text, Collapse, Divider, useTheme, Link } from '@geist-ui/core';
import NavBar from '@components/partials/navbar';
import React from 'react';

import Classes from '@styles/faq.module.css';

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
         <Text>
            These are commonly asked questions regarding Unbound itself or any concerns involving Unbound.
         </Text>
         <Text b>
            Please do keep in mind that not all answers will be here.
         </Text>
         <div style={styles.collapsibles}>
            <Collapse
               className={Classes.collapsible}
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
               className={Classes.collapsible}
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
            <Collapse
               className={Classes.collapsible}
               style={styles.collapse}
               /* @ts-ignore */
               title={<Text h5 margin={0}>
                  How does Unbound work?
               </Text>}
            >
               <Text paddingBottom={0}>
                  Unbound is source-available <Link color href='https://github.com/unbound-mod/unbound'>on GitHub</Link> where you may view all source code.
               </Text>
            </Collapse>
            <Collapse
               className={Classes.collapsible}
               style={styles.collapse}
               /* @ts-ignore */
               title={<Text h5 margin={0}>
                  How does I install Unbound?
               </Text>}
            >
               <Text paddingBottom={0}>
                  Unbound's Installer is available <Link color target='_self' href='/api/download'>here</Link>.
               </Text>
            </Collapse>
         </div>
      </div>
   </>);
};

function useStyles(): Record<string, Styling> {
   const theme = useTheme();

   return {
      collapse: {
         border: `1px solid ${theme.palette.accents_2}`,
         borderRadius: 10,
         paddingLeft: 20,
         paddingRight: 20
      },
      container: {
         maxWidth: 1200,
         padding: 50,
         margin: '0 auto',
         paddingInline: 24
      },
      collapsibles: {
         marginTop: 25,
         display: 'flex',
         flexDirection: 'column',
         gap: 8
      }
   };
}