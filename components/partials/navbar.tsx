import { Tabs, Select, useTheme, Button } from '@geist-ui/core';
import React, { CSSProperties } from 'react';
import MoonIcon from '@geist-ui/icons/moon';
import { Unbound } from '@components/icons';
import SunIcon from '@geist-ui/icons/sun';
import { useRouter } from 'next/router';
import { useApp } from '@hooks';

import IconStyles from '@styles/themer.module.css';
import { LogIn } from '@geist-ui/icons';

export default function NavBar() {
   const [theme, toggleTheme] = useApp();
   const styles = useStyles();
   const router = useRouter();

   return <nav style={styles.navbar}>
      <div style={styles.container}>
         <Unbound width={45} height={45} />

         <Tabs
            onChange={v => router.push(v)}
            style={styles.tabs}
            initialValue={router.pathname}
            hideDivider
            hideBorder
         >
            <Tabs.Item label='Home' value='/' />
            <Tabs.Item label='Plugins' value='/plugins' />
            <Tabs.Item label='Themes' value='/themes' />
            <Tabs.Item label='Contributors' value='/constributors' />
            <Tabs.Item label='Developers' value='/developers' />
            <Tabs.Item label='FAQ' value='/faq' />
         </Tabs>

         <div style={styles.buttonContainer}>
            <Button w={0} style={styles.themer} onClick={() => toggleTheme(!theme as any)}>
               {theme ?
                  <MoonIcon className={IconStyles.theme} size={14} /> :
                  <SunIcon className={IconStyles.theme} size={14} />
               }
            </Button>
            <Button w={0.5}>
               <span style={styles.loginText}>
                  Login
               </span>
               <LogIn size={14} />
            </Button>
         </div>
      </div >
   </nav >;
}

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      navbar: {
         position: 'relative',
         top: 0,
         left: 0,
         right: 0,
         paddingRight: 0,
         backdropFilter: 'saturate(180%) blur(5px)',
         backgroundColor: styles.palette.background,
         boxShadow: styles.expressiveness.shadowSmall,
         zIndex: 999,
         width: '100%',
         height: '3.5rem',
         display: 'flex',
         alignItems: 'center'
      },

      container: {
         width: '1200px',
         height: '3.5rem',
         display: 'flex',
         alignItems: 'center',
         margin: '0 auto',
         paddingInline: 24
      },

      themer: {
         marginLeft: 'auto',
         padding: '0 12.5px',
         display: 'flex',
         alignItems: 'center'
      },

      tabs: {
         display: 'flex'
      },

      themeOption: {
         width: 'auto',
         height: '18px',
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center'
      },

      buttonContainer: {
         marginLeft: 'auto',
         gap: 12,
         display: 'flex',
         flexDirection: 'row'
      },

      loginText: {
         marginRight: 7.5
      }
   };
}